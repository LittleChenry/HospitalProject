<%@ WebHandler Language="C#" Class="getprincenter" %>

using System;
using System.Web;
using System.Text;
/* ***********************************************************
 * FileName:getprincenter.ashx
 * Writer: xubxiao
 * create Date: 2017-5-4
 * ReWriter:
 * Rewrite Date:
 * impact :
 * 获取数据库中主中心负责人表
 * **********************************************************/
public class getprincenter : IHttpHandler {

    DataLayer sqlOperation = new DataLayer("sqlStr");
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        string backString = getprinItem();
        context.Response.Write(backString);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
    private string getprinItem()
    {
        string countItem = "SELECT count(*) FROM user";
        int count = int.Parse(sqlOperation.ExecuteScalar(countItem));

        string sqlCommand = "SELECT ID,Name,Office FROM user";
        MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
        StringBuilder backText = new StringBuilder("{\"Item\":[");
        int i = 1;
        while (reader.Read())
        {
            backText.Append("{\"ID\":\"" + reader["ID"].ToString() + "\",\"Name\":\"" + reader["Name"].ToString() + " " + reader["Office"].ToString() + "\"}");
            if (i < count)
            {

                backText.Append(",");
            }
            i++;
        }
        backText.Append("]}");
        return backText.ToString();
    }
}