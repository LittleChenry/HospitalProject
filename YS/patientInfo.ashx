<%@ WebHandler Language="C#" Class="patientInfo" %>

using System;
using System.Web;
using System.Text;

public class patientInfo : IHttpHandler {
     private DataLayer sqlOperation = new DataLayer("sqlStr");
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            string json = getPatientInfo(context);
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
    private string getPatientInfo(HttpContext context)
    {
        String id = context.Request.QueryString["id"];
        String name = context.Request.QueryString["name"];
        if (id=="all")
        {   int i=1;
            string countCompute="SELECT COUNT(*) FROM patient";
            int count = int.Parse(sqlOperation.ExecuteScalar(countCompute));
            
            string sqlCommand = "SELECT * FROM patient";
            MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
            StringBuilder backText = new StringBuilder("{\"patientGroup\":[");
            while (reader.Read())
            {
                backText.Append("{\"ID\":\"" + reader["ID"].ToString() + "\",\"IdentificationNumber\":\"" + reader["IdentificationNumber"] +
                     "\",\"Hospital\":\"" + reader["Hospital"].ToString() + "\",\"RecordNumber\":\"" + reader["RecordNumber"].ToString() + "\",\"Picture\":\"" + reader["Picture"].ToString() + "\",\"Name\":\"" + reader["Name"].ToString() +
                     "\",\"Gender\":\"" + reader["Gender"].ToString() + "\",\"Age\":\"" + reader["Age"].ToString() + "\",\"Birthday\":\"" + reader["Birthday"].ToString() +
                     "\",\"Nation\":\"" + reader["Nation"].ToString() + "\",\"Address\":\"" + reader["Address"].ToString() + "\",\"Contact1\":\"" + reader["Contact1"].ToString() +
                     "\",\"Contact2\":\"" + reader["Contact2"].ToString() + "\",\"Height\":\"" + reader["Height"].ToString() + "\",\"Weight\":\"" + reader["Weight"].ToString() + "\"}");
                if (i < count)
                {
                    backText.Append(",");
                }
                i++;
            }
            backText.Append("]}");
            return backText.ToString();
        }
        else
        {   
            
            int i = 1;
            string countCompute = "SELECT COUNT(*) FROM patient";
            int count = int.Parse(sqlOperation.ExecuteScalar(countCompute));
            string sqlCommand = "SELECT ID,IdentificationNumber,Hospital,RecordNumber,Picture,Name,Gender,Age,Birthday,Nation,Address,Contact1,Contact2,Height,Weight FROM patient WHERE ID=@id OR Name=@name";
            sqlOperation.AddParameterWithValue("@id", id);
            sqlOperation.AddParameterWithValue("@name", name);
            MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
            StringBuilder backText = new StringBuilder("{\"patientGroup\":[");
            
            while (reader.Read())
            {
                backText.Append("{\"ID\":\"" + reader["ID"].ToString() + "\",\"IdentificationNumber\":\"" + reader["IdentificationNumber"] +
                     "\",\"Hospital\":\"" + reader["Hospital"].ToString() + "\",\"RecordNumber\":\"" + reader["RecordNumber"].ToString() + "\",\"Picture\":\"" + reader["Picture"].ToString() + "\",\"Name\":\"" + reader["Name"].ToString() +
                     "\",\"Gender\":\"" + reader["Gender"].ToString() + "\",\"Age\":\"" + reader["Age"].ToString() + "\",\"Birthday\":\"" + reader["Birthday"].ToString() +
                     "\",\"Nation\":\"" + reader["Nation"].ToString() + "\",\"Address\":\"" + reader["Address"].ToString() + "\",\"Contact1\":\"" + reader["Contact1"].ToString() +
                     "\",\"Contact2\":\"" + reader["Contact2"].ToString() + "\",\"Height\":\"" + reader["Height"].ToString() + "\",\"Weight\":\"" + reader["Weight"].ToString() + "\"}");
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

   

}