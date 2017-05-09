<%@ WebHandler Language="C#" Class="getApplicationUser" %>

using System;
using System.Web;
using System.Text;
public class getApplicationUser : IHttpHandler {

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

       
        string sqlCommand1 = "select user.Name as appuser from user,treatment,patient,fixed where patient.ID=treatment.Patient_ID and treatment.Fixed_ID=fixed.ID and fixed.Application_User_ID=user.ID and fixed.Application_User_ID is not NULL and fixed.Operate_User_ID is NULL and fixed.ID = @fixedid";

        sqlOperation.AddParameterWithValue("@fixedid", FixedID);
        MySql.Data.MySqlClient.MySqlDataReader reader = sqlOperation.ExecuteReader(sqlCommand1);

        StringBuilder backText = new StringBuilder("{\"applicationUser\":[");
        //backText.Append(reader.Read());
        while (reader.Read())
        {
            backText.Append("{\"ApplicationUser\":\"" + reader["appuser"].ToString() + "\"}");

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