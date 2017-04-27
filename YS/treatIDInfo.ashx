<%@ WebHandler Language="C#" Class="treatIDInfo" %>

using System;
using System.Web;
using System.Text;

public class treatIDInfo : IHttpHandler {
    private DataLayer sqlOperation = new DataLayer("sqlStr");
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            string json = getTreatInfo(context);
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
    private String getTreatInfo(HttpContext context)
{
    String id = context.Request.QueryString["id"];
    string countCompute = "SELECT COUNT(*) FROM  treatment WHERE Patient_ID=@id";
    sqlOperation.AddParameterWithValue("@id", id);
    int count = int.Parse(sqlOperation.ExecuteScalar(countCompute));
    String nameCommand = "SELECT DISTINCT Name FROM patient WHERE ID=@id";
    sqlOperation.AddParameterWithValue("@id", id);
      String name= sqlOperation.ExecuteScalar(nameCommand);
    String sqlCommand = "SELECT * FROM treatment WHERE Patient_ID=@id";
    sqlOperation.AddParameterWithValue("@id", id);
    MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
    StringBuilder backText = new StringBuilder("{\"treatGroup\":[");
    int i = 0;
    while (reader.Read())
    {
        int k = 2;
        String kind = "";
        while (k < 10)
        {
            if (reader[k].ToString() == "")
            {
                break;
            }
            k++;
        }
        switch (k)
        {
            case 2: kind = "等待诊断"; break;
            case 3: kind = "等待体位固定申请"; break;
            case 4: kind = "等待模拟定位申请"; break;
            case 5: kind = "等待治疗方案设计"; break;
            case 6: kind = "等待复位申请"; break;
            case 7: kind = "等待计划复核申请"; break;
            case 8: kind = "等待QA申请"; break;
            case 9: kind = "等待IGRT申请"; break;
            default: kind = "疗程完毕"; break;

        }
        backText.Append("{\"treatID\":\"" + reader["ID"].ToString() + "\",\"name\":\"" + name +
             "\",\"kind\":\"" + kind + "\"}");
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