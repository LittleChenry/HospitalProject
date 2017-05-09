<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PatientRegister.aspx.cs" Inherits="DJCRY_PatientRegister" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>

    <title>患者就诊</title>
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
      <link rel="stylesheet" href="../editor/themes/default/default.css" />
	<script  src="../editor/kindeditor.js"></script>
	<script src="../editor/lang/zh_CN.js"></script>
    <link href="../CSS/Welcome.css" rel="stylesheet" type="text/css" />
         <script src="../vendor/jquery/jquery1.min.js"></script>
    <script src="../laydate/laydate.js"></script>
    <script src="../Scripts/DJCRY/PatientRegister.js" ></script>

</head>
<body>
    <div id="page-wrapper" style="border:0px;margin:0px; min-height: 923px;background:#f8f8f8;">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header  title" id="itemName">患者基本信息录入</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default"> 
                    <div class="panel-body" id="mainpanelbody">
                        <div class="row" style="height:1000px">
                            <form id="frmRegist" method="post" runat="server">
                                <input type="hidden" name="ispostback" value="true" />
                                <div class="container">
                                    <div class="row">
                                        <div id="loginDiv" class="login-panel panel panel-default" style="margin:auto;margin-top:110px;width:500px;">
                                            <div class="panel-heading">
                                                <h1 class="login-title">请输入患者基本信息</h1>
                                            </div>
                                            <div class="panel-self panel-body">
                                                <div class="regedit-input form-group">
                                                    <label for="userName" class="regedit-label col-sm-4 control-label">姓名：</label>
                                                    <div class="col-sm-8">
                                                        <input id="userName" type="text" size="30" name="userName" class="form-control isEmpty userName" placeholder="请输入姓名" />
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label for="IDcardNumber" class="regedit-label col-sm-4 control-label">身份证号：</label>
                                                    <div class="col-sm-8">
                                                        <input id="IDcardNumber" type="text" name="IDcardNumber" size="30" class="form-control isEmpty IDcardNumber" placeholder="请输入身份证号" />
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label class="regedit-label col-sm-4 control-label">性别：</label>
                                                    <div class="col-sm-8">
                                                        <label for="male" >
                                                            <input id="male" type="radio" name="sex" checked="true" class="checkSex" style="width:20pt" value="M" />
                                                            男
                                                        </label>
                                                        &nbsp;&nbsp;
                                                        <label for="female">
                                                            <input id="female" type="radio" name="sex" class="checkSex" style="width:20pt" value="F" />
                                                            女
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label for="Hospital" class="regedit-label col-sm-4 control-label">就诊医院：</label>
                                                    <div class="col-sm-8">
                                                        <input id="Hospital" type="text" name="Hospital" size="30" class="form-control isEmpty Hospital" placeholder="请输入就诊医院" />
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label for="RecordNumber" class="regedit-label col-sm-4 control-label">病案号：</label>
                                                    <div class="col-sm-8">
                                                        <input id="RecordNumber" type="text" name="RecordNumber" size="30" class="form-control isEmpty RecordNumber" placeholder="请输入病案号" />
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label for="Birthday" class="regedit-label col-sm-4 control-label">出生日期：</label>
                                                    <div class="col-sm-8">
                                                        <input id="Birthday" type="text" name="Birthday" size="30" onclick="laydate()"  class="form-control isEmpty Birthday" placeholder="请选择出生日期" />
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label for="Nation" class="regedit-label col-sm-4 control-label">民族：</label>
                                                    <div class="col-sm-8">
                                                        <input id="Nation" type="text" name="Nation" size="30"   class="form-control isEmpty Nation" placeholder="请填写民族" />
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label for="Address" class="regedit-label col-sm-4 control-label">家庭住址：</label>
                                                    <div class="col-sm-8">
                                                        <input id="Address" type="text" name="Address" size="30"   class="form-control isEmpty Address" placeholder="请填写地址" />
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label for="Number1" class="regedit-label col-sm-4 control-label">电话1：</label>
                                                    <div class="col-sm-8">
                                                        <input id="Number1" type="text" name="Number1" size="30"   class="form-control  Number1" placeholder="请填写联系方式1" />
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label for="Number2" class="regedit-label col-sm-4 control-label">电话2：</label>
                                                    <div class="col-sm-8">
                                                        <input id="Number2" type="text" name="Number2" size="30"   class="form-control  Number2" placeholder="请填写联系方式2" />
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label for="height" class="regedit-label col-sm-4 control-label">身高：</label>
                                                    <div class="col-sm-8">
                                                        <input id="height" type="text" name="height" size="30"   class="form-control isEmpty height" placeholder="请填写身高" />
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label for="weight" class="regedit-label col-sm-4 control-label">体重：</label>
                                                    <div class="col-sm-8">
                                                        <input id="weight" type="text" name="weight" size="30"   class="form-control isEmpty weight" placeholder="请填写体重" />
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label for="SickPart" class="regedit-label col-sm-4 control-label">患病部位：</label>
                                                    <div class="col-sm-8">
                                                        <select id="SickPart" name="SickPart" class="form-control SickPart">                
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="regedit-input form-group">
                                                    <label for="Picture" class="regedit-label col-sm-4 control-label">照片：</label>
                                                    <div class="col-sm-8">
                                                        <asp:FileUpload ID="FileUpload" runat="server" />
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <input type="submit" value="确定" class="regedit-button col-sm-4 btn btn-success btn-lg" />
                                                    <input type="reset" value="重置" class="regedit-button col-sm-4 btn btn-success btn-lg" />
                                                </div>
                                                </div>
                                            <label id="error" style="margin-left:54px;"></label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>