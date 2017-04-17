<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Root-user2role.aspx.cs" Inherits="Root_Root_user2role" %>

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
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <asp:ObjectDataSource ID="user2roleObjectDataSource" runat="server" SelectMethod="Select" TypeName="userDataSource">
            <SelectParameters>
                <asp:FormParameter DefaultValue="allNumber" FormField="roles" Name="activate" Type="String" />
                <asp:FormParameter FormField="office" Name="office" Type="String" DefaultValue="allOffice" />
            </SelectParameters>
        </asp:ObjectDataSource>
        <div>
            <div class="col-lg-12">
                <h1 class="page-header">角色绑定</h1>
            </div>
            <div class="col-lg-12 search">
                <div class="col-lg-4">
                    <select id="role" name="roles">
                        <option value="allNumber">全部账号</option>
                        <option value="1">已激活账号</option>
                        <option value="0">未激活账号</option>
                    </select>
                </div>
                <div class="col-lg-4">
                    <select id="office" name="office">
                        <option value="allOffice">全部办公室</option>
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
                <div class="col-lg-4">
                    <input type="submit" value="查询" />
                </div>
            </div>
            <div class="col-lg-12">

                <asp:GridView ID="user2roleGridView" runat="server" CssClass="informationTable" AllowPaging="True" PageSize="8" DataSourceID="user2roleObjectDataSource" AutoGenerateColumns="False" BackColor="LightGoldenrodYellow" BorderColor="Tan" BorderWidth="1px" CellPadding="2" ForeColor="Black" GridLines="None" >
                    <AlternatingRowStyle BackColor="PaleGoldenrod" />
                    <PagerSettings Mode="NextPreviousFirstLast" NextPageText="下一页" PreviousPageText="上一页" FirstPageText="首页" LastPageText="末页" />
                    <Columns>
                        <asp:BoundField DataField="Number" HeaderText="账号" />
                        <asp:BoundField DataField="Name" HeaderText="姓名" />
                        <asp:BoundField DataField="Office" HeaderText="办公室" />
                        <asp:TemplateField HeaderText="激活状态">
                            <EditItemTemplate>
                                <asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
                            </EditItemTemplate>
                            <ItemTemplate>
                                <label><%# GetActivate(Eval("Activate")) %></label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="绑定角色">
                            <ItemTemplate>
                                <asp:Label ID="Label1" runat="server" Text='<%# GetRoles(Eval("ID")) %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="更改角色" ShowHeader="False">
                            <ItemTemplate>
                                <a href="#">选择</a>
                                <input type="hidden" value='<%# Eval("Number") %>' />
                                <input type="hidden" value='<%# user2roleGridView.PageIndex %>' />
                            </ItemTemplate>
                            <ItemStyle ForeColor="#6699FF" />
                        </asp:TemplateField>
                    </Columns>

                    <FooterStyle BackColor="Tan" />
                    <HeaderStyle BackColor="Tan" Font-Bold="True" CssClass="informationTh"/>
                    <RowStyle CssClass="informationRow" />
                    <PagerStyle BackColor="PaleGoldenrod" ForeColor="DarkSlateBlue" HorizontalAlign="Center" />
                    <SelectedRowStyle BackColor="DarkSlateBlue" ForeColor="GhostWhite" />
                    <SortedAscendingCellStyle BackColor="#FAFAE7" />
                    <SortedAscendingHeaderStyle BackColor="#DAC09E" />
                    <SortedDescendingCellStyle BackColor="#E1DB9C" />
                    <SortedDescendingHeaderStyle BackColor="#C2A47B" />
                </asp:GridView>

            </div>
        </div>
    </form>

    <div class="col-lg-12 changebindArea">
        <form id="bindFrm" method="post" action="Root-user2role.aspx">
            <input type="hidden" name="ispostback" value="true" />
            <div class="col-lg-3"></div>
            <div class="col-lg-6">
                <div id="changeBind" class="panel panel-default tohidden">
                    <div class="panel-heading">
                        绑定角色
                    </div>
                    <div class="panel-body">
                        <h4 id="getNumber"></h4>
                        <input type="hidden" id="userNumber" name="userNumber" value="" />
                        <input type="hidden" id="pageIndex" name="pageIndex" value="" />
                        <div class="col-sm-3">&nbsp;</div>
                        <div class="col-sm-3">
                            <ul id="roles1">

                            </ul>
                        </div>
                        <div class="col-sm-3">
                            <ul id="roles2">

                            </ul>
                        </div>
                        <div class="col-sm-3">&nbsp;</div>
                        <input type="hidden" value="" id="updateRoles" name="updateRoles" />
                        <div class="col-sm-12">
                            <input type="submit" value="提交" class="regedit-button col-sm-4 btn btn-success btn-sm" />
                            <input type="reset" value="清空角色" class="regedit-button col-sm-4 btn btn-success btn-sm" />    
                            <input type="button" id="chooseAll" value="全选角色" class="regedit-button col-sm-4 btn btn-success btn-sm" />    
                        </div>
                    </div>
                    <!-- /.panel-body -->
                </div>
            </div>
        </form>
    </div>
<script src="../Scripts/user2roleJS.js" type="text/javascript"></script>
</body>
</html>
