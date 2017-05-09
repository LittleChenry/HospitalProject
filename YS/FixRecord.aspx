<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FixRecord.aspx.cs" Inherits="YS_FixRecord" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
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
                <h1 class="page-header  title" id="itemName">体位固定记录</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default"> 
                    <div class="panel-body" id="patientspanelbody">
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
                                        <th style="width:15%">疗程号</th>
                                        <th style="width:15%">病患姓名</th>
                                        <th style="width:20%">预约设备</th>
                                        <th style="width:30%">预约时间</th>
                                        <th style="width:20%">体位固定记录入口</th>
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

                    <div class="panel-body" id="singlepatientpanelbody" style="display:none;text-align:center">
                        <form id="saveFixRecord" method="post" runat="server">
                            <table class="table table-bordered table-hover" style="width:80%;margin:auto;">
                                <tbody>
                                    <tr class="warning">
                                        <td colspan="6" style="height:45px;">病人信息</td>
                                    </tr>
                                    <tr>
                                        <td style="width:16.6%;">姓名</td>
                                        <td id="Name" style="width:16.6%;"></td>
                                        <td style="width:16.6%;">性别</td>
                                        <td id="Gender" style="width:16.6%;"></td>
                                        <td style="width:16.6%;">年龄</td>
                                        <td id="Age" style="width:16.6%;"></td>
                                    </tr>
                                    <tr>
                                        <td>住址</td>
                                        <td id="Address" colspan="2"></td>
                                        <td>联系方式</td>
                                        <td id="Contact" colspan="2"></td>
                                    </tr>
                                    <tr class="info">
                                        <td colspan="6" style="height:45px;">申请信息</td>
                                    </tr>
                                    <tr>
                                        <td>疗程号</td>
                                        <td id="treatID"></td>
                                        <td>诊断结果</td>
                                        <td id="diagnosisresult"></td>
                                        <td>诊断医生</td>
                                        <td id="doctor"></td>
                                    </tr>
                                    <tr>
                                        <td>体位</td>
                                        <td id="body"></td>
                                        <td>固定模具</td>
                                        <td id="modelID"></td>
                                        <td>特殊要求</td>
                                        <td id="requireID"></td>
                                    </tr>
                                    <tr>
                                        <td>固定装置</td>
                                        <td id="fixedEquipment"></td>
                                        <td>申请医生</td>
                                        <td id="ApplicationUser"></td>
                                        <td>申请时间</td>
                                        <td id="ApplicationTime"></td>
                                    </tr>
                                    <tr class="success">
                                        <td colspan="6" style="height:45px;">体位固定记录</td>
                                    </tr>
                                    <tr>
                                        <td>体位详细描述</td>
                                        <td colspan="5">
                                            <textarea id="BodyPositionDetail" class="form-control" rows="3"></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>附件描述</td>
                                        <td colspan="5">
                                            <textarea id="AnnexDescription" class="form-control" rows="3"></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>备注</td>
                                        <td colspan="5">
                                            <textarea id="Remarks" class="form-control" rows="2"></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>固定摄像图片</td>
                                        <td colspan="5">
                                            <asp:FileUpload ID="FileUpload" runat="server" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="row" style="margin-top:30px;margin-bottom:30px;">
                                <button id="cancel" class="btn btn-default" style="margin-right:40px;">返回</button>
                                <button id="save" class="btn btn-success">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../Scripts/Ys/Fixed.js" type="text/javascript"></script>
</body>
</html>
