<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Ys-CheckTreatment.aspx.cs" Inherits="YS_Ys_CheckTreatment" %>

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
    <link href="../CSS/YSCheckTreat.css" rel="stylesheet" type="text/css" />

    <script src="../Scripts/YSCheckTreat.js" type="text/javascript"></script>
</head>
<body>
    <input id="type" type="hidden" value="YS" />
    <div style="min-height:556px;">
        <h1 class="page-header title">疗程查询</h1>
          <div class="row">
             
                <div class="col-lg-12 "> 
                   
                    <div class="panel panel-default"> 
                         
                        <div class="panel-body" id="panelbody">
                               <div class="row">
                                  <div class="form-group input-group" style="width:20%;margin-left:5%">
                                       <input type="text" id="patientID" class="form-control" value="" placeholder="请输入患者ID或者姓名"/>
                                            <span class="input-group-btn" >
                                                <button class="btn btn-default" style="height:34px" type="button" id="search"><i class="fa fa-search"></i>
                                                </button>
                                            </span>
                                        </div>
                                   </div>
                            <div class="row" id="patientShow">
   
                             </div>
                            <div class="row" style="text-align:center">
                               <button class="btn btn-primary btn-xs firstpage" id="firstPage">首页</button>
                                     <button class="btn btn-primary btn-xs firstpage" id="previousPage">上一页</button> 
                                         <button class="btn btn-primary btn-xs firstpage" id="nextPage">下一页</button>
                                     <button class="btn btn-primary btn-xs firstpage" id="lastPage">尾页</button>
                                     <input type="hidden" id="currentPage" />
                            </div>
     
                                 </div>
                             <div class="panel-body" id="panelbodytemp" style="display:none;text-align:center">
                                 
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
