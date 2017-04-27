<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Root-userInformation.aspx.cs" Inherits="Root_Root_userInformation" %>

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
    <link href="../CSS/equipment.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="frm" method="post" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <asp:ObjectDataSource ID="userDataSource" runat="server" SelectMethod="Select" TypeName="userDataSource" UpdateMethod="Update" OnUpdating="userDataSource_Updating" DeleteMethod="Delete" OnDeleting="userDataSource_Deleting">
            <SelectParameters>
                <asp:FormParameter DefaultValue="allNumber" FormField="roles" Name="activate" Type="String" />
                <asp:FormParameter FormField="office" Name="office" Type="String" DefaultValue="allOffice" />
            </SelectParameters>
            <UpdateParameters>
                <asp:Parameter Name="Number" Type="String" />
                <asp:Parameter Name="name" Type="String" />
                <asp:Parameter Name="Gender" Type="String" />
                <asp:Parameter Name="contact" Type="String" />
                <asp:Parameter Name="office" Type="String" />
                <asp:Parameter Name="Password" Type="String" />
            </UpdateParameters>
            <DeleteParameters>
                <asp:Parameter Name="Number" Type="String" />
            </DeleteParameters>
        </asp:ObjectDataSource>
        <div>
            <div class="col-lg-12">
        		<h1 class="page-header">用户信息</h1>
                <input type="button" value="刷新" id="refresh" />
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
            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                <ContentTemplate>
            <div class="col-lg-12">
                <asp:GridView ID="User" runat="server" CssClass="informationTable" AutoGenerateColumns="False" AllowPaging="True" PageSize="8" BackColor="White" BorderColor="#CCCCCC" BorderWidth="1px" CellPadding="3" DataSourceID="userDataSource" BorderStyle="None">
                    <PagerSettings Mode="NextPreviousFirstLast" NextPageText="下一页" PreviousPageText="上一页" FirstPageText="首页" LastPageText="末页" />
                    <Columns>
                        <asp:TemplateField HeaderText="用户账号">
                            <EditItemTemplate>
                                <input name="Number" type="text" readonly="true" value="<%# Eval("Number") %>" />
                            </EditItemTemplate>
                            <ItemTemplate>
                                <asp:Label ID="userNumber" runat="server" Text='<%# Bind("Number") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Name" HeaderText="姓名" />
                        <asp:TemplateField HeaderText="性别">
                            <ItemTemplate>
                                <asp:Label ID="sexLabel" runat="server" Text='<%# GetGender(Eval("Gender")) %>'></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:RadioButtonList ID="sexRadio" runat="server" RepeatColumns="2" CssClass="center" SelectedValue='<%# Bind("Gender") %>' >
                                    <asp:ListItem Value="M" Text="男"></asp:ListItem>
                                    <asp:ListItem Value="F" Text="女"></asp:ListItem>
                                </asp:RadioButtonList>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="联系方式">
                            <EditItemTemplate>
                                <input type="text" value="<%# Eval("Contact") %>" id="contact" name="contact" />
                            </EditItemTemplate>
                            <ItemTemplate>
                                <asp:Label ID="Label1" runat="server" Text='<%# Bind("Contact") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="办公室">
                            <EditItemTemplate>
                                <asp:DropDownList ID="office" runat="server" SelectedValue='<%# Bind("Office") %>' >
                                    <asp:ListItem value="">--请选择办公室--</asp:ListItem>
                                    <asp:ListItem value="登记处">登记处</asp:ListItem>
                                    <asp:ListItem value="放疗设备状态监测室">放疗设备状态监测室</asp:ListItem>
                                    <asp:ListItem value="加速器治疗室">加速器治疗室</asp:ListItem>
                                    <asp:ListItem value="模具摆放室">模具摆放室</asp:ListItem>
                                    <asp:ListItem value="模拟定位室">模拟定位室</asp:ListItem>
                                    <asp:ListItem value="物理室">物理室</asp:ListItem>
                                    <asp:ListItem value="医生工作室">医生工作室</asp:ListItem>
                                    <asp:ListItem value="制模室">制模室</asp:ListItem>
                                </asp:DropDownList>
                            </EditItemTemplate>
                            <ItemTemplate>
                                <asp:Label ID="OfficeLabel" runat="server" Text='<%# Bind("Office") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Password" HeaderText="用户密码" />
                        <asp:TemplateField HeaderText="激活状态">
                            <ItemTemplate>
                                <asp:Label ID="ActivateLabel" runat="server" Text='<%# GetActive(Eval("Activate")) %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="编辑" ShowHeader="False">
                            <EditItemTemplate>
                                <asp:LinkButton ID="UpdateLinkButton" runat="server" CausesValidation="True" CommandName="Update" Text="更新"></asp:LinkButton>
                                &nbsp;<asp:LinkButton ID="CannelLinkButton" runat="server" CausesValidation="False" CommandName="Cancel" Text="取消"></asp:LinkButton>
                            </EditItemTemplate>
                            <ItemTemplate>
                                <asp:LinkButton ID="EditLinkButton" runat="server" CausesValidation="False" CommandName="Edit" Text="编辑"></asp:LinkButton>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="激活用户">
                            <ItemTemplate>
                                <asp:LinkButton ID="Activate" runat="server" Text='<%# GetButtonText(Eval("Activate")) %>' OnClick="Activate_Click"></asp:LinkButton>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="删除用户" ShowHeader="False" HeaderStyle-Width="5%">
                            <ItemTemplate>
                                <asp:LinkButton ID="DeleteLinkButton" runat="server" CausesValidation="False" CommandName="Delete" Text="删除" OnClick="DeleteLinkButton_Click"></asp:LinkButton>
                            </ItemTemplate>

<HeaderStyle Width="5%"></HeaderStyle>
                        </asp:TemplateField>
                    </Columns>
                    <FooterStyle BackColor="White" ForeColor="#000066" />
                    <HeaderStyle BackColor="#006699" Font-Bold="True" CssClass="informationTh" ForeColor="White"/>
                    <SelectedRowStyle BackColor="#669999" ForeColor="White" Font-Bold="True" />
                    <PagerStyle BackColor="White" ForeColor="#000066" HorizontalAlign="Left" />
                    <RowStyle CssClass="informationRow" ForeColor="#000066" />
                    <EditRowStyle CssClass="edit" />
                    <SortedAscendingCellStyle BackColor="#F1F1F1" />
                    <SortedAscendingHeaderStyle BackColor="#007DBB" />
                    <SortedDescendingCellStyle BackColor="#CAC9C9" />
                    <SortedDescendingHeaderStyle BackColor="#00547E" />        
                </asp:GridView>                
            </div>
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
            </form>
            <input id="showAdd" type="button" value="新增用户" class="newUser" />
            <div class="col-lg-12" id="middleArea">
            </div>

                <div class="col-lg-12 edit" id="topArea">
                    <div class="table-responsive">
                        <form id="addNewFrm" action="Root-userInformation.aspx" method="post">
                            <input type="hidden" name="ispostback" value="true" />
                            <label id="error"></label>
                                <table class="table table-bordered table-striped tableWidth">
                                    <tbody>
                                        <tr>
                                            <th class="noborder"><label for="userNumber" class="height">账号</label></th>
                                            <td>
                                                <input id="userNumber" name="userNumber" type="text" class="form-control controlHeight IsEmpty" placeholder="请输入账号" />
                                            </td>                                           
                                        </tr>
                                        <tr>
                                            <th class="noborder"><label for="userPassword" class="height">密码</label></th>
                                            <td>
                                                <input id="userPassword" name="userKey" type="password" placeholder="请输入密码" class="form-control IsEmpty controlHeight userKey" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="noborder"><label for="checkPassword" class="height">确认密码</label></th>
                                            <td>
                                                <input id="checkPassword" type="password" placeholder="请再次输入密码" class="form-control controlHeight checkPassword" />
                                            </td>                                           
                                        </tr>
                                        <tr>
                                            <th class="noborder"><label for="name" class="height">姓名</label></th>
                                            <td>
                                                <input id="name" name="userName" type="text" placeholder="请输入姓名" class="form-control IsEmpty controlHeight" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="noborder"><label class="height">性别</label></th>
                                            <td>
                                                <label for="male"><input id="male" type="radio" name="gender" checked="true" class="checkSex" value="M" />男</label>
                                                &nbsp;&nbsp;
                                                <label for="female"><input id="female" type="radio" name="gender" class="checkSex" value="F" />女</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="noborder"><label for="contact" class="height">联系方式</label></th>
                                            <td>
                                                <input id="phoneContact" name="phoneNumber" type="text" placeholder="请输入联系方式" class="form-control contact controlHeight" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="noborder"><label for="office" class="height">办公室</label></th>
                                            <td>
                                                <select id="officeSelect" name="officeSelect" class="office form-control" >
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
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="noborder"><label for="enableSee" class="height">绑定角色</label></th>
                                            <td>
                                            <div>
                                            <ul class="nav in">
                                                <li>
                                                    <a id="enableSee" href="#"><i class="fa"></i> 角色选择<span id="enableSeeSpan" class="fa fa-angle-double-left" style="margin-left:6px;"></span></a>
                                                    <ul id="hidePart" class="nav roles hidePart checkRole">
                                                        <li>
                                                            <label><input id="allRole" type="checkbox" />全部角色</label>
                                                        </li>
                                                        </ul>
                                                </li>
                                            </ul>
                                            <input id="selectedRole" type="hidden" value="" name="selectedRole" />
                                            </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="noborder"><label>激活状态</label></th>
                                            <td>
                                                <label for="activated"><input id="activated" type="radio" name="activate" value="1" class="checActivate" checked="true" />激活</label>
                                                &nbsp;&nbsp;
                                                <label for="unactivate"><input id="unactivate" type="radio" name="activate" value="0" class="checkActivate" />不激活</label>
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

    <script src="../Scripts/userInformationJS.js" type="text/javascript"></script>
    <script src="../Scripts/chooseSee.js" type="text/javascript"></script>
    <script src="../Scripts/chooseAllJS.js" type="text/javascript"></script>
</body>
</html>
