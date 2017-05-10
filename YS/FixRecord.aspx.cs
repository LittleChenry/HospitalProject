using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class YS_FixRecord : System.Web.UI.Page
{
    private DataLayer sqlOperation = new DataLayer("sqlStr");
    protected void Page_Load(object sender, EventArgs e)
    { 

         string myispostback = Request["ispostback"];//隐藏字段来标记是否为提交
        //不是第一次加载页面进行录入
         if (myispostback != null && myispostback == "true")
         {                     
             if (RecordPatientInformation())
             {
                 MessageBox.Message("保存成功!");

             }

             else
             {
                 MessageBox.Message("保存失败");
             }
         }
      
    }
 
private bool RecordPatientInformation()
    {
        string savePath="";
        string savepath1 = "";
        if (FileUpload.HasFile)
        {
            savePath = Server.MapPath("~/upload/FixRecord");//指定上传文件在服务器上的保存路径
            //检查服务器上是否存在这个物理路径，如果不存在则创建
            if (!System.IO.Directory.Exists(savePath))
            {
                System.IO.Directory.CreateDirectory(savePath);
            }
            savePath = savePath + "\\" + DateTime.Now.ToString("yyyyMMdd") + FileUpload.FileName;
            savepath1 = "../upload/FixRecord/" + DateTime.Now.ToString("yyyyMMdd") + FileUpload.FileName;
            FileUpload.SaveAs(savePath);
        }
        string treatid = Request.Form["hidetreatID"];
        int treatID = Convert.ToInt32(treatid);
        string fixedid = "select Fixed_ID from treatment where treatment.ID=@treatid";
        sqlOperation.AddParameterWithValue("@treatid", treatID);
        int FixedID = int.Parse(sqlOperation.ExecuteScalar(fixedid));
        //string userID = "1";
        string userID = Request.Form["userID"];
        int userid = Convert.ToInt32(userID);
        DateTime datetime = DateTime.Now;
        bool state=false;
        string strSqlCommand = "UPDATE  fixed  SET Pictures=@picture,BodyPositionDetail=@detail,AnnexDescription=@description,Remarks=@remarks,OperateTime=@datetime,Operate_User_ID=@userid where fixed.ID=@fixedID";
        //各参数赋予实际值
        sqlOperation.AddParameterWithValue("@fixedID", FixedID);
        sqlOperation.AddParameterWithValue("@detail", Request.Form["BodyPositionDetail"]);
        sqlOperation.AddParameterWithValue("@description", Request.Form["AnnexDescription"]);
        sqlOperation.AddParameterWithValue("@remarks", Request.Form["Remarks"]);
        sqlOperation.AddParameterWithValue("@datetime", datetime);
        sqlOperation.AddParameterWithValue("@userid", userid);
        sqlOperation.AddParameterWithValue("@picture", savepath1);
        string strSqlCommand1 = "UPDATE  appointment  SET State=@state where Treatment_ID=@treatid";
        sqlOperation.AddParameterWithValue("@state", state);
        sqlOperation.AddParameterWithValue("@treatid", treatID);
        int intSuccess = sqlOperation.ExecuteNonQuery(strSqlCommand);
       
        if (intSuccess > 0)
        { 
            sqlOperation.ExecuteNonQuery(strSqlCommand1);
            return true;
        }
        else
        {
            return false;
        }

    }
}