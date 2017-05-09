<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Root_EquipmentInspection.aspx.cs" Inherits="Root_Root_EquipmentInspection" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>

    <title>设备检查</title>
    <!-- Main CSS -->
    <link href="../css/main.css" rel="stylesheet" />

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
</head>
<body>
    <div id="page-wrapper" style="border:0px;margin:0px; min-height: 923px;background:#f8f8f8;">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">设备检查</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-5">
                    <label for="equipment">检查设备:</label>
                    <select id="equipment" class="form-control">
                        <option value="">--请选择检查设备--</option>
                    </select>
                </div>
                <div class="col-md-4 toCenter">
                    <label for="cycle">检查周期:</label>
                        <select id="cycle" class="form-control">
                            <option value="">--请选择检查周期--</option>
                            <option value="day">日检</option>
                            <option value="month">月检</option>
                            <option value="year">年检</option>
                        </select>
                </div>
                <div class="col-md-3 toCenter">
                    <input type="button" value="确定" id="sure" class="btn btn-primary btn-sm" />
                </div>
            </div>
            <div class="col-md-12 todown minwid">
                <div class="panel panel-default minwid">
                    <div class="panel-heading">
                        <span id="cycleTitle">日检表</span>
                        <input type="button" value="填写该表" id="fillTable" class="floatRight btn btn-info btn-sm clearTBPadding" />
                        <input type="button" value="确定" id="sureFill" class="floatRight btn btn-info btn-sm clearTBPadding" />
                        <input type="button" value="取消" id="cannel" class="floatRight btn btn-info btn-sm clearTBPadding" />
                    </div>
                    <div class="panel-body">
                        <div>
                            <div class="row">
                                <%--<form id="tablefrm" method="post" action="Root-EquipmentInspectionManage.aspx">--%>
                                    <input type="hidden" id="sumPage" value="0" />
                                    <input type="hidden" id="currentPage" value="0" />
                                    <div class="col-sm-12" id="tableArea">

                                    </div>
                               <%-- </form>--%>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="tohidden" id="chooseFunctionState">
                                        <label>功能状态:</label>
                                        <label><input type="radio" name="functionStateRadio" value="1" />正常</label>
                                        <label><input type="radio" name="functionStateRadio" value="0" />不正常</label>
                                    </div>
                                </div>
                                <div class="col-sm-6 todown">
                                    <div class="toright">
                                        <button type="button" id="firstPage" class="btn btn-primary btn-sm disabled">首页</button>
                                        <button type="button" id="prePage" class="btn btn-primary btn-sm disabled">上一页</button>
                                        <button type="button" id="nexrPage" class="btn btn-primary btn-sm">下一页</button>
                                        <button type="button" id="lastPage" class="btn btn-primary btn-sm">末页</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../Scripts/Root/EquipmentRecordJS.js" type="text/javascript"></script>
</body>
</html>
