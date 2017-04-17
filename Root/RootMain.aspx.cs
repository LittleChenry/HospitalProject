/* ***********************************************************
 * FileName: RootMain.aspx.cs
 * Writer: peach
 * create Date: 2017-4-10
 * ReWriter:
 * Rewrite Date:
 * impact :
 * 
 * **********************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ROOT_ROOTMain : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["loginUser"] == null)
            {
                MessageBox.Message("请先登陆");
                Response.Write("<script language=javascript>window.location.replace('../Main/Login.aspx');</script>");
            }
            else
            {
                UserInformation user = (Session["loginUser"] as UserInformation);
                user.setUserRole("Root");
                Session["loginUser"] = user;
            }
        }
    }
}