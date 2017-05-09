<%@ WebHandler Language="C#" Class="patientFix" %>

using System;
using System.Web;
using System.Text;

public class patientFix : IHttpHandler
{
    private DataLayer sqlOperation = new DataLayer("sqlStr");
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        try
        {
            string json = getpatientFixinfo(context);
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
    private string getpatientFixinfo(HttpContext context)
    {

        String name = context.Request.QueryString["name"];
        if (name == "all")
        {
            int i = 1;
            string countCompute = "select count(fixed.ID) from fixed,treatment,patient where patient.ID=treatment.Patient_ID and treatment.Fixed_ID=fixed.ID and fixed.Application_User_ID is not NULL and fixed.Operate_User_ID is NULL";
            int count = int.Parse(sqlOperation.ExecuteScalar(countCompute));

            string sqlCommand = "select fixed.ID as fixedID,treatment.ID as treatid,equipment.Name as eqname,patient.*,appointment.* from equipment,appointment,treatment,patient,fixed where patient.ID=appointment.patient_ID and appointment.Task='体位固定' and appointment.equipment_ID=equipment.ID and patient.ID=treatment.Patient_ID and fixed.ID=treatment.Fixed_ID and fixed.Application_User_ID is not NULL and fixed.Operate_User_ID is NULL";
            MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
            StringBuilder backText = new StringBuilder("{\"fixedPatient\":[");
            //reader.Read();
            //backText.Append(count);
            while (reader.Read())
            {
                string date = reader["Date"].ToString();
                DateTime dt1 = Convert.ToDateTime(date);
                string date1 = dt1.ToString("yyyy-MM-dd");
                string begin = reader["Begin"].ToString();
                int result=int.Parse(begin);
                int a = result / 60;
                int b = result % 60;
                string Be = a.ToString() + ":" + b.ToString();
                DateTime bb = Convert.ToDateTime(Be);
                string begin11 = bb.ToString("HH:mm");
                string end = reader["End"].ToString();
                int result1 = int.Parse(end);
                int a1 = result1 / 60;
                int b1 = result1 % 60;
                string En = a1.ToString() + ":" + b1.ToString();
                DateTime aa = Convert.ToDateTime(En);
                string end11 = aa.ToString("HH:mm");
                backText.Append("{\"ID\":\"" + reader["ID"].ToString() +
                     "\",\"TreatmentID\":\"" + reader["treatid"].ToString() + "\",\"Name\":\"" + reader["Name"].ToString() +
                     "\",\"FixedID\":\"" + reader["fixedID"].ToString() + "\",\"equipment\":\"" + reader["eqname"].ToString() + "\",\"appointmentDate\":\"" + date1 + "\",\"begin\":\"" + begin11 + "\",\"end\":\"" + end11 + "\"}");
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
            string countCompute = "select count(fixed.ID) from fixed,treatment,patient where patient.ID=treatment.Patient_ID and treatment.Fixed_ID=fixed.ID and fixed.Application_User_ID is not NULL and fixed.Operate_User_ID is NULL and patient.Name LIKE @name";
            sqlOperation.AddParameterWithValue("@name", "%" + name + "%");
            int count = int.Parse(sqlOperation.ExecuteScalar(countCompute));
            string sqlCommand = "select treatment.ID as treatid,fixed.ID as fixedID,equipment.Name as eqname,patient.* ,appointment.* from equipment,appointment,treatment,patient,fixed where patient.ID=appointment.patient_ID and appointment.Task='体位固定' and appointment.equipment_ID=equipment.ID and  patient.ID=treatment.Patient_ID and treatment.Fixed_ID=fixed.ID and fixed.Application_User_ID is not NULL and fixed.Operate_User_ID is NULL and patient.Name LIKE @name";
            sqlOperation.AddParameterWithValue("@name", "%" + name + "%");
            MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand);
            StringBuilder backText = new StringBuilder("{\"fixedPatient\":[");
           // reader.Read();
            //String date = reader["Date"].ToString();
            while (reader.Read())
            {
                string date = reader["Date"].ToString();
                DateTime dt1 = Convert.ToDateTime(date);
                string date1 = dt1.ToString("yyyy-MM-dd");
                string begin = reader["Begin"].ToString();
                int result = int.Parse(begin);
                int a = result / 60;
                int b = result % 60;
                string Be = a.ToString() + ":" + b.ToString();
                DateTime bb = Convert.ToDateTime(Be);
                string begin11 = bb.ToString("HH:mm");
                string end = reader["End"].ToString();
                int result1 = int.Parse(end);
                int a1 = result1 / 60;
                int b1 = result1 % 60;
                string En = a1.ToString() + ":" + b1.ToString();
                DateTime aa = Convert.ToDateTime(En);
                string end11 = aa.ToString("HH:mm");
                backText.Append("{\"ID\":\"" + reader["ID"].ToString() +
                     "\",\"TreatmentID\":\"" + reader["treatid"].ToString() + "\",\"Name\":\"" + reader["Name"].ToString() +
                     "\",\"FixedID\":\"" + reader["fixedID"].ToString() + "\",\"equipment\":\"" + reader["eqname"].ToString() + "\",\"appointmentDate\":\"" + date1 + "\",\"begin\":\"" + begin11 + "\",\"end\":\"" +end11+ "\"}");
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