<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Main_Login2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>请登录</title>
    <!-- Main CSS -->
    <link href="../css/main.css" rel="stylesheet" />

    <link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet" />
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet" />
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/Login.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Scripts/LoginJS.js"></script>
</head>
<body>
    <form id="frmLogin" runat="server" method="post" action="Login2.aspx">
        <div style="margin:auto;text-align:center;">
            <img src="../images/logo.gif" />
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <div id="loginDiv" class="login-panel panel panel-default" style="margin:auto;margin-top:210px;width:350px;">
                        <div class="panel-heading">
                            <h1 class="login-title">请登录</h1>
                        </div>
                        <div class="login-panel-self panel-body">
                            <input type="hidden" name="ispostback" value="true" />
                            <div class="form-group">
                                <span class="login-span">账号：</span>
                                <input id="userNumber" class="form-control isEmpty userName" placeholder="请输入账号" name="userNumber" type="text" autofocus="" />
                            </div>
                            <div class="form-group">
                                <span class="login-span">密码：</span>
                                <input id="userKey" class="form-control isEmpty userKey" placeholder="请输入密码" name="userKey" type="password" value="" />
                            </div>
                            <div class="login-font checkbox">
                                <label>
                                    <input id="saveUserKey" name="remember" type="checkbox" value="Remember Me" class="checkbox" />记住账号
                                </label>
                                <label class="login-label">
                                    <a id="registration" href="Regedit.aspx">注册</a>
                                </label>
                            </div>
                            
                            <input id="login" type="button" value="登陆" class="btn btn-lg btn-success btn-block" />
                        </div>
                    </div>
                    <div>
                        <label id="error"></label>
                    </div>
                    <div id="chooseRole" class="login-panel panel panel-default" style="margin-top:210px;display:none;">
                        <div class="panel-heading">
                            <h1 class="login-title">请选择登录角色</h1>
                        </div>
                        <div class="panel-body">
                            <div class="form-group">
                                <select id="userRole" class="login-select form-control"></select>
                            </div>
                            <br />
                            <input id="login2" type="button" value="登陆" class="btn btn-lg btn-success btn-block"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
