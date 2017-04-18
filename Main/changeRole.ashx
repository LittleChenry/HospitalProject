<%@ WebHandler Language="C#" Class="changeRole" %>

using System;
using System.Web;
using System.Text;
using System.Web.SessionState;

public class changeRole : IHttpHandler, IRequiresSessionState{
    private DataLayer sqlOperation = new DataLayer("sqlStr");
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string json = GetRoles(context);    //获取json
        context.Response.Write(json);       //将json字符串返回前端
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
    //读取数据库返回用户拥有的角色，生成json字符串。
    private string GetRoles(HttpContext context)
    {
        //检查是否登录
        if (context.Session["loginUser"] == null)
        {
            return "{\"Roles\":[{\"Name\":\"false\"}]}";
        }
        //读取数据库
        UserInformation user = (context.Session["loginUser"] as UserInformation);
        string id = user.GetUserID().ToString();
        string sqlCommand = "SELECT Name,Description FROM user2role,role WHERE user2role.User_ID=@ID AND user2role.Role_ID=role.ID";
        string sqlCount = "SELECT count(role.ID) FROM user2role,role WHERE user2role.User_ID=@ID AND user2role.Role_ID=role.ID";
        sqlOperation.AddParameterWithValue("@ID", id);
        int count = int.Parse(sqlOperation.ExecuteScalar(sqlCount));
        int i = 0;
        //生成json
        StringBuilder backText = new StringBuilder("{\"Roles\":[");
        MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
        while (reader.Read())
        {
            backText.Append("{\"Name\":\"" + reader["Description"].ToString() + "\",\"Type\":\"" + reader["Name"].ToString()
                + "\"}");
            if (i < count)
            {
                //backText += ",";
                backText.Append(",");
            }
            i++;
        }
        backText.Append("]}");
        return backText.ToString();
    }
}