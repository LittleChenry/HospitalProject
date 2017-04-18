using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Root_Root_InfoManage : System.Web.UI.Page
{
    private DataLayer sqlOperation = new DataLayer("sqlStr");//数据库操作类
    protected void Page_Load(object sender, EventArgs e)
    {
        string id=Request.QueryString["ID"];
        int newsid=Convert.ToInt32(id);
        string type = Request.QueryString["Type"];
        int newstype=Convert.ToInt32(type);
         switch(newstype)
         {
             case 0: delete(id); break;
             case 1: setTop(id); break;
             case 2: setNew(id); break;
             case 3: setHot(id); break;
             case 10: removeTop(id); break;
             case 20: removeNew(id);break;
             case 30: removeHot(id); break;
             default: break;
         }
         if (Session["loginUser"] == null)
         {
             MessageBox.Message("请先登陆");
             Response.Write("<script language=javascript>window.location.replace('../Main/Login.aspx');</script>");
         }
    }
    public void delete(String  id)
    {
        sqlOperation.clearParameter();
         string sqlCommand = "DELETE FROM news WHERE ID=@id";
        sqlOperation.AddParameterWithValue("@id", id);
         sqlOperation.ExecuteNonQuery(sqlCommand);
    }
    public void setTop(String id)
    {
        sqlOperation.clearParameter();
        string sqlCommand = "UPDATE news SET Important=1 WHERE ID=@id";
        sqlOperation.AddParameterWithValue("@id", id);
        sqlOperation.ExecuteNonQuery(sqlCommand);
    }
    public void removeTop(String id)
    {
    
        sqlOperation.clearParameter();
        string sqlCommand = "UPDATE news SET Important=0 WHERE ID=@id";
        sqlOperation.AddParameterWithValue("@id", id);
        sqlOperation.ExecuteNonQuery(sqlCommand);
    }
    public void setNew(String id)
    {
        sqlOperation.clearParameter();
        string sqlCommand = "UPDATE news SET New=1 WHERE ID=@id";
        sqlOperation.AddParameterWithValue("@id", id);
        sqlOperation.ExecuteNonQuery(sqlCommand);
    }
    public void removeNew(String id)
    {

        sqlOperation.clearParameter();
        string sqlCommand = "UPDATE news SET New=0 WHERE ID=@id";
        sqlOperation.AddParameterWithValue("@id", id);
        sqlOperation.ExecuteNonQuery(sqlCommand);
    }
    public void setHot(String id)
    {
        sqlOperation.clearParameter();
        string sqlCommand = "UPDATE news SET Hot=1 WHERE ID=@id";
        sqlOperation.AddParameterWithValue("@id", id);
        sqlOperation.ExecuteNonQuery(sqlCommand);
    }
    public void removeHot(String id)
    {
        sqlOperation.clearParameter();
        string sqlCommand = "UPDATE news SET Hot=0 WHERE ID=@id";
        sqlOperation.AddParameterWithValue("@id", id);
        sqlOperation.ExecuteNonQuery(sqlCommand);
    }

}