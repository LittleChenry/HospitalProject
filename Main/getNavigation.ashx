<%@ WebHandler Language="C#" Class="getNavigation" %>

using System;
using System.Web;
using System.Text;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

public class getNavigation : IHttpHandler {    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string backString = rolesNav(context);
        context.Response.Write(backString);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

    private string rolesNav(HttpContext context)
    {
        DataLayer sqlOperation = new DataLayer("sqlStr");
        string sqlCommand = "SELECT Function_ID FROM function2role WHERE Role_ID=(SELECT ID FROM role WHERE Name=@name)";
        sqlOperation.AddParameterWithValue("@name", context.Request.QueryString["role"]);
        List<string> functionID = new List<string>();
        MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
        while (reader.Read())
        {
            functionID.Add(reader["Function_ID"].ToString());
        }
        reader.Close();
        if (functionID.Count == 0)
        {
            return "[{\"Name\":\"false\"}]";
        }
        StringBuilder backString = new StringBuilder("[");
        for(int i = 0;i < functionID.Count;i++){
            sqlCommand = "SELECT * FROM navigation WHERE ID=(SELECT Navigation_ID FROM function WHERE ID=@id)";
            sqlOperation.AddParameterWithValue("@id", functionID[i]);
            reader = sqlOperation.ExecuteReader(sqlCommand);
            if (reader.Read())
            {
                backString.Append("{\"ID\":\"" + reader["ID"] + "\",\"Name\":\"" + reader["Name"].ToString() + "\",\"State\":\"" + reader["State"].ToString()
                    + "\",\"Icon\":\"" + reader["Icon"].ToString() + "\",\"Url\":\"" + reader["Url"].ToString()
                    + "\",\"Node\":\"" + reader["Node"].ToString() + "\",\"Parent\":\"" + reader["Parent"].ToString()
                    + "\"}");
            }
            reader.Close();
            if (i != (functionID.Count - 1))
            {
                backString.Append(",");
            }
        }
        backString.Append("]");
        return backString.ToString();
    }
}