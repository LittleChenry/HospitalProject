<%@ WebHandler Language="C#" Class="LocationApplyRecord" %>

using System;
using System.Web;

public class LocationApplyRecord : IHttpHandler {
    DataLayer sqlOperation = new DataLayer("sqlStr");
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        string result = AddLocationApplyRecord(context);
        context.Response.Write(result);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
    public string AddLocationApplyRecord(HttpContext context)
    {
        //获取表单信息

        string appoint = context.Request.QueryString["id"];
        string PID = context.Request.QueryString["pid"];
        string treatid = context.Request.QueryString["treatid"];
        string scanpart = context.Request.QueryString["scanpart"];
        string scanmethod = context.Request.QueryString["scanmethod"];
        string user = context.Request.QueryString["user"];
        string add = context.Request.QueryString["add"];
        string addmethod = context.Request.QueryString["addmethod"];
        string up = context.Request.QueryString["up"];
        string down = context.Request.QueryString["down"];
        string remark = context.Request.QueryString["remark"];
        string require = context.Request.QueryString["requirement"];

        string finishappoint = "update appointment set Patient_ID=@Patient,Treatment_ID=@treat,state=1 where ID=@id";
        sqlOperation.AddParameterWithValue("@id", Convert.ToInt32(appoint));
        sqlOperation.AddParameterWithValue("@Patient", Convert.ToInt32(PID));
        sqlOperation.AddParameterWithValue("@treat", Convert.ToInt32(treatid));
        int Success1 = sqlOperation.ExecuteNonQuery(finishappoint);

        string maxnumber = "SELECT MAX(ID) FROM Location";
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
        string strSqlCommand = "INSERT INTO Location(ID,Appointment_ID,ScanPart_ID,ScanMethod_ID,UpperBound,Enhance,EnhanceMethod_ID,LowerBound,LocationRequirements_ID,Remarks,Application_User_ID,ApplicationTime) " +
                                "VALUES(@ID,@Appointment_ID,@ScanPart_ID,@ScanMethod_ID,@UpperBound,@Enhance,@EnhanceMethod_ID,@LowerBound,@LocationRequirements_ID,@Remarks,@Application_User_ID,@ApplicationTime)";
        sqlOperation.AddParameterWithValue("@ID", max);
        sqlOperation.AddParameterWithValue("@Appointment_ID", Convert.ToInt32(appoint));
        sqlOperation.AddParameterWithValue("@ScanPart_ID", Convert.ToInt32(scanpart));
        sqlOperation.AddParameterWithValue("@ScanMethod_ID", Convert.ToInt32(scanmethod));
        sqlOperation.AddParameterWithValue("@UpperBound", up);
        sqlOperation.AddParameterWithValue("@ApplicationTime", DateTime.Now);
        sqlOperation.AddParameterWithValue("@LowerBound", down);
        sqlOperation.AddParameterWithValue("@LocationRequirements_ID", Convert.ToInt32(require));
        sqlOperation.AddParameterWithValue("@Remarks", remark);
        sqlOperation.AddParameterWithValue("@Application_User_ID",  Convert.ToInt32(user));
        sqlOperation.AddParameterWithValue("@Enhance",  Convert.ToInt32(add));
        if (Convert.ToInt32(add) == 1)
        {
            sqlOperation.AddParameterWithValue("@EnhanceMethod_ID", Convert.ToInt32(addmethod));
        }
        else
        {
            sqlOperation.AddParameterWithValue("@EnhanceMethod_ID", null);
        }
        
        int intSuccess = sqlOperation.ExecuteNonQuery(strSqlCommand);

        //将诊断ID填入treatment表
        string inserttreat = "update treatment set Location_ID=@Location_ID where ID=@treat";
        sqlOperation.AddParameterWithValue("@Location_ID", max);
        sqlOperation.AddParameterWithValue("@treat", Convert.ToInt32(treatid));
        int Success = sqlOperation.ExecuteNonQuery(inserttreat);
        if (intSuccess > 0 && Success > 0 && Success1 > 0)
        {
            return "success";
        }
        else
        {
            return "failure";
        }

    }
        

}