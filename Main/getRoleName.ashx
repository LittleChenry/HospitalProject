<%@ WebHandler Language="C#" Class="getRoleName" %>

using System;
using System.Web;

public class getRoleName : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string role = context.Request.QueryString["role"];
        string name = UserInformation.GetRoleName()[role];
        context.Response.Write(role + " "+ name);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}