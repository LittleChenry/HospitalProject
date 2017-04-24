<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Root-equipment.aspx.cs" Inherits="Root_Root_equipment" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
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
    <form id="frm" runat="server">
        <asp:ObjectDataSource ID="equipmentObjectDataSource" runat="server" SelectMethod="Select" TypeName="equipment" OnDeleting="equipmentObjectDataSource_Deleting" DeleteMethod="Delete">
            <DeleteParameters>
                <asp:Parameter Name="id" Type="String" />
            </DeleteParameters>
            <SelectParameters>
                <asp:FormParameter DefaultValue="allEquipment" FormField="equipState" Name="state" Type="String" />
                <asp:FormParameter DefaultValue="allItem" FormField="TreatmentItem" Name="item" Type="String" />
            </SelectParameters>
        </asp:ObjectDataSource>
        <asp:ScriptManager ID="ScriptManager" runat="server"></asp:ScriptManager>
        <div class="col-lg-12">
            <h1 class="page-header">设备管理</h1>
        </div>
        <div class="col-lg-12 search">
            <div class="col-lg-4">
                <select id="equipState" name="equipState">
                        <option value="allEquipment">全部设备</option>
                        <option value="1">可用设备</option>
                        <option value="2">检查中设备</option>
                        <option value="3">维修中设备</option>
                    </select>
            </div>
            <div class="col-lg-4">
                <select id="TreatmentItem" name="TreatmentItem">                
                </select>
            </div>
            <div class="col-lg-4">
                <input type="submit" value="查询" id="searchButton" class="col-sm-2" />
            </div>
        </div>
        <div class="col-lg-12" id="gridContent">
            <asp:GridView ID="equipmentGridView" runat="server" AllowPaging="True" PageSize="8" AutoGenerateColumns="False" CssClass="informationTable" BackColor="White" BorderColor="#CCCCCC" BorderStyle="None" BorderWidth="1px" CellPadding="3" DataSourceID="equipmentObjectDataSource">
                <PagerSettings Mode="NextPreviousFirstLast" FirstPageText="首页" LastPageText="末页" NextPageText="下一页" PreviousPageText="上一页" />
                <Columns>
                    <asp:BoundField DataField="Name" HeaderText="设备名" />
                    <asp:TemplateField HeaderText="设备状态">
                        <EditItemTemplate>
                            <asp:TextBox ID="TextBox1" runat="server" Text='<%# Bind("State") %>'></asp:TextBox>
                        </EditItemTemplate>
                        <ItemTemplate>
                            <asp:Label ID="Label1" runat="server" Text='<%# GetState(Eval("State")) %>'></asp:Label>
                            <asp:HiddenField Value='<%# Eval("ID") %>' ID="equipmentID" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="Timelength" HeaderText="一次治疗时间" />
                    <asp:TemplateField HeaderText="上午起始时间">
                        <EditItemTemplate>
                            <asp:TextBox ID="TextBox2" runat="server" Text='<%# Bind("BeginTimeAM") %>'></asp:TextBox>
                        </EditItemTemplate>
                        <ItemTemplate>
                            <asp:Label ID="Label2" runat="server" Text='<%# GetTime(Eval("BeginTimeAM"))%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="上午结束时间">
                        <EditItemTemplate>
                            <asp:TextBox ID="TextBox3" runat="server" Text='<%# Bind("EndTimeAM") %>'></asp:TextBox>
                        </EditItemTemplate>
                        <ItemTemplate>
                            <asp:Label ID="Label3" runat="server" Text='<%# GetTime(Eval("EndTimeAM"))%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="下午起始时间">
                        <EditItemTemplate>
                            <asp:TextBox ID="TextBox4" runat="server" Text='<%# Bind("BegTimePM") %>'></asp:TextBox>
                        </EditItemTemplate>
                        <ItemTemplate>
                            <asp:Label ID="Label4" runat="server" Text='<%# GetTime(Eval("BegTimePM"))%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="下午结束时间">
                        <EditItemTemplate>
                            <asp:TextBox ID="TextBox5" runat="server" Text='<%# Bind("EndTimeTPM") %>'></asp:TextBox>
                        </EditItemTemplate>
                        <ItemTemplate>
                            <asp:Label ID="Label5" runat="server" Text='<%# GetTime(Eval("EndTimeTPM"))%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="TreatmentItem" HeaderText="隶属治疗项目" />
                    <asp:TemplateField HeaderText="移除设备" ShowHeader="False">
                        <ItemTemplate>
                            <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="False" CommandName="Delete" OnClick="LinkButton1_Click" Text="删除"></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="编辑设备" ShowHeader="False">
                        <ItemTemplate>
                            <a href="#" class="selectedUpdate">选择</a>
                            <input type="hidden" value='<%# Eval("ID") %>' />
                            <input type="hidden" value='<%# equipmentGridView.PageIndex %>' />
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
                <FooterStyle BackColor="White" ForeColor="#000066" />
                <HeaderStyle BackColor="#006699" Font-Bold="True" ForeColor="White" CssClass="informationTh" />
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
    <div class="col-lg-3 toDivRight">
        <input type="button" value="新增设备" id="insert" />
    </div>
    <div class="col-lg-12" id="middleArea">
    </div>
    <div class="col-lg-3" id="topArea">
        <label id="error"></label>
        <form id="changefrm" method="post" action="Root-equipment.aspx">
            <input type="hidden" id="equipID" name="equipID" />
            <input type="hidden" id="currentPage" name="currentPage" />
            <input type="hidden" name="ispostback" value="true" />
            <input type="hidden" name="formType" value="" id="formType" />
            <table class="table table-bordered table-striped tableWidth" style="width:100%">
                <tbody>
                    <tr>
                        <th class="noborder"><label for="equipmentName" class="height">设备名</label></th>
                            <td>
                                <input id="equipmentName" name="equipmentName" type="text" class="form-control controlHeight IsEmpty" placeholder="请输入设备名" />
                            </td>                                           
                    </tr>
                    <tr>
                        <th class="noborder"><label for="equipmentState" class="height">设备状态</label></th>
                            <td>
                                <select id="equipmentState" name="equipmentState" class="form-control">
                                    <option value="1">可用</option>
                                    <option value="2">检查中</option>
                                    <option value="3">维修中</option>
                                </select>
                            </td>
                    </tr>
                    <tr>
                        <th class="noborder"><label for="onceTime" class="height">一次治疗时间</label></th>
                        <td>
                            <input type="text" id="onceTime" name="onceTime" class="form-control controlHeight OnceTreatment" placeholder="请输入一次治疗时间(单位分钟)" />
                        </td>
                    </tr>
                    <tr>
                        <th class="noborder"><label for="AMBeg" class="height">上午开始时间</label></th>
                        <td>
                            <input type="text" id="AMbeg" name="AMbeg" class="form-control controlHeight Time" placeholder="请输入上午开始使用设备时间" />
                        </td>
                    </tr>
                    <tr>
                        <th class="noborder"><label for="AMEnd" class="height">上午结束时间</label></th>
                        <td>
                            <input type="text" id="AMEnd" name="AMEnd" class="form-control controlHeight Time" placeholder="请输入上午结束使用设备时间" />
                        </td>
                    </tr>
                    <tr>
                        <th class="noborder"><label for="PMBeg" class="height">下午开始时间</label></th>
                        <td>
                            <input type="text" id="PMBeg" name="PMBeg" class="form-control controlHeight Time" placeholder="请输入下午开始使用设备时间" />
                        </td>
                    </tr>
                    <tr>
                        <th class="noborder"><label for="PMEnd" class="height">下午结束时间</label></th>
                        <td>
                            <input type="text" id="PMEnd" name="PMEnd" class="form-control controlHeight Time" placeholder="请输入下午结束使用设备时间" />
                        </td>
                    </tr>
                    <tr>
                        <th class="noborder"><label for="changeTreatmentItem" class="height">隶属项目</label></th>
                        <td>
                            <select id="changeTreatmentItem" name="changeTreatmentItem" class="form-control treatItem">                
                            </select>
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
    <script src="../Scripts/equipmentJS.js"></script>
</body>
</html>

