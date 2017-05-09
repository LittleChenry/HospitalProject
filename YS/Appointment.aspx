<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Appointment.aspx.cs" Inherits="YS_Appiontment" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>

    <title>预约</title>
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
    <script src="../vendor/jquery/jquery1.min.js"></script>
    <script src="../laydate/laydate.js"></script>

</head>
<body>
    <div id="page-wrapper" style="border:0px;margin:0px; min-height: 923px;background:#f8f8f8;">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header  title" id="itemName">体位固定申请</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default"> 
                    <div class="panel-body" id="mainpanelbody">
                        <div class="row">
                            <div class="form-group input-group" style="width:20%;margin-left:40%">
                                <input type="text" id="patientName" oninput="sendsearch(event)" class="form-control" value="" placeholder="请输入患者姓名"/>
                                <span class="input-group-btn" >
                                <button class="btn btn-default" style="height:34px" type="button" id="search"><i class="fa fa-search"></i>
                                </button>
                                </span>
                            </div>
                        </div>
                        <div class="row"  id="patientShow">
                            <%-- 此处放置入口病患信息代码--%>
                            <table  style="width:60%;margin-left:20%"class="table table-striped table-bordered table-hover" >
                                <thead>
                                    <tr style="background-color:#2b2b87;color:white">
                                        <th style="width:25%">疗程流水ID</th>
                                        <th style="width:25%">所属病患姓名</th>
                                        <th style="width:25%">所属病患ID</th>
                                        <th style="width:25%">体位固定申请入口</th>
                                    </tr>
                                </thead>
                            <tbody id="patientTable"></tbody>
                            </table>
                        </div>
                        <div class="row" style="text-align:center">
                            <button class="btn btn-primary btn-xs firstpage" id="firstPage">首页</button>
                            <button class="btn btn-primary btn-xs firstpage" id="previousPage">上一页</button> 
                            <button class="btn btn-primary btn-xs firstpage" id="nextPage">下一页</button>
                            <button class="btn btn-primary btn-xs firstpage" id="lastPage">尾页</button>
                            <input type="hidden" id="currentPage" />
                        </div>
                    </div>

                    <div class="panel-body" id="otherpanelbody" style="display:none;text-align:center">
                        <div class="row">
                            <div class="step-body" id="myStep">
                                <div class="step-header" style="width:80%">
                                    <ul>
                                        <li><p>确认患者基本信息</p></li>
                                        <li><p>填写基本申请信息</p></li>
                                        <li><p>预约固定设备</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        

                        <div class="row" style="height:500px">
                            <div id="confirm" style="position:relative;top:50px">
                                         
                            </div>
                            <div id="recordbase" style="position:relative;display:none;top:50px">
                                <table class="table table-bordered table-striped tableWidth" style="margin-left:33%;width:35%">
                                    <tbody>
                                        <tr>
                                            <th ><label for="treatID" class="height">疗程号</label></th>
                                            <td>
                                                <input id="treatID" name="treatID" type="text" readonly="true" class="form-control controlHeight IsEmpty"  />
                                            </td> 
                                        </tr>
                                        <tr>                                           
                                            <th><label for="modelselect" class="height">模具选择</label></th>
                                            <td>
                                                <select id="modelselect" name="modelselect" class="form-control ">                
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label for="specialrequest" class="height">特殊要求</label></th>
                                            <td>
                                                <select id="specialrequest" name="specialrequest" class="form-control">                
                                                </select>
                                            </td>
                                        </tr>
                               
                                        <tr>
                                            <th><label for="applyuser" class="height">申请人</label></th>
                                            <td>
                                                <input type="text" id="applyuser" name="applyuser" readonly="true" class="form-control controlHeight" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label for="time" class="height">申请时间</label></th>
                                            <td>
                                                <input type="text" id="time" name="time" readonly="true" class="form-control controlHeight" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div id="appoint" style="position:relative;display:none;top:50px">                  
                                <div class="col-md-4 toCenter">
                                    <select id="equipmentName" class="form-control">

                                    </select>
                                </div>
                                <div class="col-md-4 toCenter">
                                    <input id="AppiontDate" class="form-control"  style="width:250px" placeholder="请输入时间" onclick="laydate()" />
                                </div>
                                <div class="col-md-4 toCenter">
                                    <input type="button" id="chooseProject" value="查询该项" />
                                </div>       
                                <div class="col-md-12"> 
                                    <h3 class="itemTime">预约表</h3>
                                    <table class="table table-bordered table-center" id="apptiontTable">
                
                                    </table>
                                </div>
                            </div>
                        </div>

              
                        <div class="row" id="nextpre">
                            <input type="hidden" id="curstep" value="1" />
                            <button id="back" class="btn btn-primary btn-xs">回退界面</button>
                            <button id="preBtn" class="btn btn-primary btn-xs">上一步</button>
                            <button id="nextBtn" class="btn btn-primary btn-xs">下一步</button>
                        </div>
                        <div class="row" id="lastpage" style="display:none">
                            <button id="back1" class="btn btn-primary btn-xs">回退界面</button>
                            <button id="preBtn1" class="btn btn-primary btn-xs" >上一步</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../Scripts/Ys/AppointmentJS.js" type="text/javascript"></script>
</body>
</html>
