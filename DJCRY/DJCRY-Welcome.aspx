<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DJCRY-Welcome.aspx.cs" Inherits="DJCRY_DJCRY_Welcome" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>

    <title></title>
    <!-- Bootstrap Core CSS -->
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

    <!-- MetisMenu CSS -->
    <link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet" />

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet" />

    <!-- Morris Charts CSS -->
    <link href="../vendor/morrisjs/morris.css" rel="stylesheet" />
    <!-- Custom Fonts -->
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/Welcome.css" rel="stylesheet" type="text/css" />

    <script src="../Scripts/DJCRY/DJCRYwelcome.js" type="text/javascript"></script>
</head>
<body>
    <input id="type" type="hidden" value="DJCRY" />
    <div style="min-height:556px;">
        <h1 class="page-header title">欢迎使用本系统</h1>
        <div class="panel panel-default notice">
            <div class="welcome-title panel-heading">
                <span class="welcome-span panel-title">通知栏</span>
            </div>
            <div class="panel-body">
                <div class="row">
                    <ul id="information" class="list-unstyled" ></ul>
                </div>
                <div class="row">
                    <div style="text-align:center;">
                        <button class="btn btn-primary firstpage" id="firstPage">首页</button>
                        <button class="btn btn-primary firstpage" id="previousPage">上一页</button>
                        <button class="btn btn-primary firstpage" id="nextPage">下一页</button>
                        <button class="btn btn-primary firstpage" id="lastPage">尾页</button>
                        <input type="hidden" id="currentPage" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>