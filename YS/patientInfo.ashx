<%@ WebHandler Language="C#" Class="patientInfo" %>

using System;
using System.Web;
using System.Text;
/* ***********************************************************
 * FileName:patientInfo.ashx
 * Writer: xubxiao
 * create Date: 2017-5-4
 * ReWriter:
 * Rewrite Date:
 * impact :
 * 等待就诊的疗程号以及患者基本信息获取
 * **********************************************************/
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
        String name = context.Request.QueryString["name"];
        if (name=="all")
        {   int i=1;
        string countCompute = "select count(treatment.ID) from treatment,patient where patient.ID=treatment.Patient_ID and treatment.DiagnosisRecord_ID is NULL";
            int count = int.Parse(sqlOperation.ExecuteScalar(countCompute));

            string sqlCommand = "select treatment.ID as treatid,patient.* from treatment,patient where patient.ID=treatment.Patient_ID and treatment.DiagnosisRecord_ID is NULL";
            MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
            StringBuilder backText = new StringBuilder("{\"patientGroup\":[");
            while (reader.Read())
            {
                backText.Append("{\"ID\":\"" + reader["ID"].ToString() + "\",\"IdentificationNumber\":\"" + reader["IdentificationNumber"] +
                     "\",\"Hospital\":\"" + reader["Hospital"].ToString() + "\",\"RecordNumber\":\"" + reader["RecordNumber"].ToString() + "\",\"Picture\":\"" + reader["Picture"].ToString() + "\",\"Name\":\"" + reader["Name"].ToString() +
                     "\",\"Gender\":\"" + reader["Gender"].ToString() + "\",\"Age\":\"" + reader["Age"].ToString() + "\",\"Birthday\":\"" + reader["Birthday"].ToString() +
                     "\",\"Nation\":\"" + reader["Nation"].ToString() + "\",\"Address\":\"" + reader["Address"].ToString() + "\",\"Contact1\":\"" + reader["Contact1"].ToString() +
                     "\",\"Contact2\":\"" + reader["Contact2"].ToString() + "\",\"Height\":\"" + reader["Height"].ToString() + "\",\"Weight\":\"" + reader["Weight"].ToString() + "\",\"treatID\":\"" + reader["treatid"].ToString()+"\"}");
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
            string countCompute = "select count(treatment.ID) from treatment,patient where patient.ID=treatment.Patient_ID and treatment.DiagnosisRecord_ID is NULL and patient.Name LIKE @name";
            sqlOperation.AddParameterWithValue("@name", "%" + name + "%");
            int count = int.Parse(sqlOperation.ExecuteScalar(countCompute));
            string sqlCommand = "select treatment.ID as treatid,patient.* from treatment,patient where patient.ID=treatment.Patient_ID and treatment.DiagnosisRecord_ID is NULL and patient.Name LIKE @name";
            sqlOperation.AddParameterWithValue("@name", "%"+name+"%");
            MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
            StringBuilder backText = new StringBuilder("{\"patientGroup\":[");
            
            while (reader.Read())
            {
                backText.Append("{\"ID\":\"" + reader["ID"].ToString() + "\",\"IdentificationNumber\":\"" + reader["IdentificationNumber"] +
                     "\",\"Hospital\":\"" + reader["Hospital"].ToString() + "\",\"RecordNumber\":\"" + reader["RecordNumber"].ToString() + "\",\"Picture\":\"" + reader["Picture"].ToString() + "\",\"Name\":\"" + reader["Name"].ToString() +
                     "\",\"Gender\":\"" + reader["Gender"].ToString() + "\",\"Age\":\"" + reader["Age"].ToString() + "\",\"Birthday\":\"" + reader["Birthday"].ToString() +
                     "\",\"Nation\":\"" + reader["Nation"].ToString() + "\",\"Address\":\"" + reader["Address"].ToString() + "\",\"Contact1\":\"" + reader["Contact1"].ToString() +
                     "\",\"Contact2\":\"" + reader["Contact2"].ToString() + "\",\"Height\":\"" + reader["Height"].ToString() + "\",\"Weight\":\"" + reader["Weight"].ToString() + "\",\"treatID\":\"" + reader["treatid"].ToString() + "\"}");
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