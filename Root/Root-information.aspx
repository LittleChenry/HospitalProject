<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Root-information.aspx.cs"  Inherits="Root_Root_information" validateRequest="false"  %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>

    <title>消息发布</title>
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
    
    <link rel="stylesheet" href="../editor/themes/default/default.css" />

	<script charset="utf-8" src="../editor/examples/jquery.js"></script>
	<script charset="utf-8" src="../editor/kindeditor-min.js"></script>
	<script charset="utf-8" src="../editor/lang/zh_CN.js"></script>
    <!-- Custom Fonts -->
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <script>
        $(function () {
            var editor = KindEditor.create('textarea[name="mainText"]',{
                uploadJson : '../editor/asp.net/upload_json.ashx',
                fileManagerJson : '../editor/asp.net/file_manager_json.ashx',
                allowFileManager : true
            })
        });
	</script>
</head>
<body>
    <div id="page-wrapper" style="border:0px;margin:0px; min-height: 723px;background:#f8f8f8;">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">消息发布</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <div class="row">
            <div class="col-md-8 col-md-offset-1">
                <form id="Form1" action="Root-information.aspx" method="post" runat="server">
                    <div class="form-group" style="text-align:center;">
                        <p>标题</p>
                        <input id="title" type="text" class="form-control isEmpty title text" name="title"/>
                        <p id="titleError" style="margin-top:3px;margin-bottom:0px;"></p>
                    </div>
                    <div class="form-group" style="text-align:center;">
                        <p>正文</p>
                        <textarea id="mainText" cols="40" class="form-control isEmpty text" name="mainText" rows="25"></textarea>
                    </div>
                    <div class="panel panel-default" style="margin:auto;width:80%;">
                        <div class="panel-heading">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" style="text-decoration:none;">
                                <h4 class="panel-title" style="text-align:center;">选项</h4>
                            </a>
                        </div>
                        <div id="collapseOne" class="info-option panel-collapse collapse">
                            <div class="form-group">
                                <span class="option-title">是否置顶</span>
                                <ul class="nav options">
                                    <li>
                                        <label><input id="important" type="radio" value="1" name="important" />置顶</label>
                                    </li>
                                    <li>
                                        <label><input id="unimportant" type="radio" value="0" name="important" checked="checked" />不置顶</label>
                                    </li>
                                </ul>
                            </div>
                            <div style="float:right">
                                <label id="error"></label>
                            </div>
                            <div class="form-group">
                                <span class="option-title">可见角色</span>
                                <ul id="all-options" class="nav options">
                                    <li>
                                        <label><input id="allRole" type="checkbox" />全部人员</label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="role" value="YS" /><span>医师</span></label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="role" value="WLS" /><span>物理师</span></label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="role" value="YJS" /><span>药剂师</span></label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="role" value="DJCRY" /><span>登记处人员</span></label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="role" value="JLS" /><span>剂量师</span></label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="role" value="ROOT" /><span>管理员</span></label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input id="selectedRole" type="hidden" value="" name="selectedRole" />
                        <input type="submit" class="btn btn-outline btn-primary btn-lg btn-block" value="发布" style="margin:auto;width:80%;" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="../vendor/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="../vendor/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/chooseAllJS.js"></script>
    <script type="text/javascript" src="../Scripts/Root-informationJS.js"></script>
</body>
</html>
