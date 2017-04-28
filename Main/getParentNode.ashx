<%@ WebHandler Language="C#" Class="getParentNode" %>

using System;
using System.Web;
using System.Text;
using MySql.Data.MySqlClient;

public class getParentNode : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string backString = parentNode(context);
        context.Response.Write(backString);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

    private string parentNode(HttpContext context)
    {
        DataLayer sqlOperation = new DataLayer("sqlStr");
        string id = context.Request.QueryString["id"];
        string sqlCommand = "SELECT * FROM navigation WHERE ID=@id";
        sqlOperation.AddParameterWithValue("@id", id);
        MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
        StringBuilder backString = new StringBuilder("[");
        if (reader.Read())
        {
            backString.Append("{\"Name\":\"" + reader["Name"].ToString() + "\",\"State\":\""
                + reader["State"].ToString() + "\",\"Icon\":\"" + reader["Icon"].ToString()
                + "\",\"Url\":\"" + reader["Url"].ToString() + "\",\"Node\":\"" + reader["Node"].ToString()
                + "\",\"Parent\":\"" + reader["Parent"].ToString() + "\"}]"
                );
        }
        reader.Close();
        return backString.ToString();
    }

}