<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Notice.aspx.cs" Inherits="Main_Notice" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

    <!-- MetisMenu CSS -->
    <link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet" />

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet" />

    <!-- Morris Charts CSS -->
    <link href="../vendor/morrisjs/morris.css" rel="stylesheet" />
    <!-- Custom Fonts -->
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/Notice.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div id="container_page">
        <div id="head">
            <table class="headNode">
                <tbody>
                    <tr>
                        <td class="image">&nbsp;</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
            
        <div id="container_content">
                <div id="title">
                    <h1>
                         <asp:Label ID="Label3" runat="server" Text=""></asp:Label>
                    </h1>
                </div>
            <hr />
            <div class="panel panel-default">
                <div class="panel-body">
                    <div id="describe">
                <span id="describe-content"><asp:Label ID="Label2" runat="server" Text=""></asp:Label></span>
                    </div> 
           <asp:Label ID="Label1" runat="server" Text=""></asp:Label>
                    </div>
                </div>
             </div>
        </div>
      
</body>
</html>
