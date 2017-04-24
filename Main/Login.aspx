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
    <div class="background-img-fixed" style="margin:auto;text-align:center;">
        <img src="../images/hospital.png" />
    </div>
    <div class="name-logo">
        <div class="row-up row">
            <div class="col-md-3" style="width:260px;">
                <p class="character">江 苏 省 人 民 医 院<span style="display: inline-block; padding-left: 100%;"></span></p>
                <p class="letter l1">JIANGSU PROVINCE HOSPITAL<span style="display: inline-block; padding-left: 100%;"></span></p>
            </div>
            <div class="text-long col-md-4" style="width:443px;">
                <p class="character">南 京 医 科 大 学 第 一 附 属 医 院<span style="display: inline-block; padding-left: 100%;"></span></p>
                <p class="letter l2">THE FIRST AFFILIATED HOSPITAL WITH NANJING MEDICAL UNIVERSITY<span style="display: inline-block; padding-left: 100%;"></span></p>
            </div>
        </div>
        <div class="row-up row">
            <div class="col-md-3" style="width:260px;">
                <p class="character">江 苏 省 红 十 字 医 院<span style="display: inline-block; padding-left: 100%;"></span></p>
                <p class="letter l3">THE RED CROSS HOSPITAL OF JIANGSU<span style="display: inline-block; padding-left: 100%;"></span></p>
            </div>
            <div class="col-md-4" style="width:443px;">
                <p class="character">江 苏 省 临 床 医 学 研 究 院<span style="display: inline-block; padding-left: 100%;"></span></p>
                <p class="letter l4">JIANGSU CLINICAL MEDICINE RESEARCH INSTITUTION<span style="display: inline-block; padding-left: 100%;"></span></p>
            </div>
        </div>
        <div class="line"></div>
    </div>
    <div style="margin:auto;margin-top: -40px;text-align:center;">
        <img src="../images/title.png" />
    </div>
    <form id="frmLogin" runat="server" method="post" action="Login2.aspx">
        <div class="container">
            <div class="row">
                <div style="margin-left:auto;margin-right:auto;">
                    <div id="loginDiv" class="login-panel panel panel-default" style="margin:auto;margin-top:210px;width:350px;">
                        <!--<img class="login-clear-img" src="../images/clear-logo.png" />-->
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
