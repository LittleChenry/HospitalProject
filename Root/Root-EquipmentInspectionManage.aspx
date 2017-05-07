<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Root-EquipmentInspectionManage.aspx.cs" Inherits="Root_Root_EquipmentInspectionManage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>

    <title>设备检查管理</title>
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
                <h1 class="page-header">设备检查管理</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-3">&nbsp;</div>
                <div class="col-md-4 toCenter">
                    <label for="cycle">检查周期:</label>
                        <select id="cycle" class="form-control">
                            <option value="">请选择检查周期</option>
                            <option value="day">日检</option>
                            <option value="month">月检</option>
                            <option value="year">年检</option>
                        </select>
                </div>
                <div class="col-md-3 toCenter">
                    <input type="button" value="确定" id="sure" class="btn btn-primary btn-sm" />
                    <%--<input type="hidden" value="false" id="fillATable" />--%>
                </div>
            </div>
            <div class="col-md-12 todown minw">
                <div class="panel panel-default minw">
                    <div class="panel-heading">
                        <span id="cycleTitle">日检表</span>
                        <input type="button" value="修改" id="changeTable" class="floatRight btn btn-info btn-sm clearTBPadding" />
                        <input type="button" value="新增" id="addItem" class="floatRight btn btn-info btn-sm clearTBPadding" />
                        <input type="button" value="确定" id="sureChange" class="floatRight btn btn-info btn-sm clearTBPadding" />
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
                                <div class="col-sm-6">&nbsp;</div>
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
            <div class="col-md-12" id="middleArea"></div>
            <div class="col-md-12" id="topArea">
                <form id="addItemFrm" method="post">
                    <label id="error" class="error"></label>
                        <table class="table table-bordered table-striped tableWidth">
                            <tbody>
                                <tr>
                                    <th class="noborder"><label for="roleName" class="height">所属项目</label></th>
                                    <td>
                                        <select id="MainItemSelect" class="form-control">

                                        </select>
                                        <input id="MainItem" type="text" class="form-control controlHeight tohidden MainItemSelect" placeholder="请输入所属项目" />
                                    </td>                                           
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="roleDescription" class="height">项目名</label></th>
                                    <td>
                                        <input id="childItem" type="text" class="form-control controlHeight IsEmpty" placeholder="请输入项目名称" />
                                    </td>
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="function2role" class="height">无调强检查</label></th>
                                    <td>
                                        <select id="UIMRTUnit" class="form-control">
                                            <option value="NA">NA</option>
                                            <option value="IsOK">功能正常</option>
                                            <option value="write" selected="true">填写</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="roleDescription" class="height">无调强参考值</label></th>
                                    <td>
                                        <input id="UIMRTReference" type="text" class="form-control controlHeight rightValue" placeholder="请输入无调强参考值" />
                                    </td>
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="roleDescription" class="height">无调强误差</label></th>
                                    <td>
                                        <input id="UIMRTError" type="text" class="form-control controlHeight rightValue" placeholder="请输入无调强误差" />
                                    </td>
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="roleDescription" class="height">调强检查</label></th>
                                    <td>
                                        <select id="IMRTUnit" class="form-control">
                                            <option value="NA">NA</option>
                                            <option value="IsOK">功能正常</option>
                                            <option value="write" selected="true">填写</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="roleDescription" class="height">调强参考值</label></th>
                                    <td>
                                        <input id="IMRTReference" type="text" class="form-control controlHeight rightValue" placeholder="请输入调强参考值" />
                                    </td>
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="roleDescription" class="height">调强误差</label></th>
                                    <td>
                                        <input id="IMRTError" type="text" class="form-control controlHeight rightValue" placeholder="请输入调强误差" />
                                    </td>
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="roleDescription" class="height">SRS/SBRT检查</label></th>
                                    <td>
                                        <select id="SRSUnit" class="form-control">
                                            <option value="NA">NA</option>
                                            <option value="IsOK">功能正常</option>
                                            <option value="write" selected="true">填写</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="roleDescription" class="height">SRS/SBRT参考值</label></th>
                                    <td>
                                        <input id="SRSReference" type="text" class="form-control controlHeight rightValue" placeholder="请输入SRS参考值" />
                                    </td>
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="roleDescription" class="height">SRS/SBRT误差</label></th>
                                    <td>
                                        <input id="SRSError" type="text" class="form-control controlHeight rightValue" placeholder="请输入SRS误差值" />
                                    </td>
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="roleDescription" class="height">检查周期</label></th>
                                    <td>
                                        <select id="addCycle" class="form-control">
                                            <option value="day">日检</option>
                                            <option value="month">月检</option>
                                            <option value="year">年检</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align:center">
                                        <input id="submitAdd" type="button" value="提交" class="btn btn-success btn-sm buttonMar" />
                                        <input id="addCannel" type="reset" value="取消" class="btn btn-success btn-sm" />
                                    </td>
                                </tr>     
                            </tbody>
                       </table>
                    </form>
            </div>
        </div>
        <!-- /.row -->
    </div>
    <script type="text/javascript" src="../Scripts/Root/EquipmentInspectionJS.js"></script>
</body>
</html>
