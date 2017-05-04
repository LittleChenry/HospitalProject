<%@ WebHandler Language="C#" Class="recordDiag" %>

using System;
using System.Web;

public class recordDiag : IHttpHandler {
     DataLayer sqlOperation = new DataLayer("sqlStr");
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string result = AddDiagnoseRecord(context);
        context.Response.Write(result);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
    public string AddDiagnoseRecord(HttpContext context)
    {
        //获取表单信息

        string treatID =context.Request.QueryString["treatid"];
        string sub = context.Request.QueryString["sub"];
        string princal = context.Request.QueryString["prin"];
        string part = context.Request.QueryString["part"];
        string diagresult = context.Request.QueryString["diagresult"];
        string diaguserid =context.Request.QueryString["diaguserid"];
        string remark = context.Request.QueryString["remark"];
        //获取diagnosisrecord最大记录数
        string maxnumber = "SELECT MAX(ID) FROM diagnosisrecord";
        string count = sqlOperation.ExecuteScalar(maxnumber);
        int max;
        if (count=="")
        {
            max = 1;
        }
        else
        {
            max = int.Parse(count) + 1;
        }

        //将信息写入数据库，并返回是否成功
        string strSqlCommand = "INSERT INTO diagnosisrecord(ID,SubCenterPrincipal_ID,Principal_User_ID,Treatment_ID,Part_ID,DiagnosisResult_ID,Diagnosis_User_ID,Time,Remarks) " +
                                "VALUES(@ID,@SubCenterPrincipal_ID,@Principal_User_ID,@Treatment_ID,@Part_ID,@DiagnosisResult_ID,@Diagnosis_User_ID,@Time,@Remarks)";

        sqlOperation.AddParameterWithValue("@ID", max);
        sqlOperation.AddParameterWithValue("@SubCenterPrincipal_ID", Convert.ToInt32(sub));
        sqlOperation.AddParameterWithValue("@Principal_User_ID", Convert.ToInt32(princal));
        sqlOperation.AddParameterWithValue("@Treatment_ID", Convert.ToInt32(treatID));
        sqlOperation.AddParameterWithValue("@DiagnosisResult_ID", Convert.ToInt32(diagresult));
        sqlOperation.AddParameterWithValue("@Diagnosis_User_ID", Convert.ToInt32(part));
        sqlOperation.AddParameterWithValue("@Part_ID", Convert.ToInt32(diaguserid));
        sqlOperation.AddParameterWithValue("@Time", DateTime.Now);
        sqlOperation.AddParameterWithValue("@Remarks", remark);
        int intSuccess = sqlOperation.ExecuteNonQuery(strSqlCommand);

        //将诊断ID填入treatment表
        string inserttreat = "update treatment set DiagnosisRecord_ID=@DiagnosisRecord_ID where ID=@treat";
        sqlOperation.AddParameterWithValue("@DiagnosisRecord_ID",max);
        sqlOperation.AddParameterWithValue("@treat", Convert.ToInt32(treatID));
        int Success = sqlOperation.ExecuteNonQuery(inserttreat);
        if (intSuccess > 0 && Success > 0)
        {
            return "success";
        }
        else
        {
           return "failure";
        }

    }
        
        
        
    }
    