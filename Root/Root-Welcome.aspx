<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Root-Welcome.aspx.cs" Inherits="Root_Root_Welcome" %>

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

    <script src="../Scripts/NoticeJS.js" type="text/javascript"></script>
</head>
<body>
    <input id="type" type="hidden" value="Root" />
    <div style="min-height:556px;">
        <h1 class="page-header title">欢迎使用本系统</h1>
        <div class="panel panel-default notice">
            <div class="panel-heading">
                <h3 class="panel-title">通知栏</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <!--<div class="col-lg-6">-->
                        <ul id="information" >
                            
                        </ul>

                    <!--</div>-->
                </div>
                <div class="row">
                    <span style="float:right">
                     <button class="btn btn-primary btn-xs firstpage" id="firstPage">首页</button>
                    <button class="btn btn-primary btn-xs firstpage" id="nextPage">下一页</button>
                    <button class="btn btn-primary btn-xs firstpage" id="previousPage">上一页</button>
                    <button class="btn btn-primary btn-xs firstpage" id="lastPage">尾页</button>
                        <input type="hidden" id="currentPage" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
