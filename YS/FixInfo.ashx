<%@ WebHandler Language="C#" Class="FixInfo" %>

using System;
using System.Web;
using System.Text;

public class FixInfo : IHttpHandler
{
    private DataLayer sqlOperation = new DataLayer("sqlStr");
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        try
        {
            string json = getfixrecordinfo(context);
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
    private string getfixrecordinfo(HttpContext context)
    {
            String fixedID = context.Request.QueryString["FixedID"];
            int i = 1;
            int FixedID = Convert.ToInt32(fixedID);
           
            
            string countCompute = "select count(Fixed.ID) from fixed,treatment,patient where patient.ID=treatment.Patient_ID and treatment.Fixed_ID=fixed.ID and fixed.Application_User_ID is not NULL and fixed.Operate_User_ID is NULL and fixed.ID = @fixedid";
            
            sqlOperation.AddParameterWithValue("@fixedid", FixedID);
            int count = int.Parse(sqlOperation.ExecuteScalar(countCompute));

            string sqlCommand = "select treatment.ID as treatid,diagnosisrecord.*,diagnosisresult.*,fixed.*,material.Name as mname,user.Name as doctor,fixedequipment.Name as fename,fixedrequirements.*,patient.* from fixedequipment,user,diagnosisrecord,diagnosisresult,material,fixedrequirements,treatment,patient,fixed where fixedequipment.ID=fixed.FixedEquipment_ID and diagnosisrecord.Diagnosis_User_ID=user.ID and diagnosisrecord.Treatment_ID=treatment.ID and diagnosisrecord.DiagnosisResult_ID=diagnosisresult.ID and fixed.Model_ID=material.ID and fixed.FixedRequirements_ID=fixedrequirements.ID and patient.ID=treatment.Patient_ID and treatment.Fixed_ID=fixed.ID and fixed.Application_User_ID is not NULL and fixed.Operate_User_ID is NULL and fixed.ID = @fixedid";
          //  string sqlCommand1 = "select user.Name as appuser,from user,treatment,patient,fixed where patient.ID=treatment.Patient_ID and treatment.Fixed_ID=fixed.ID and fixed.Application_User_ID=user.ID and fixed.Application_User_ID is not NULL and fixed.Operate_User_ID is NULL and fixed.ID = @fixedid";
            
            sqlOperation.AddParameterWithValue("@fixedid", FixedID);
            MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
            
             StringBuilder backText = new StringBuilder("{\"fixedInfo\":[");
            //backText.Append(reader.Read());
        
            while (reader.Read())
            {
                string date = reader["ApplicationTime"].ToString();
                DateTime dt1 = Convert.ToDateTime(date);
                string date1 = dt1.ToString("yyyy-MM-dd HH:mm"); 
                backText.Append("{\"ID\":\"" + reader["ID"].ToString() + 
                     "\",\"RecordNumber\":\"" + reader["RecordNumber"].ToString() +  "\",\"Name\":\"" + reader["Name"].ToString() +
                     "\",\"Gender\":\"" + reader["Gender"].ToString() + "\",\"Age\":\"" + reader["Age"].ToString() +
                     "\",\"Address\":\"" + reader["Address"].ToString() + "\",\"Contact1\":\"" + reader["Contact1"].ToString() +
                     "\",\"Contact2\":\"" + reader["Contact2"].ToString() + "\",\"treatID\":\"" + reader["treatid"].ToString() +
                     "\",\"modelID\":\"" + reader["mname"].ToString() + "\",\"requireID\":\"" + reader["Requirements"].ToString() +
                     "\",\"diagnosisresult\":\"" + reader["TumorName"].ToString() + "\",\"doctor\":\"" + reader["doctor"].ToString() +
                     "\",\"body\":\"" + reader["BodyPosition"].ToString() + "\",\"fixedEquipment\":\"" + reader["fename"].ToString() +
                     "\",\"ApplicationTime\":\"" + date1 + "\",\"ApplicationUser\":\"" + reader["doctor"].ToString() + "\"}");
                
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