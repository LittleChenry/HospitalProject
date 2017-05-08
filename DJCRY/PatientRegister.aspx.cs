using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class DJCRY_PatientRegister : System.Web.UI.Page
{
    //数据层操作类
    private DataLayer sqlOperation = new DataLayer("sqlStr");
    protected void Page_Load(object sender, EventArgs e)
    {


        string myispostback = Request["ispostback"];//隐藏字段来标记是否为提交
        //不是第一次加载页面进行录入
        if (myispostback != null && myispostback == "true")
        {
            if (RecordPatientInformation())
            {
                MessageBox.Message("登记成功,即将跳转到患者注册界面");
                Response.Write("<script language=javascript>window.location.replace('../DJCRY/PatientRegister.aspx');</script>");
            }
            else
            {
                MessageBox.Message("登记失败");
            }
        }
       
    }
    private bool RecordPatientInformation()
    {
        string savePath="";
        string savepath1 = "";
        if (FileUpload.HasFile)
        {
            savePath = Server.MapPath("~/upload/Patient");//指定上传文件在服务器上的保存路径
            //检查服务器上是否存在这个物理路径，如果不存在则创建
            if (!System.IO.Directory.Exists(savePath))
            {
                System.IO.Directory.CreateDirectory(savePath);
            }
            savePath = savePath + "\\" + DateTime.Now.ToString("yyyyMMdd") + FileUpload.FileName;
            savepath1 = "../upload/Patient/" + DateTime.Now.ToString("yyyyMMdd") + FileUpload.FileName;
            FileUpload.SaveAs(savePath);
        }
        string maxnumber = "select Max(ID) from patient";
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
        string treatid = DateTime.Now.Year.ToString() + Request.Form["SickPart"] + max;
        string strSqlCommand = "INSERT INTO patient(ID,IdentificationNumber,Hospital,RecordNumber,Picture,Name,Gender,Age,Birthday,Nation,Address,Contact1,Contact2,Height,Weight) VALUES("
         + "@ID,@IdentificationNumber,@Hospital,@RecordNumber,@Picture,@Name,@Gender,@Age,@Birthday,@Nation,@Address,@Contact1,@Contact2,@Height,@Weight)";
        //各参数赋予实际值
        sqlOperation.AddParameterWithValue("@ID", max);
        sqlOperation.AddParameterWithValue("@IdentificationNumber", Request.Form["IDcardNumber"]);
        sqlOperation.AddParameterWithValue("@Hospital", Request.Form["Hospital"]);
        sqlOperation.AddParameterWithValue("@RecordNumber", Request.Form["RecordNumber"]);
        sqlOperation.AddParameterWithValue("@Picture", savepath1);
        sqlOperation.AddParameterWithValue("@Name", Request.Form["userName"]);
        sqlOperation.AddParameterWithValue("@Gender", Request.Form["sex"]);
        sqlOperation.AddParameterWithValue("@Birthday", Request.Form["Birthday"]);
        sqlOperation.AddParameterWithValue("@Age", Convert.ToInt32(DateTime.Now.Year.ToString())-Convert.ToInt32(Request.Form["Birthday"].Substring(0,4)));
        sqlOperation.AddParameterWithValue("@Nation", Request.Form["Nation"]);
        sqlOperation.AddParameterWithValue("@Address", Request.Form["Address"]);
        sqlOperation.AddParameterWithValue("@Contact1", Request.Form["Number1"]);
        sqlOperation.AddParameterWithValue("@Contact2", Request.Form["Number2"]);
        sqlOperation.AddParameterWithValue("@Height", Request.Form["height"]);
        sqlOperation.AddParameterWithValue("@Weight", Request.Form["weight"]);
        int intSuccess = sqlOperation.ExecuteNonQuery(strSqlCommand);
        int intSuccess2 = 0;
        if (intSuccess > 0)
        {
            string treatinsert = "insert into treatment(ID,Patient_ID) values(@ID,@PID)";
            sqlOperation.AddParameterWithValue("@ID", treatid);
            sqlOperation.AddParameterWithValue("@PID", max);
            intSuccess2 = sqlOperation.ExecuteNonQuery(treatinsert);

        }
        if (intSuccess2 > 0)
        {
            return true;
        }
        else
        {
            return false;
        }

    }
}
   
         
   
