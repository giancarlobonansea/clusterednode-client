"use strict";
(function(app) {
	app.appSimulatorComponentHtml = `
	<!-- Application menu -->
<nav class="navbar navbar-inverse navbar-static-top">
	<div class="container-fluid">
		<div class="navbar-header">
			<a class="navbar-brand"><i class="fa fa-sitemap"></i>&nbsp;NLB HA Clustered Node PoC</a>
		</div>
	</div>
</nav>
<!-- Control Area -->
<div class="row">
	<div class="col-xs-12">
		<div class="panel panel-info">
			<div class="panel-heading">
				<div class="row">
					<div class="col-xs-6">
						<h4 class="panel-title"><i class="fa fa-cogs"></i>&nbsp;Control Area</h4>
					</div>
					<div class="col-xs-6 text-right">
						<small>
							Simulation method&nbsp;<span class="label label-info">{{gSM()}}</span>
							<span *ngIf="iD">
								&nbsp;&nbsp;Nominal requests&nbsp;<span class="label label-info">{{gDR(rqDu,rqCn,rqIn)}}</span>&nbsp;&nbsp;Nominal throughput&nbsp;<span class="label label-info">{{gDT(rqDu,rqCn,rqIn)}} req/s</span>
							</span>
						</small>
					</div>
				</div>
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-xs-12 col-sm-6">
						<!-- Show reference -->
						<button type="button" class="btn btn-info btn-sm" (click)="shR()" [disabled]="run">
							<i class="fa fa-leanpub"></i>
						</button>
						&nbsp;
						<!-- Live DB Events -->
						<button type="button" class="btn btn-info btn-sm" (click)="shL()" [disabled]="run">
							<i class="fa fa-database"></i>
						</button>
						&nbsp;
						<!-- Duration or Requests -->
						<div class="btn-group btn-group-sm">
							<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" [disabled]="run">
								<i class="fa fa-bolt"></i>&nbsp;<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a (click)="sD(true)">Stability (Duration/Rate)</a></li>
								<li><a (click)="sD(false)">Stress (Burst)</a></li>
							</ul>
						</div>
						&nbsp;
						<!-- Quick settings dropdown -->
						<div class="btn-group btn-group-sm">
							<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" [disabled]="run">
								<i class="fa fa-sliders"></i>&nbsp;<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a (click)="sMP(0)">Small load</a></li>
								<li><a (click)="sMP(1)">Medium load</a></li>
								<li><a (click)="sMP(2)">Large load</a></li>
								<li><a (click)="sMP(3)">Huge load</a></li>
							</ul>
						</div>
						&nbsp;
						<!-- Run Forrest... run -->
						<button type="button" class="btn btn-success btn-sm" (click)="sSi()" [disabled]="run">
							<i class="fa fa-play"></i></button>
					</div>
					<div class="col-xs-12 col-sm-6 text-right">
						<form class="form-inline">
							<div class="form-group form-group-sm">
								<!-- STRESS BY REQUESTS: Number of total requests to be fired -->
								<div class="input-group input-group-sm" *ngIf="!iD">
									<span class="input-group-addon">Requests</span>
									<input type="number" class="form-control input-sm" min="1" max="16384" id="numReq" name="rqCt" [(ngModel)]="rqCt" [disabled]="run"/>
								</div>
								<!-- STRESS BY DURATION AND DELAY: Duration in seconds to run -->
								<div class="input-group input-group-sm" *ngIf="iD">
									<span class="input-group-addon">Duration</span>
									<input type="number" class="form-control input-sm" min="5" max="600" id="durReq" name="rqDu" [(ngModel)]="rqDu" [disabled]="run"/>
									<span class="input-group-addon">s</span>
								</div>
								<!-- STRESS BY DURATION AND DELAY: Delay in miliseconds to wait between group of requests -->
								<div class="input-group input-group-sm" *ngIf="iD">
									<span class="input-group-addon">Interval</span>
									<input type="number" class="form-control input-sm" min="5" max="1000" id="intReq" name="rqIn" [(ngModel)]="rqIn" [disabled]="run"/>
									<span class="input-group-addon">ms</span>
								</div>
								<!-- ALL: Maximum number of concurrent HTTP connections to be fired -->
								<div class="input-group input-group-sm">
									<span class="input-group-addon">Connections</span>
									<input type="number" class="form-control input-sm" min="1" max="128" id="numConn" name="rqCn" [(ngModel)]="rqCn" [disabled]="run"/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Statistics -->
<div class="row" *ngIf="!run && rOK!==0 && !rlS.sRe && !leS.lE">
	<div class="col-xs-12 col-sm-4">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-wrench"></i>&nbsp;Last Run parameters</h4>
			</div>
			<table class="table table-condensed table-bordered table-responsive" *ngIf="!exiD">
				<thead>
					<tr>
						<th class="text-center" colspan="2">
							Method&nbsp;<span class="label label-primary">{{exM}}</span>
						</th>
					</tr>
					<tr>
						<th class="text-center">
							Requests
						</th>
						<th class="text-center">
							Connections
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="text-center"><span class="label label-info">{{exR | number:"1.0-0"}}</span></td>
						<td class="text-center"><span class="label label-info">{{exC | number:"1.0-0"}}</span></td>
					</tr>
				</tbody>
			</table>
			<table class="table table-condensed table-bordered table-responsive" *ngIf="exiD">
				<thead>
					<tr>
						<th class="text-center" colspan="3">
							Method&nbsp;<span class="label label-primary">{{exM}}</span>
						</th>
					</tr>
					<tr>
						<th class="text-center">
							Duration
						</th>
						<th class="text-center">
							Interval
						</th>
						<th class="text-center">
							Connections
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="text-center">
							<span class="label label-info">{{exD | number:"1.0-0"}} s</span>
						</td>
						<td class="text-center">
							<span class="label label-info">{{exI | number:"1.0-0"}} ms</span>
						</td>
						<td class="text-center"><span class="label label-info">{{exC | number:"1.0-0"}}</span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="col-xs-12 col-sm-8">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-tachometer"></i>&nbsp;Last Run execution data</h4>
			</div>
			<table class="table table-condensed table-bordered table-responsive" *ngIf="!exiD">
				<thead>
					<tr>
						<th class="text-center" rowspan="2">
							Duration
						</th>
						<th class="text-center" colspan="3">
							Requests
						</th>
					</tr>
					<tr>
						<th class="text-center">
							Executed
						</th>
						<th class="text-center">
							Cached
						</th>
						<th class="text-center">
							Distribution
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="text-center">
							<span class="label label-primary">{{dur | number:"1.0-0"}} ms</span>
						</td>
						<td class="text-center"><span class="label label-info">{{rqEx | number:"1.0-0"}}</span>
						</td>
						<td class="text-center"><span class="label label-info">{{rqCh | number:"1.0-0"}}</span>
						</td>
						<td class="text-center">
							<span class="label label-default">GET {{oT[0] | number:"1.0-0"}}</span>&nbsp;
							<span class="label label-default">SET {{oT[1] | number:"1.0-0"}}</span>&nbsp;
							<span class="label label-default">PPL {{oT[2] | number:"1.0-0"}}</span>&nbsp;
							<span class="label label-default">TRN {{oT[3] | number:"1.0-0"}}</span>
						</td>
					</tr>
				</tbody>
			</table>
			<table class="table table-condensed table-bordered table-responsive" *ngIf="exiD">
				<thead>
					<tr>
						<th class="text-center" rowspan="2">
							Duration
						</th>
						<th class="text-center" colspan="4">
							Requests
						</th>
					</tr>
					<tr>
						<th class="text-center">
							Expected
						</th>
						<th class="text-center">
							Executed
						</th>
						<th class="text-center">
							Cached
						</th>
						<th class="text-center">
							Distribution
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="text-center">
							<span class="label label-primary">{{dur | number:"1.0-0"}} ms</span>
						</td>
						<td class="text-center"><span class="label label-info">{{exmR | number:"1.0-0"}}</span>
						</td>
						<td class="text-center"><span class="label label-info">{{rqEx | number:"1.0-0"}}</span>
						</td>
						<td class="text-center"><span class="label label-info">{{rqCh | number:"1.0-0"}}</span>
						</td>
						<td class="text-center">
							<span class="label label-default">GET {{oT[0] | number:"1.0-0"}}</span>&nbsp;
							<span class="label label-default">SET {{oT[1] | number:"1.0-0"}}</span>&nbsp;
							<span class="label label-default">PPL {{oT[2] | number:"1.0-0"}}</span>&nbsp;
							<span class="label label-default">TRN {{oT[3] | number:"1.0-0"}}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- Requests statistical histogram -->
	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-signal"></i>&nbsp;Request Duration Histogram</h4>
			</div>
			<table class="table table-striped table-condensed table-bordered table-responsive">
				<thead>
					<tr>
						<th width="28%" class="text-center">Requests</th>
						<th width="18%" class="text-center">AngularJS<br/>
							<small>(t7-t0)</small>
						</th>
						<th width="18%" class="text-center">nginX<br/>
							<small>(t6-t1)</small>
						</th>
						<th width="18%" class="text-center">Node.js<br/>
							<small>(t5-t2)</small>
						</th>
						<th width="18%" class="text-center">redis.io<br/>
							<small>(t4-t3)</small>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr *ngFor="let hst of hg">
						<td class="text-center">
							<small><strong>{{hst[0]}}% <i>(up to {{cPo(rOK,hst[0])}})</i></strong></small>
						</td>
						<td class="text-center">
							<small>{{hst[1] | number:"1.0-0"}} ms</small>
						</td>
						<td class="text-center">
							<small>{{hst[2] | number:"1.0-0"}} ms</small>
						</td>
						<td class="text-center">
							<small>{{hst[3] | number:"1.1-1"}} ms</small>
						</td>
						<td class="text-center">
							<small>{{hst[4] | number:"1.1-1"}} ms</small>
						</td>
					</tr>
					<tr class="info">
						<th class="text-center">
							<small><i>Throughput &#956;&#177;2&#963;</i></small>
						</th>
						<th class="text-center">
							<small>{{tpA | number:"1.0-0"}} req/s</small>
						</th>
						<th class="text-center">
							<small>{{tpX | number:"1.0-0"}} req/s</small>
						</th>
						<th class="text-center">
							<small>{{tpN | number:"1.0-0"}} req/s</small>
						</th>
						<th class="text-center">
							<small>{{tpR | number:"1.0-0"}} req/s</small>
						</th>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- nginX average duration donut chart -->
	<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-area-chart"></i>&nbsp;nginX Avg <i>&#956;&#177;2&#963;</i> (ms)
				</h4>
			</div>
			<div class="panel-body">
				<nvd3 [options]="loS.stS.ctS.pco" [data]="loS.stS.ctS.pcd"></nvd3>
			</div>
		</div>
	</div>
	<!-- AngularJS average duration donut chart -->
	<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-area-chart"></i>&nbsp;AngularJS Avg
					<i>&#956;&#177;2&#963;</i> (ms)</h4>
			</div>
			<div class="panel-body">
				<nvd3 [options]="loS.stS.ctS.pco2" [data]="loS.stS.ctS.pcd2"></nvd3>
			</div>
		</div>
	</div>
	<!-- Latency by Percentile Distribution lineBar chart -->
	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-area-chart"></i>&nbsp;HDR Histogram w/o Coordinated Omission
				</h4>
			</div>
			<div class="panel-body">
				<nvd3 [options]="loS.stS.ctS.lco" [data]="loS.stS.ctS.lcd"></nvd3>
			</div>
		</div>
	</div>
	<!-- Requests duration distribution multiBar chart -->
	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-area-chart"></i>&nbsp;Requests Duration (ms)</h4>
			</div>
			<div class="panel-body">
				<nvd3 [options]="loS.stS.ctS.bco" [data]="loS.stS.ctS.bcd"></nvd3>
			</div>
		</div>
	</div>
</div>
<!-- Balanced requests tables per node cluster -->
<div class="row" *ngIf="!run && rOK!==0 && !rlS.sRe && !leS.lE">
	<!-- Processed responses -->
	<div class="col-xs-12 col-sm-6 col-md-3" *ngFor="let nodes of rs">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-server"></i>&nbsp;{{nodes[0]}}
					<small>({{nodes[2]}})</small>
				</h4>
			</div>
			<table class="table table-striped table-condensed table-bordered table-responsive">
				<thead>
					<tr>
						<th *ngFor="let pid of nodes[1]" class="text-center">
							<i class="fa fa-sitemap"></i><br/>{{pid[0]}}<br/>
							<small>({{pid[1][0].length+pid[1][1].length+pid[1][2].length+pid[1][3].length}})</small>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td *ngFor="let pid of nodes[1]" class="text-center">
						<span *ngIf="pid[1][0].length>0">
							<small><span class="label label-success">GET {{pid[1][0].length}}</span></small><br/>
							<code *ngFor="let req of pid[1][0]">{{req}}<br/></code>
						</span>
						<span *ngIf="pid[1][1].length>0">
							<small><span class="label label-warning">SET {{pid[1][1].length}}</span></small><br/>
							<code *ngFor="let req of pid[1][1]">{{req}}<br/></code>
						</span>
						<span *ngIf="pid[1][2].length>0">
							<small><span class="label label-danger">PPL {{pid[1][2].length}}</span></small><br/>
							<code *ngFor="let req of pid[1][2]">{{req}}<br/></code>
						</span>
						<span *ngIf="pid[1][3].length>0">
							<small><span class="label label-default">TRN {{pid[1][3].length}}</span></small><br/>
							<code *ngFor="let req of pid[1][3]">{{req}}<br/></code>
						</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- Cached responses -->
	<div class="col-xs-12">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-server"></i>&nbsp;Cached GET responses
					<small>({{rqCh}})</small>
				</h4>
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-xs-1 text-center" *ngFor="let req of chRe">
						<code>{{req}}</code>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Responses per thread -->
	<div class="col-xs-12">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-server"></i>&nbsp;Simultaneous threads
					<small>({{exC}})</small>
				</h4>
			</div>
			<table class="table table-striped table-condensed table-bordered table-responsive" *ngFor="let tbl of tReq; let tblI = index">
				<thead>
					<tr>
						<th *ngFor="let thr of tbl; let thrI = index" class="text-center">
							<i class="fa fa-sitemap"></i><br/>{{thrI+1+(tblI*12)}}<br/>
							<small>({{thr.length}})</small>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td *ngFor="let thr of tbl" class="text-center">
							<code *ngFor="let thRq of thr">{{thRq+1}}<br/></code>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
<!-- Reference -->
<div class="row" *ngIf="rlS.sRe">
	<!-- Execution architecture static diagram -->
	<div class="col-xs-12">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-sitemap"></i>&nbsp;Execution Architecture</h4>
			</div>
			<img class="img-responsive" src="./execution-arch.png">
		</div>
	</div>
	<!-- Sequence diagram static diagram -->
	<div class="col-xs-12">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-sitemap"></i>&nbsp;Sequence Diagram</h4>
			</div>
			<img class="img-responsive" src="./sequence-diagram.png">
		</div>
	</div>
	<!-- Reference links -->
	<div class="col-xs-12">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-globe"></i>&nbsp;Reference Links</h4>
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-xs-12 col-sm-6">
						<blockquote *ngFor="let grpLinks of rlS.links.l0">
							<dl>
								<dt>{{grpLinks.t}}</dt>
								<dd>
									<footer *ngFor="let link of grpLinks.a; let l0Idx = index">
										<a [href]="link.h" (click)="oRLC(grpLinks.t,link.d)" target="_blank">{{l0Idx+1}}. {{link.d}}</a>
									</footer>
								</dd>
							</dl>
						</blockquote>
					</div>
					<div class="col-xs-12 col-sm-6">
						<blockquote *ngFor="let grpLinks of rlS.links.l1">
							<dl>
								<dt>{{grpLinks.t}}</dt>
								<dd>
									<footer *ngFor="let link of grpLinks.a; let l1Idx = index">
										<a [href]="link.h" (click)="oRLC(grpLinks.t,link.d)" target="_blank">{{l1Idx+1}}. {{link.d}}</a>
									</footer>
								</dd>
							</dl>
						</blockquote>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Video Galery -->
	<div class="col-xs-12" *ngFor="let grpLinks of rlS.links.v">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-youtube"></i>&nbsp;Video Gallery - {{grpLinks.t}}</h4>
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-xs-12 col-sm-6 col-md-4" *ngFor="let link of grpLinks.a">
						<div class="embed-responsive embed-responsive-16by9">
							<iframe class="embed-responsive-item" [src]="link.h" allowfullscreen></iframe>
						</div>
						<small><em>{{link.d}}</em></small>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Spinner -->
<div class="row" *ngIf="run">
	<div class="col-xs-12">
		<div class="panel panel-success">
			<div class="panel-heading">
				<div class="row">
					<div class="col-xs-6">
						<h4 class="panel-title">
							<!--<i class="fa fa-spin fa-spinner"></i>&nbsp;-->
							<span [hidden]="loS.stS.clc">Running...</span>
							<span [hidden]="!loS.stS.clc">Calculating statistics...</span>
						</h4>
					</div>
					<div class="col-xs-6 text-right">
						<h4 class="panel-title">
							<span class="label label-default">GET {{oT[0]}}</span>&nbsp;
							<span class="label label-default">SET {{oT[1]}}</span>&nbsp;
							<span class="label label-default">PPL {{oT[2]}}</span>&nbsp;
							<span class="label label-default">TRN {{oT[3]}}</span>&nbsp;
							<span class="label label-info">CACHED {{rqCh}}</span>&nbsp;
							<span class="label label-success">OK {{rOK}}</span>&nbsp;
							<span class="label label-danger">ERR {{rER}}</span>
						</h4>
					</div>
				</div>
			</div>
			<table class="table table-condensed">
				<tbody>
					<tr [hidden]="rOK<2">
						<td class="bg-primary text-right" width="{{pV(rOK,rqCt)}}%"><h4>{{pV(rOK,rqCt)}}%</h4></td>
						<td class="bg-info" *ngIf="pV(rOK,rqCt)<100"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
<!-- Database Live Events -->
<div class="row" *ngIf="leS.lE && !rlS.sRe">
	<div class="col-xs-12">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title"><i class="fa fa-database"></i>&nbsp;Database Change - Live Events</h4>
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-xs-12">
						<div class="table-responsive">
							<table class="table-centered">
								<thead>
									<tr>
										<th colspan="32" class="text-center">Redis cluster (6 processes)</th>
									</tr>
									<tr>
										<th></th>
										<th colspan="10" class="text-center text-info">
											<i class="fa fa-database"></i>&nbsp;redis #1 (M+S)
										</th>
										<th colspan="10" class="text-center text-muted">
											<i class="fa fa-database"></i>&nbsp;redis #2 (M+S)
										</th>
										<th colspan="10" class="text-center text-primary">
											<i class="fa fa-database"></i>&nbsp;redis #3 (M+S)
										</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr *ngFor="let evy of leS.leMx">
										<td *ngFor="let evx of evy">
											<small [class]="leS.gDS[evx]">
												<i class="fa fa-database" style="margin-right:1px;"></i>
											</small>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>`;
})(window.app || (window.app = {}));
