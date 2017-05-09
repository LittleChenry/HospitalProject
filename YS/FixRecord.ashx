<%@ WebHandler Language="C#" Class="FixRecord" %>

using System;
using System.Web;
using System.Text;

public class FixRecord : IHttpHandler
{
    private DataLayer sqlOperation = new DataLayer("sqlStr");
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        try
        {
            string json = getfixrecordinfo();
            context.Response.Write(json);
        }
        catch (Exception ex)
        {
            MessageBox.Message(ex.Message);
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
    private string getfixrecordinfo()
    {
       // String name = context.Request.QueryString["name"];
            int i = 1;
            string countCompute = "select count(fixed.ID) from fixed,treatment,patient where patient.ID=treatment.Patient_ID and treatment.Fixed_ID=fixed.ID and fixed.Application_User_ID is not NULL and fixed.Operate_User_ID is NULL";
            int count = int.Parse(sqlOperation.ExecuteScalar(countCompute));

            string sqlCommand = "select treatment.ID as treatid,diagnosisrecord.*,diagnosisresult.*,material.Name as mname,fixedrequirements.*,patient.*,user.Name as doctor from user,diagnosisrecord,diagnosisresult,material,fixedrequirements,treatment,patient,fixed where diagnosisrecord.Diagnosis_User_ID=user.ID and diagnosisrecord.Treatment_ID=treatment.ID and diagnosisrecord.DiagnosisResult_ID=diagnosisresult.ID and fixed.Model_ID=material.ID and fixed.FixedRequirements_ID=fixedrequirements.ID and patient.ID=treatment.Patient_ID and treatment.Fixed_ID=fixed.ID and fixed.Application_User_ID is not NULL and fixed.Operate_User_ID is NULL";                                     
            MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
            StringBuilder backText = new StringBuilder("{\"fixedRecord\":[");
            while (reader.Read())
            {
                backText.Append("{\"ID\":\"" + reader["ID"].ToString() + 
                     "\",\"RecordNumber\":\"" + reader["RecordNumber"].ToString() +  "\",\"Name\":\"" + reader["Name"].ToString() +
                     "\",\"Gender\":\"" + reader["Gender"].ToString() + "\",\"Age\":\"" + reader["Age"].ToString() +
                     "\",\"Address\":\"" + reader["Address"].ToString() + "\",\"Contact1\":\"" + reader["Contact1"].ToString() +
                     "\",\"Contact2\":\"" + reader["Contact2"].ToString() + "\",\"treatID\":\"" + reader["treatid"].ToString() +
                     "\",\"modelID\":\"" + reader["mname"].ToString() + "\",\"requireID\":\"" + reader["Requirements"].ToString() + "\",\"diagnosisresult\":\"" + reader["TumorName"].ToString() + "\",\" doctor\":\"" + reader["doctor"].ToString() + "\"}");
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