<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Root-InfoManage.aspx.cs" Inherits="Root_Root_InfoManage" %>

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
     <!-- DataTables CSS -->
    <link href="../vendor/datatables-plugins/dataTables.bootstrap.css" rel="stylesheet"/>

    <!-- DataTables Responsive CSS -->
    <link href="../vendor/datatables-responsive/dataTables.responsive.css" rel="stylesheet"/>
    <!-- Morris Charts CSS -->
    <link href="../vendor/morrisjs/morris.css" rel="stylesheet" />
    <!-- Custom Fonts -->
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/infomanage.css" rel="stylesheet" type="text/css" />

    <script src="../Scripts/RootInfoManageJS.js" type="text/javascript"></script>
</head>
<body>
    <input id="type" type="hidden" value="Root" />
    <div style="min-height:556px;">
        <h1 class="page-header title">信息管理</h1>
          <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            消息管理窗口
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <table class="table table-striped table-bordered table-hover" >
                                <thead>
                                    <tr>
                                        <th style="width:40%">消息标题</th>
                                        <th style="width:20%">消息发布时间</th>
                                        <th style="width:10%">删除处理</th>
                                        <th style="width:10%">置顶处理</th>
                                        <th style="width:10%">置新处理</th>
                                        <th style="width:10%">置热处理</th>
                                    </tr>
                                </thead>
                                <tbody id="infomanagetable">
                                    
                                    </tbody>
                                </table>
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
              </div>
    </div>
    <script src="../vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="../vendor/metisMenu/metisMenu.min.js"></script>

</body>
</html>
