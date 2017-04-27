<%@ WebHandler Language="C#" Class="treatIDrecord" %>

using System;
using System.Web;
using System.Text;


public class treatIDrecord : IHttpHandler {
    private DataLayer sqlOperation = new DataLayer("sqlStr");
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            string json = InsertTreatment(context);
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
     private String InsertTreatment(HttpContext context)
     {
         String treatid = context.Request.QueryString["treatid"];
         String patientid = context.Request.QueryString["patientID"];
         string sqlCommand = "INSERT INTO treatment(ID,Patient_ID) VALUES(@treatid,@patientid)";
         sqlOperation.AddParameterWithValue("@treatid", treatid);
         sqlOperation.AddParameterWithValue("@patientid", patientid);
         int intSuccess = sqlOperation.ExecuteNonQuery(sqlCommand);
         if (intSuccess > 0)
             return "success";
         else
             return "failure";
     }
}