<%@ WebHandler Language="C#" Class="Notice" %>

using System;
using System.Web;
using System.Text;

public class Notice : IHttpHandler {
    private DataLayer sqlOperation = new DataLayer("sqlStr");//数据库操作类
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            string json = findNews(context);
            json = json.Replace("\r\n", "\\r\\n").Replace(" ","    ");
            context.Response.Write(json);
        }
        catch (Exception ex)
        {
            MessageBox.Message(ex.Message);
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

    private string findNews(HttpContext context)
    {
        string id = context.Request.QueryString["ID"];
        string sqlCommand = "SELECT Title,Content,Releasetime,Hot,New,user.Name RName FROM news,user WHERE news.ID=@id AND user.ID=news.Release_User_ID";
        sqlOperation.AddParameterWithValue("@id", id);
        MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
        if (reader.Read())
        {
            StringBuilder backText = new StringBuilder();
            DateTime date = Convert.ToDateTime(reader["Releasetime"].ToString());
            string day = date.Year.ToString() + "-" + date.Month.ToString() + "-" + date.Day.ToString();
            backText.Append("{\"Title\":\"");
            backText.Append(reader["Title"].ToString());
            backText.Append("\",\"Content\":\"");
            backText.Append(reader["Content"].ToString());
            backText.Append("\",\"Time\":\"");
            backText.Append(day);
            backText.Append("\",\"RName\":\"");
            backText.Append(reader["RName"].ToString());
            backText.Append("\",\"Hot\":\"");
            backText.Append(reader["Hot"].ToString());
            backText.Append("\",\"New\":\"");
            backText.Append(reader["New"].ToString());
            backText.Append("\"}");
            return backText.ToString();
        }
        return "{\"Title\":\"false\"}";
    }

}