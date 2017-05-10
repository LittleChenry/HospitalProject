<%@ WebHandler Language="C#" Class="fixedApplyRecord" %>

using System;
using System.Web;

public class fixedApplyRecord : IHttpHandler {

    DataLayer sqlOperation = new DataLayer("sqlStr");
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        string result = AddFixRecord(context);
        context.Response.Write(result);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
    public string AddFixRecord(HttpContext context)
    {
        //获取表单信息

        string appoint = context.Request.QueryString["id"];
        string PID = context.Request.QueryString["pid"];
        string treatid = context.Request.QueryString["treatid"];
        string model = context.Request.QueryString["model"];
        string fixreq = context.Request.QueryString["fixreq"];
        string user = context.Request.QueryString["user"];
        string fixequip = context.Request.QueryString["fixequip"];
        string bodypost = context.Request.QueryString["bodypost"];

        string finishappoint = "update appointment set Patient_ID=@Patient,Treatment_ID=@treat,state=1 where ID=@id";
        sqlOperation.AddParameterWithValue("@id",Convert.ToInt32(appoint));
        sqlOperation.AddParameterWithValue("@Patient", Convert.ToInt32(PID));
        sqlOperation.AddParameterWithValue("@treat", Convert.ToInt32(treatid));
        int Success1 = sqlOperation.ExecuteNonQuery(finishappoint);

        string maxnumber = "SELECT MAX(ID) FROM fixed";
        string count = sqlOperation.ExecuteScalar(maxnumber);
        int max;
        if (count == "")
        {
            max = 1;
        }
        else
        {
            max = int.Parse(count) + 1;
        }
        //将信息写入数据库，并返回是否成功
        string strSqlCommand = "INSERT INTO fixed(ID,Appointment_ID,Model_ID,FixedRequirements_ID,Application_User_ID,ApplicationTime,BodyPosition,FixedEquipment_ID) " +
                                "VALUES(@ID,@Appointment_ID,@Model_ID,@FixedRequirements_ID,@Application_User_ID,@ApplicationTime,@BodyPosition,@FixedEquipment_ID)";
        sqlOperation.AddParameterWithValue("@ID", max);
        sqlOperation.AddParameterWithValue("@Appointment_ID", Convert.ToInt32(appoint));
        sqlOperation.AddParameterWithValue("@Model_ID", Convert.ToInt32(model));
        sqlOperation.AddParameterWithValue("@FixedRequirements_ID", Convert.ToInt32(fixreq));
        sqlOperation.AddParameterWithValue("@Application_User_ID", Convert.ToInt32(user));
        sqlOperation.AddParameterWithValue("@ApplicationTime", DateTime.Now);
        sqlOperation.AddParameterWithValue("@BodyPosition", bodypost);
        sqlOperation.AddParameterWithValue("@FixedEquipment_ID", fixequip);
        int intSuccess = sqlOperation.ExecuteNonQuery(strSqlCommand);

        //将诊断ID填入treatment表
        string inserttreat = "update treatment set Fixed_ID=@fix_ID where ID=@treat";
        sqlOperation.AddParameterWithValue("@fix_ID", max);
        sqlOperation.AddParameterWithValue("@treat", Convert.ToInt32(treatid));
        int Success = sqlOperation.ExecuteNonQuery(inserttreat);
        if (intSuccess > 0 && Success > 0 && Success1>0)
        {
            return "success";
        }
        else
        {
            return "failure";
        }

    }
        

}