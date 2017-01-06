var timerId;
var http = require('http');
var fs = require('fs');
var clientId = "FREE_TRIAL_ACCOUNT"; // No need to change
var clientSecret = "PUBLIC_SECRET";  // No need to change

//Mail
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'your@gmail.com',					//Add your gmail account	
		pass: 'password@123'					//Add your password here
	}
});

module.exports.sendEmail = function() {
	if (timerId) return;
	 
	timerId = setTimeout(function() {
		clearTimeout(timerId);
		timerId = null;
	}, 10000);
	 
	console.log('Sendig a Message & Email...');
	 
	var mailOptions = {
		from: 'Interrupt Vatsal <vatsal.interrupt.alert@gmail.com>',
		to: 'your@gmail.com',
		subject: '[Vatsal Shah] Interrupt Detected',
		html: '<b>Mr. Vatsal</b>,<br/><br/>Someone is trying to Enter your Home. <br/><br/> At : ' + Date() + '<br/> Thanks,<br/><i>Vatsal Pi</i>'
	};
	 
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
		  console.log(error);
		} else {
		  console.log('Mail sent: ' + info.response);
		}
	});

	//Whatsapp and Telegram
	console.log('Sendig an Message...');
	var jsonPayload = JSON.stringify({

		number: "**-********",			//Add your contact no
		message: "Mr. Vatsal, Someone is trying to Enter your Home. Take Care!  At: " +  Date() + "."
		caption: "Motion Detected",
	});
	
	//Here added Whasmate Api. Check website for more info.
	var options1 = {
		hostname: "api.whatsmate.net",
		port: 80,
		path: "/v1/whatsapp/queue/message",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-WM-CLIENT-ID": clientId,
			"X-WM-CLIENT-SECRET": clientSecret,
			"Content-Length": Buffer.byteLength(jsonPayload)
		}
	};

	var options2 = {
		hostname: "api.whatsmate.net",
		port: 80,
		path: "/v1/telegram/single/message/0",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-WM-CLIENT-ID": clientId,
			"X-WM-CLIENT-SECRET": clientSecret,
			"Content-Length": Buffer.byteLength(jsonPayload)
		}
	};

	var request1 = new http.ClientRequest(options1);
	var request2 = new http.ClientRequest(options2);

	request1.end(jsonPayload);
	request2.end(jsonPayload);

	request1.on('response', function (response) {
		console.log('Heard back from the WhatsMate Gateway:\n');
		console.log('Status code: ' + response.statusCode);
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			console.log(chunk);
		});
	});

	request2.on('response', function (response) {
		console.log('Heard back from the Telegram Gateway:\n');
		console.log('Status code: ' + response.statusCode);
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			console.log(chunk);
		});
	});

}

