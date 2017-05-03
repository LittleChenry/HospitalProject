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


</head>
<body>
    <div id="page-wrapper" style="border:0px;margin:0px; min-height: 923px;background:#f8f8f8;">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header" id="itemName">预约项目</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-4 toCenter">
                    <select id="equipmentName" class="form-control">

                    </select>
                </div>
                <div class="col-md-4 toCenter">
                    <select id="AppiontDate" class="form-control">
                        
                    </select>
                </div>
                <div class="col-md-4 toCenter">
                    <input type="button" id="chooseProject" value="查询该项" />
                </div>
            </div>
            <h3 class="itemTime">预约表</h3>
            <div class="col-md-12">
                <table class="table table-bordered table-center" id="apptiontTable">
                
                </table>
            </div>
        </div>
        <!-- /.row -->
    </div>
    <script src="../Scripts/Ys/AppointmentJS.js" type="text/javascript"></script>
</body>
</html>
