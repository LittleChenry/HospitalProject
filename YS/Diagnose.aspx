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
    <link href="../CSS/Diagnose.css" rel="stylesheet" type="text/css" />
     <script src="../vendor/jquery/jquery1.min.js"></script>
    <script src="../vendor/jquery/jquery.min.js"></script>
    <script src="../Scripts/Diagnose.js" type="text/javascript"></script>
</head>
<body>
    <input id="type" type="hidden" value="YS" />
    <div style="min-height:556px;">
        <h1 class="page-header title">疗程诊断</h1>
          <div class="row">
             
                <div class="col-xs-12 "> 
                   
                    <div class="panel panel-default"> 
                         
                        <div class="panel-body" id="panelbody">
                               <div class="row">
                                  <div class="form-group input-group" style="width:20%;margin-left:40%">
                                       <input type="text" id="patientName" oninput="sendsearch(event)" class="form-control" value="" placeholder="请输入患者姓名"/>
                                            <span class="input-group-btn" >
                                                <button class="btn btn-default" style="height:34px" type="button" id="search"><i class="fa fa-search"></i>
                                                </button>
                                            </span>
                                        </div>
                                   </div>
                            <div class="row"  id="patientShow">
                                  <%-- 此处放置入口病患信息代码--%>
                                <table  style="width:60%;margin-left:20%"class="table table-striped table-bordered table-hover" >
                        <thead>
                            <tr style="background-color:#2b2b87;color:white">
                                <th style="width:25%">疗程流水ID</th>
                                <th style="width:25%">所属病患姓名</th>
                                <th style="width:25%">所属病患ID</th>
                                <th style="width:25%">诊断入口</th>
                            </tr>
                        </thead>
                        <tbody id="patientTable"></tbody>
                    </table>
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
                                 <div class="row">
                                  <div class="step-body" id="myStep">
                                 
	                                <div class="step-header" style="width:80%">
		                                <ul>
			                                <li><p>确认患者基本信息</p></li>
			                                <li><p>进行病情记录</p></li>
		                                </ul>
	                                </div>
                                    </div>
                                  
                                     </div>
                                 <div class="row" style="height:500px">
                                     <div id="confirm" style="position:relative;top:50px">
                                         
                                     </div>
                                       <div id="choosetreat" style="position:relative;display:none;top:50px">
                                     </div>
                                     <div id="complete" style="position:relative;display:none;top:10px;text-align:center">
                                         
                                     
                                         <table class="table table-bordered table-striped tableWidth" style="margin-left:33%;width:35%">
                                             <tbody>
                                               <tr>
                                                    <th ><label for="treatID" class="height">疗程号</label></th>
                                                   <td>
                                                       <input id="treatID" name="treatID" type="text" readonly="true" class="form-control controlHeight IsEmpty"  />
                                                    </td> 
                                               </tr>
                                               <tr>                                           
                                                 <th><label for="subcenter" class="height">分中心负责人</label></th>
                                                 <td>
                                                     <select id="subcenter" name="subcenter" class="form-control ">                
                                                    </select>
                                                </td>
                                        </tr>
                                       <tr>
                                         <th><label for="princal" class="height">主中心负责人</label></th>
                                          <td>
                                           <select id="princal" name="subcenter" class="form-control">                
                                           </select>
                                         </td>
                                     </tr>
                                  <tr>
                                  <th><label for="part" class="height">部位</label></th>
                                  <td>
                                    <select id="part" name="part" class="form-control">                
                                    </select>
                                 </td>
                                </tr>
                              <tr>
                                   <th><label for="diagresult" class="height">诊断结果</label></th>
                              <td>
                                    <select id="diagresult" name="diagresult" class="form-control">                
                                    </select>
                              </td>
                            </tr>
                             <tr>
                                  <th><label for="diaguser" class="height">诊断人</label></th>
                             <td>
                            <input type="text" id="diaguser" name="diaguser" readonly="true" class="form-control controlHeight" />
                              <input type="hidden" id="diaguserid" name="diaguserid" />
                          </td>
                             </tr>
                        <tr>
                             <th ><label for="time" class="height">诊断时间</label></th>
                        <td>
                           <input type="text" id="time" name="time" readonly="true" class="form-control controlHeight" />
                        </td>
                       </tr>
                         <tr>
                             <th ><label for="remark" class="height">备注</label></th>
                        <td>
                           <input type="text" id="remark" name="remark"  value="" class="form-control controlHeight" placeholder="可不填"/>
                        </td>
                       </tr>
                        <tr style="text-align:center">
                         <td colspan="2">
                            <input type="button" id="postdiag" value="完成诊断" class="btn btn-primary btn-xs" />
                        </td>
                     
                     </tr>     
                   </tbody>
                      </table>
                      
                                     </div>
                                 </div>


                                  <div class="row" id="nextpre">
                                      <input type="hidden" id="curstep" value="1" />
                                      <button id="back" class="btn btn-primary btn-xs">回退界面</button>
                                      <button id="preBtn" class="btn btn-primary btn-xs">上一步</button>
                                    <button id="nextBtn" class="btn btn-primary btn-xs">下一步</button>
                                  </div>
                                 <div class="row" id="lastpage" style="display:none">
                                      <button id="back1" class="btn btn-primary btn-xs">回退界面</button>
                                      <button id="preBtn1" class="btn btn-primary btn-xs" >上一步</button>
                                  </div>
                                 </div>
       
                           </div>
                            </div>
                   


                        </div>
                    </div>

 
    <!-- Bootstrap Core JavaScript -->
    <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="../vendor/metisMenu/metisMenu.min.js"></script>

</body>
</html>
