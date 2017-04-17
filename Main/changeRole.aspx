<%@ Page Language="C#" AutoEventWireup="true" CodeFile="changeRole.aspx.cs" Inherits="Main_changeRole" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>请登录</title>
    <!-- Main CSS -->
    <link href="../css/main.css" rel="stylesheet" />

    <link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet" />
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet" />
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/Login.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/changeRole.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Scripts/changeRoleJS.js"></script>
</head>
<body>
    <div class="container rect">
        <div class="row top-margin">
            <div class="col-md-4 col-md-offset-4">
                <div id="chooseRole" class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">请选择角色</h3>
                    </div>
                    <div class="panel-body">
                    <div class="form-group dropDownList">
                        <select id="userRole"></select>
                    </div>
                    <br />
                    <input id="login" type="button" value="切换" class="btn btn-lg btn-success btn-block"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
