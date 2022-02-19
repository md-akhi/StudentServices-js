import React from "react";

import * as dataFrelanser from "../../../data/frelanser.js";
import BreadCrumbComponet from "../../component/breadCrumb";
import FooterLayout from "../../layouts/footer";
import BodyLayout from "../../layouts/body";
import MainSidebarLayout from "../../layouts/mainSidebar";
import NavbarLayout from "../../layouts/navbar";

import VisaImg from "../../../data/img/credit/visa.png";
import MasterCardImg from "../../../data/img/credit/mastercard.png";
import AmericanExpressImg from "../../../data/img/credit/american-express.png";
import PayPalImg from "../../../data/img/credit/paypal2.png";

export default (props) => {
	const { Invoice = null } = props;
	const {
		_id: invoiceId = 0,
		projectId = {},
		requestId = {},
		employerId = {},
		frelancerId = {},
	} = Invoice;
	const { name: PName = "" } = projectId;
	const { _id: RId = 0, invoice: RInvoices = {} } = requestId;
	const {
		//name: EName = "",
		//address: EAddress = "",
		//phone: EPhone = "",
		email: EEmail = "",
	} = employerId;
	const {
		//name: FName = "",
		//address: FAddress = "",
		//phone: FPhone = "",
		email: FEmail = "",
	} = frelancerId;
	return (
		<BodyLayout className="hold-transition sidebar-mini layout-fixed">
			<NavbarLayout NavbarLinks={dataFrelanser.linkNavUp}></NavbarLayout>
			<MainSidebarLayout
				Data={dataFrelanser.menuSidbarRight}
			></MainSidebarLayout>

			{/* Content Wrapper. Contains page content */}
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<BreadCrumbComponet
					Data={dataFrelanser.breadCrumb}
					Name={"Frelanser"}
					Active={"Frelanser"}
				></BreadCrumbComponet>
				{/* /.content-header */}

				{/* Main content */}

				<section className="content">
					<div className="container-fluid">
						<div className="row">
							<div className="col-12">
								<div className="callout callout-info">
									<h5>
										<i className="fas fa-info"></i> Note:
									</h5>
									This page has been enhanced for printing. Click the print
									button at the bottom of the invoice to test.
								</div>

								{/* Main content */}
								<div className="invoice p-3 mb-3">
									{/* title row */}
									<div className="row">
										<div className="col-12">
											<h4>
												<i className="fas fa-globe"></i>
												{PName} .
												<small className="float-right">Date: 2/10/2014</small>
											</h4>
										</div>
										{/* /.col */}
									</div>
									{/* info row */}
									<div className="row invoice-info">
										<div className="col-sm-4 invoice-col">
											From
											<address>
												{/* <strong>{EName}.</strong>
												<br />
												{EAddress} 795 Folsom Ave, Suite 600
												<br />
												Phone:{EPhone} (804) 123-5432 */}
												<br />
												Email: {EEmail.now}
											</address>
										</div>
										{/* /.col */}
										<div className="col-sm-4 invoice-col">
											To
											<address>
												{/* <strong>{FName}.</strong>
												<br />
												{FAddress} 795 Folsom Ave, Suite 600
												<br />
												Phone:{FPhone} (804) 123-5432 */}
												<br />
												Email: {FEmail.now}
											</address>
										</div>
										{/* /.col */}
										<div className="col-sm-4 invoice-col">
											<b>Invoice #{String(RId)}</b>
											<br />
											<br />
											<b>Order ID:</b> 4F3S8J
											<br />
											<b>Payment Due:</b> 2/22/2014
											<br />
											<b>Account:</b> 968-34567
										</div>
										{/* /.col */}
									</div>
									{/* /.row */}

									{/* Table row */}
									<div className="row">
										<div className="col-12 table-responsive">
											<table className="table table-striped">
												<thead>
													<tr>
														<th>Qty</th>
														<th>Product</th>
														<th>Serial #</th>
														<th>Description</th>
														<th>Subtotal</th>
													</tr>
												</thead>
												<tbody>
													<ExpenseItem data={RInvoices}></ExpenseItem>
													<tr>
														<td>1</td>
														<td>Call of Duty</td>
														<td>455-981-221</td>
														<td>
															El snort testosterone trophy driving gloves
															handsome
														</td>
														<td>$64.50</td>
													</tr>
													<tr>
														<td>1</td>
														<td>Need for Speed IV</td>
														<td>247-925-726</td>
														<td>Wes Anderson umami biodiesel</td>
														<td>$50.00</td>
													</tr>
													<tr>
														<td>1</td>
														<td>Monsters DVD</td>
														<td>735-845-642</td>
														<td>
															Terry Richardson helvetica tousled street art
															master
														</td>
														<td>$10.70</td>
													</tr>
													<tr>
														<td>1</td>
														<td>Grown Ups Blue Ray</td>
														<td>422-568-642</td>
														<td>Tousled lomo letterpress</td>
														<td>$25.99</td>
													</tr>
												</tbody>
											</table>
										</div>
										{/* /.col */}
									</div>
									{/* /.row */}

									<div className="row">
										{/* accepted payments column */}
										<div className="col-6">
											<p className="lead">Payment Methods:</p>
											<img src={VisaImg} alt="Visa" />
											<img src={MasterCardImg} alt="Mastercard" />
											<img src={AmericanExpressImg} alt="American Express" />
											<img src={PayPalImg} alt="Paypal" />

											<p
												className="text-muted well well-sm shadow-none"
												style={{ marginTop: "10px" }}
											>
												Etsy doostang zoodles disqus groupon greplin oooj voxy
												zoodles, weebly ning heekya handango imeem plugg dopplr
												jibjab, movity jajah plickers sifteo edmodo ifttt
												zimbra.
											</p>
										</div>
										{/* /.col */}
										<div className="col-6">
											<p className="lead">Amount Due 2/22/2014</p>

											<div className="table-responsive">
												<table className="table">
													<tr>
														<th style={{ width: "50%" }}>Subtotal:</th>
														<td>$250.30</td>
													</tr>
													<tr>
														<th>Tax (9.3%)</th>
														<td>$10.34</td>
													</tr>
													<tr>
														<th>Shipping:</th>
														<td>$5.80</td>
													</tr>
													<tr>
														<th>Total:</th>
														<td>$265.24</td>
													</tr>
												</table>
											</div>
										</div>
										{/* /.col */}
									</div>
									{/* /.row */}

									{/* this row will not appear when printing */}
									<div className="row no-print">
										<div className="col-12">
											<a
												href={"./" + id + "/print"}
												rel="noopener"
												target="_blank"
												className="btn btn-default"
											>
												<i className="fas fa-print"></i> Print
											</a>
											<button
												type="button"
												className="btn btn-success float-right"
											>
												<i className="far fa-credit-card"></i> Submit Payment
											</button>
											<button
												type="button"
												className="btn btn-primary float-right"
												style={{ marginRight: "5px" }}
											>
												<i className="fas fa-download"></i> Generate PDF
											</button>
										</div>
									</div>
								</div>
								{/* /.invoice */}
							</div>
							{/* /.col */}
						</div>
						{/* /.row */}
					</div>
					{/* /.container-fluid */}
				</section>
				{/* /.content */}
			</div>
			{/* /.content-wrapper */}
			<FooterLayout></FooterLayout>

			{/* Control Sidebar */}
			<aside className="control-sidebar control-sidebar-dark">
				{/* Control sidebar content goes here */}
			</aside>
			{/* /.control-sidebar */}
			{/* ./wrapper */}
		</BodyLayout>
	);
};
function ExpenseItem(props) {
	const { data } = props;
	return data.map((item, index) => {
		const { _id: id, description, amount } = item;
		return (
			<tr>
				<td>{index + 1}</td>
				<td>name</td>
				<td>number</td>
				<td>{description}</td>
				<td>${amount}</td>
			</tr>
		);
	});
}
