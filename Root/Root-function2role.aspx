<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Root-function2role.aspx.cs" Inherits="Root_Root_function2role" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <!-- Bootstrap Core CSS -->
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

    <!-- MetisMenu CSS -->
    <link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet" />

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet" />

    <!-- Morris Charts CSS -->
    <link href="../vendor/morrisjs/morris.css" rel="stylesheet" />
    
    <link href="../CSS/Root-information.css" rel="stylesheet" />
    <!-- Custom Fonts -->
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />

    <link href="../CSS/Root-userInformation.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/user2role.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="frm" runat="server">
        <asp:ObjectDataSource ID="f2rObjectDataSource" runat="server" SelectMethod="Select" TypeName="roleManagement"></asp:ObjectDataSource>
        <asp:ScriptManager ID="f2rScriptManager" runat="server"></asp:ScriptManager>
        <div class="col-lg-12">
            <h1 class="page-header">功能绑定</h1>
            <input type="button" value="刷新" id="refresh" />
        </div>
        <div class="col-lg-12">
            <asp:GridView ID="f2rGridView" runat="server" AllowPaging="true" PageSize="8" CssClass="informationTable" AutoGenerateColumns="False" BackColor="White" BorderColor="#CCCCCC" BorderStyle="None" BorderWidth="1px" CellPadding="3" DataSourceID="f2rObjectDataSource">
                <PagerSettings Mode="NextPreviousFirstLast" NextPageText="下一页" PreviousPageText="上一页" FirstPageText="首页" LastPageText="末页" />
                <Columns>
                    <asp:BoundField DataField="ID" HeaderText="角色编号" />
                    <asp:BoundField DataField="Description" HeaderText="角色名称" />
                    <asp:TemplateField HeaderText="绑定功能">
                        <EditItemTemplate>
                            <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                        </EditItemTemplate>
                        <ItemTemplate>
                            <asp:Label ID="Label1" runat="server" Text='<%# GetFunction(Eval("ID")) %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="更改绑定" ShowHeader="False">
                        <ItemTemplate>
                             <a href="#">选择</a>
                             <input type="hidden" value='<%# Eval("ID") %>' />
                            <input type="hidden" value='<%# Eval("Description") %>' />
                             <input type="hidden" value='<%# f2rGridView.PageIndex %>' />
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
                <FooterStyle BackColor="White" ForeColor="#000066" />
                <HeaderStyle BackColor="#006699" Font-Bold="True" ForeColor="White" />
                <PagerStyle BackColor="White" ForeColor="#000066" HorizontalAlign="Left" />
                <RowStyle ForeColor="#000066" CssClass="informationRow" />
                <SelectedRowStyle BackColor="#669999" Font-Bold="True" ForeColor="White" />
                <SortedAscendingCellStyle BackColor="#F1F1F1" />
                <SortedAscendingHeaderStyle BackColor="#007DBB" />
                <SortedDescendingCellStyle BackColor="#CAC9C9" />
                <SortedDescendingHeaderStyle BackColor="#00547E" />
            </asp:GridView>
        </div>
    </form>
        <div class="col-lg-12 changebindArea">
        <form id="bindFrm" method="post" action="Root-function2role.aspx">
            <input type="hidden" name="ispostback" value="true" />
            <div class="col-lg-3"></div>
            <div class="col-lg-6">
                <div id="changeBind" class="panel panel-default tohidden">
                    <div class="panel-heading">
                        绑定功能
                    </div>
                    <div class="panel-body">
                        <h4 id="getSelectRole"></h4>
                        <input type="hidden" id="RoleID" name="RoleID" value="" />
                        <input type="hidden" id="pageIndex" name="pageIndex" value="" />
                        <div class="col-sm-2">&nbsp;</div>
                        <div class="col-sm-4">
                            <ul id="function1">

                            </ul>
                        </div>
                        <div class="col-sm-4">
                            <ul id="function2">

                            </ul>
                        </div>
                        <div class="col-sm-3">&nbsp;</div>
                        <input type="hidden" value="" id="updateFunctions" name="updateFunctions" />
                        <div class="col-sm-12">
                            <input type="submit" value="提交" class="regedit-button col-sm-4 btn btn-success btn-sm" />
                            <input type="reset" value="清空功能" class="regedit-button col-sm-4 btn btn-success btn-sm" />    
                            <input type="button" id="chooseAll" value="全选功能" class="regedit-button col-sm-4 btn btn-success btn-sm" />    
                        </div>
                    </div>
                    <!-- /.panel-body -->
                </div>
            </div>
        </form>
    </div>
    <script src="../Scripts/function2roleJS.js" type="text/javascript"></script>
</body>
</html>
