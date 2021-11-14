/**
 * IdPay Node.js Module
 * @module IdPay
 * @author Mohammad Amanalikhani <md.akhi.ir[at]gmail.com>
 * @copyright akhi.ir 1400
 * @version 1.0.0
 * @license UNLICENSE
 */

import Axios from "axios";

/** IdPay Class */
export default class IDPay {
	/**
	 * Get the API Key
	 * @param {string} APIKey Your gateway API Key.
	 * @throws Will throw an error if the API isn't string.
	 */
	constructor(APIKey, endPoint, SandBox) {
		this.Axios = Axios;
		if (APIKey != "" && typeof APIKey === "string") {
			this.setApiKey(APIKey);
			setEndpoint(endPoint);
			setSandBox(SandBox);
		} else
			throw new Error(
				"You should pass your Pay.ir API Key to the constructor."
			);
	}

	/**
	 * Create new payment on Idpay
	 * Get payment path and payment id.
	 *
	 * @param string callback
	 * @param string amount
	 * @param string name
	 * @param string phone
	 * @param string description
	 *
	 * @return array|@paymentPath
	 */
	/**
	 * Build and prepare transaction URL
	 * @param {number} amount Transaction's Amount
	 * @param {string} callbackURL User will redirect to this URL to check transaction status
	 * @param {string} [null] factorNumber Order ID or Invoice Number
	 * @throws Will throw an error if URL building isn't successfull.
	 */
	// https://idpay.ir/web-service/v1.1/?javascript#2c82b7acb2
	//ایجاد تراکنش
	Payment(callbackURL, orderId, data) {
		var options = {
			method: "POST",
			url: this.endPoint.payment,
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": this.APIKey,
				"X-SANDBOX": this.SandBox,
			},
			body: {
				order_id: orderId, //"101",
				callback: callbackURL, //"https://example.com/callback",
				...data,
				amount: amount, //10000,
				name: name, //"قاسم رادمان",
				phone: phone, //"09382198592",
				mail: mail, //"my@site.com",
				desc: description, //"توضیحات پرداخت کننده",
			},
			json: true,
		};
		return new Promise((resolve, reject) => {
			if (typeof data.amount !== "number" || data.amount < 1000)
				throw new Error(
					"Transaction's amount must be a number and equal/greater than 1000"
				);
			else if (typeof callbackURL !== "string" || callbackURL.length < 5)
				throw new Error("Callback (redirect) URL must be a string.");
			else if (callbackURL.slice(0, 4) != "http")
				throw new Error("Callback URL must start with http/https");
			this.Axios(options, (error, response, body) => {
				if (error) reject(new Error(error));
				else if (response.statusCode != 200)
					reject(new Error("Request status code was not OK."));
				else if (typeof body != "undefined" && JSON.parse(body).status != 1)
					reject(JSON.parse(body).errorMessage);
				resolve(JSON.parse(body));
			});
		});
	}

	/**
	 *
	 * @param {Object} req Your web framework POST body/payload
	 */
	Verify(trackId, orderId) {
		var options = {
			method: "POST",
			url: this.endPoint.verify,
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": this.APIKey,
				"X-SANDBOX": this.SandBox,
			},
			body: {
				id: trackId, //"d2e353189823079e1e4181772cff5292",
				order_id: orderId, //"101",
			},
			json: true,
		};
		return new Promise((resolve, reject) => {
			if (!trackId || typeof trackId !== "number")
				throw new Error("Transaction ID is not valid.");

			this.Axios(options, (error, response, body) => {
				if (error) reject(new Error(error));
				else if (response.statusCode != 200)
					reject(new Error("Request status code was not OK."));
				else if (typeof body != "undefined" && JSON.parse(body).status != 1)
					reject(JSON.parse(body).errorMessage);
				resolve(JSON.parse(body));
			});
		});
	}

	/**
	 * Inquiry payment result by trackId and orderId.
	 *
	 * @param trackId
	 * @param orderId
	 *
	 * @return array
	 */
	Inquiry(trackId, orderId) {
		var options = {
			method: "POST",
			url: this.endPoint.inquiry,
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": this.APIKey,
				"X-SANDBOX": this.SandBox,
			},
			body: {
				id: trackId, //"d2e353189823079e1e4181772cff5292",
				order_id: orderId, //"101",
			},
			json: true,
		};

		return new Promise((resolve, reject) => {
			if (!trackId || typeof trackId !== "number")
				throw new Error("Transaction ID is not valid.");

			this.Axios(options, (error, response, body) => {
				if (error) reject(new Error(error));
				else if (response.statusCode != 200)
					reject(new Error("Request status code was not OK."));
				else if (typeof body != "undefined" && JSON.parse(body).status != 1)
					reject(JSON.parse(body).errorMessage);
				resolve(JSON.parse(body));
			});
		});
	}

	/**
	 * Check received data on payment callback.
	 *
	 * @return boolean
	 */
	receiveData() {
		if (this.id) {
			this.trackId = this.id;
			this.data = this;
			return true;
		}
		return false;
	}

	/**
	 * Get track id of payment.
	 *
	 * @return string
	 */
	getTrackId() {
		return this.trackId;
	}

	/**
	 * @param mixed APIKey
	 *
	 * @return void
	 */
	setApiKey(APIKey) {
		this.APIKey = APIKey;
	}

	/**
	 * Set sandbox mode.
	 *
	 * @return void
	 */
	setSandBox(SandBox) {
		this.SandBox = SandBox;
	}

	/**
	 * @param mixed endpoint
	 *
	 * @return void
	 */
	setEndpoint(endPoint) {
		this.endPoint = {
			payment: endPoint.payment, //"https://api.idpay.ir/v1.1/payment"
			verify: endPoint.payment + endPoint.verify, //"https://api.idpay.ir/v1.1/payment/verify"
			inquiry: endPoint.payment + endPoint.inquiry, //"https://api.idpay.ir/v1.1/payment/inquiry"
		};
	}
}
