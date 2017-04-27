<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Root-role.aspx.cs" Inherits="Root_Root_role" %>

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
    
    <!-- Custom Fonts -->
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />

    <link href="../CSS/Root-userInformation.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/equipment.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="col-lg-12">
        <h1 class="page-header">角色管理</h1>
        <input type="button" value="刷新" id="refresh" />
    </div>
    <form id="frm" runat="server">
    <div class="col-lg-12">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
            <asp:ObjectDataSource ID="roleObjectDataSource" runat="server" InsertMethod="Delete" SelectMethod="Select" TypeName="roleManagement" UpdateMethod="Update" OnDeleting="roleObjectDataSource_Deleting" OnUpdating="roleObjectDataSource_Updating" DeleteMethod="Delete">
                <DeleteParameters>
                    <asp:Parameter Name="id" Type="String" />
                </DeleteParameters>
                <InsertParameters>
                    <asp:Parameter Name="id" Type="String" />
                </InsertParameters>
                <UpdateParameters>
                    <asp:Parameter Name="id" Type="String" />
                    <asp:Parameter Name="Description" Type="String" />
                </UpdateParameters>
            </asp:ObjectDataSource>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>

            <asp:GridView ID="roleGridView" AutoGenerateColumns="False" AllowPaging="True" PageSize="8" runat="server" CssClass="informationTable" BackColor="White" BorderColor="#CCCCCC" BorderStyle="None" BorderWidth="1px" CellPadding="3" DataSourceID="roleObjectDataSource">
                <PagerSettings Mode="NextPreviousFirstLast" NextPageText="下一页" PreviousPageText="上一页" LastPageText="末页" FirstPageText="首页" />
                <Columns>
                    <asp:TemplateField HeaderText="角色编号">
                        <ItemTemplate>
                            <asp:Label ID="Label1" runat="server" Text='<%# Bind("ID") %>'></asp:Label>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:Label ID="Label2" runat="server" Text='<%# Eval("ID") %>'></asp:Label>
                            </label>
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="Description" HeaderText="角色名" />
                    <asp:TemplateField HeaderText="删除角色" ShowHeader="False">
                        <ItemTemplate>
                            <asp:LinkButton ID="deleteLinkButton" runat="server" CausesValidation="False" CommandName="Delete" OnClick="LinkButton1_Click" Text="删除"></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="编辑角色" ShowHeader="False">
                        <EditItemTemplate>
                            <asp:LinkButton ID="updateLinkButton" runat="server" CausesValidation="True" CommandName="Update" Text="更新"></asp:LinkButton>
                            &nbsp;<asp:LinkButton ID="canelLinkButton" runat="server" CausesValidation="False" CommandName="Cancel" Text="取消"></asp:LinkButton>
                        </EditItemTemplate>
                        <ItemTemplate>
                            <asp:LinkButton ID="EditLinkButton" runat="server" CausesValidation="False" CommandName="Edit" Text="编辑"></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
                <FooterStyle BackColor="White" ForeColor="#000066" />
                <HeaderStyle BackColor="#006699" Font-Bold="True" ForeColor="#CCCCFF" />
                <PagerStyle BackColor="White" ForeColor="#000066" HorizontalAlign="Left" />
                <RowStyle ForeColor="#000066" CssClass="informationRow" />
                <SelectedRowStyle BackColor="#669999" Font-Bold="True" ForeColor="White" />
                <SortedAscendingCellStyle BackColor="#F1F1F1" />
                <SortedAscendingHeaderStyle BackColor="#007DBB" />
                <SortedDescendingCellStyle BackColor="#CAC9C9" />
                <SortedDescendingHeaderStyle BackColor="#00547E" />
            </asp:GridView>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
    </form>
    <input id="showAdd" type="button" value="新增角色" class="newUser" />
    <div class="col-lg-12" id="middleArea">
    </div>
            <div class="col-lg-7" id="topArea">
                <div class="table-responsive">
                    <form id="addRoleFrm" method="post" action="Root-role.aspx">
                        <input type="hidden" name="ispostback" value="true" />
                        <label id="error" class="error"></label>
                        <table class="table table-bordered table-striped tableWidth">
                            <tbody>
                                <tr>
                                    <th class="noborder"><label for="roleName" class="height">角色Name</label></th>
                                    <td>
                                        <input id="roleName" name="roleName" type="text" class="form-control controlHeight IsEmpty" placeholder="请输入角色的Name，由字母组成" />
                                    </td>                                           
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="roleDescription" class="height">角色名称</label></th>
                                    <td>
                                        <input id="roleDescription" name="roleDescription" type="text" class="form-control controlHeight IsEmpty" placeholder="请输入角色名称" />
                                    </td>
                                </tr>
                                <tr>
                                    <th class="noborder"><label for="function2role" class="height">绑定功能</label></th>
                                    <td>
                                        <ul class="nav in">
                                            <li>
                                                <a id="enableSee" href="#"><i class="fa"></i> 功能选择<span id="enableSeeSpan" class="fa fa-angle-double-left" style="margin-left:6px;"></span></a>
                                                <ul id="hidePart" class="nav roles hidePart checkFunction">
                                                    <li>
                                                        <label><input id="allFunction" type="checkbox" />全部功能</label>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <input id="selectedFunction" type="hidden" value="" name="selectedFunction" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <input type="submit" value="提交" class="regedit-button col-sm-4 btn btn-success btn-lg buttonMar" />
                                        <input id="cannel" type="button" value="取消" class="regedit-button col-sm-4 btn btn-success btn-lg" />
                                    </td>
                                </tr>     
                            </tbody>
                       </table>
                    </form>
                </div>
            </div>
    <script src="../Scripts/functionJS.js" type="text/javascript"></script>
    <script src="../Scripts/chooseSee.js" type="text/javascript"></script>
</body>
</html>
