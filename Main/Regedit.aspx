<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Regedit.aspx.cs" Inherits="Main_Regedit" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>请注册</title>
    <!-- Main CSS -->
    <link href="../css/main.css" rel="stylesheet" />

    <link type="text/css" rel="stylesheet" href="../CSS/Regedit.css" />
    <link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet" />
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet" />
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Scripts/RegeditJS.js"></script>
</head>
<body>
    <form id="frmRegist" action="Regedit.aspx" method="post">
        <input type="hidden" name="ispostback" value="true" />
		<div style="margin:auto;text-align:center;">
            <img src="../images/logo.gif" />
        </div>
		<div class="container">
			<div class="row">
				<div id="loginDiv" class="login-panel panel panel-default" style="margin:auto;margin-top:110px;width:500px;">
                    <div class="panel-heading">
                        <h1 class="login-title">请输入注册信息</h1>
                    </div>
                    <div class="panel-self panel-body">
                        <div class="regedit-input form-group">
						    <label for="userName" class="regedit-label col-sm-4 control-label">用户名：</label>
						    <div class="col-sm-8">
                            	<input id="userName" type="text" size="30" name="userName" class="form-control isEmpty userName" placeholder="请输入用户名" />
							</div>
						</div>

                        <div class="regedit-input form-group">
                            <label for="name" class="regedit-label col-sm-4 control-label">姓名：</label>
						    <div class="col-sm-8">
							    <input id="name" type="text" name="Name" size="30" class="form-control isEmpty name" placeholder="请输入姓名" />
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
                            <label for="userKey" class="regedit-label col-sm-4 control-label">密码：</label>
						    <div class="col-sm-8">
                            	<input id="userKey" type="password" size="30" name="userKey" class="form-control isEmpty userKey" placeholder="请输入密码"/>
							</div
                                >
						</div>

                        <div class="regedit-input form-group">
                            <label for="checkPassWord" class="regedit-label col-sm-4 control-label">确认密码：</label>
						    <div class="col-sm-8">
							    <input id="checkPassWord" type="password" size="30"  name="checkPassWord" class="form-control checkPassWordError checkUserKey" placeholder="请再次输入密码"/>
							</div>
						</div>

                        <div class="regedit-input form-group">
                            <label for="office" class="regedit-label col-sm-4 control-label">办公室：</label>
						    <div class="col-sm-8">
							    <select id="office" name="office" class="office form-control" >
                                    <option value="">--请选择办公室--</option>
                                    <option value="登记处">登记处</option>
                                    <option value="放疗设备状态监测室">放疗设备状态监测室</option>
                                    <option value="加速器治疗室">加速器治疗室</option>
                                    <option value="模具摆放室">模具摆放室</option>
                                    <option value="模拟定位室">模拟定位室</option>
                                    <option value="物理室">物理室</option>
                                    <option value="医生工作室">医生工作室</option>
                                    <option value="制模室">制模室</option>
                                </select>
							</div>
                        </div>

                        <div class="regedit-input form-group">
                            <label for="contact" class="regedit-label col-sm-4 control-label">手机号码：</label>
						    <div class="col-sm-8">
							    <input id="contact" type="text" class="form-control phone" size="30" name="phoneNumber" placeholder="请输入手机号码" />
							</div>
						</div>

                        <div class="form-group">
                            <input type="submit" value="注册" class="regedit-button col-sm-4 btn btn-success btn-lg" />
                            <input type="reset" value="重置" class="regedit-button col-sm-4 btn btn-success btn-lg" />
                        </div>
                    </div>
                    <label id="error" style="margin-left:54px;"></label>
                </div>
			</div>
		</div>
	</form>
</body>
</html>
