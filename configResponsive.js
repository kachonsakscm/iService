var wgServer 	 = "https://galb-dev.truecorp.co.th/iservice";
var apiServer = "https://galb-dev.truecorp.co.th";
var urldownloadfileChat = "https://galb-dev.truecorp.co.th/downloadResource/download";
var urlchathisrotyview = "https://galb-dev.truecorp.co.th/getTrueChatHistory_API";
var urlgettokenhistory = "https://galb-dev.truecorp.co.th/getTrueChatHistory_API/token";
var urlverifytokendownload = "https://galb-dev.truecorp.co.th/downloadResource/verify/";
var urltermitokendownload = "https://galb-dev.truecorp.co.th/downloadResource/terminatetoken/";
var urlgettokendownload = "https://galb-dev.truecorp.co.th/downloadResource/gentoken";
var urlcheckmimetypeagent = "https://galb-dev.truecorp.co.th/downloadResource/validatefiletype/genesys";
var urlcheckmimetypecustomer = "https://galb-dev.truecorp.co.th/downloadResource/validatefiletype";
var gmschat = "gms-chat";
var wgResponsive = "responsive";
var wgImagePath  = "img";
var wgConfigPath = "config";
var wgScriptPath = "scripts";
var wgStylePath = "styles";
var wgLanguage = "TH";
var UserId ="";
var ChatId = "" ;
var SecureKey = "" ;
var Alias = "" ;
var TranscriptPosition ;
var chat ;
var user;
var device = "";
var paramdevice = {};

function getdevice(){
		var url=decodeURIComponent(window.location.href).replace( /\+/g, ' ' );
		var urlStep1 = url.split("?");
		if(urlStep1.length > 1){
			var urlStep2 = urlStep1[1].split("&");
			urlStep2.forEach(function(e) {
			var temp = e.split("=");
			paramdevice[temp[0]] = temp[1]; 
			}); 
		}
			device = paramdevice['Channel'];
	}
	getdevice();
if(window.innerWidth <= 1000)
	{
		if(device == "ios" || device == "android")
		{
			var wgScript = [
				{type:"script",	id:"chatapi",		path:wgServer+"/"+"chatapiResponsive.js"},
				{type:"script",	id:"wgfunction",	path:wgServer+"/"+"wgfunctionResponsive.js"},
				{type:"link",	id:"widgetstrue" ,	path:wgServer+"/"+"truewebchat_widgetResponsivemobileapp.css"}	
			];
		}else if(device == "trueyou")
		{
			var wgScript = [
					{type:"script",	id:"chatapi",		path:wgServer+"/"+"chatapiResponsive.js"},
					{type:"script",	id:"wgfunction",	path:wgServer+"/"+"wgfunctionResponsive.js"},	
					{type:"link",	id:"widgetstrue" ,	path:wgServer+"/"+"truewebchat_widgetResponsive.css"}	
				];
		}else if(device == "mobile")
		{
			var wgScript = [
					{type:"script",	id:"chatapi",		path:wgServer+"/"+"chatapiResponsive.js"},
					{type:"script",	id:"wgfunction",	path:wgServer+"/"+"wgfunctionResponsive.js"},	
					{type:"link",	id:"widgetstrue" ,	path:wgServer+"/"+"truewebchat_widgetResponsivemobileweb.css"}	
				];
		}else
		{	 
			var wgScript = [
				{type:"script",	id:"chatapi",		path:wgServer+"/"+"chatapiResponsive.js"},
				{type:"script",	id:"wgfunction",	path:wgServer+"/"+"wgfunctionResponsive.js"},	
				{type:"link",	id:"widgetstrue" ,	path:wgServer+"/"+"truewebchat_widgetResponsive.css"}	
			];
		}
	}
else if(window.innerWidth > 1000)
{	
	var wgScript = [
			{type:"script",	id:"chatapi",		path:wgServer+"/"+"chatapiResponsive.js"},
			{type:"script",	id:"wgfunction",	path:wgServer+"/"+"wgfunctionResponsive.js"},
			{type:"link",	id:"widgetstrue" ,	path:wgServer+"/"+"truewebchat_widgetResponsive.css"}	
		];
}

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 71
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;
var dataMessageTH={"Greeting":"สวัสดีค่ะ ทรูแคร์แชทยินดีให้บริการค่ะ . Hello welcome to True Care Chat service.",
"startchat":"คุณสามารถเลือกเมนูลัดด้านล่าง หรือหากต้องการติดต่อเรื่องนอกเหนือจากนี้ กรุณาพิมพ์เรื่องที่ต้องการ",
"TypeIntention":"พิมพ์เรื่องที่ต้องการขอรับบริการได้เลยค่ะ เช่น สอบถามยอดค้าง มือถือ เบอร์ 0912345678",
"Outofwork":"Our operating hours are from 8 am to 11 pm. Please contact us again during operating hours. Sorry for the inconvenience this may have caused.",
"queueparttern1":"คุณเป็นคนที่ ",
"queueparttern2":"มีคิวก่อนหน้าคุณ",
"queueparttern3":"คิว กรุณากดปุ่มจองคิว หากต้องการสนทนากับเจ้าหน้าที่",
"SystemMessageinformEWT":"รอสักครู่นะคะ เวลารอโดยประมาณคือ 15 นาทีค่ะ",
"AskSMS":"กรอกเบอร์โทรศัพท์ทรูมูฟเอช เพื่อให้ระบบส่ง SMS แจ้งเตือนเมื่อใกล้ถึงคิวของคุณ",
"ConfirmSMSnumber":"เมื่อใกล้ถึงคิวของคุณ ระบบจะส่ง SMS แจ้งเตือนไปที่เบอร์ ",
"ChatStarted":"เพื่อความรวดเร็ว คุณสามารถตรวจสอบข้อมูลต่างๆ ด้วยตัวเองได้ง่ายๆ โดยการใช้งานระบบอัตโนมัติ ผ่าน <a href='https://iservice.truecorp.co.th/' target='_blank'>www.TrueiService.com </a> หรือ Application TrueiService ซึ่ง download ได้จาก App Store สำหรับ ios หรือ Play Store สำหรับ Android ระบบกำลังส่งข้อมูลไปยังเจ้าหน้าที่ค่ะ",
"endchat":"ขอบคุณที่ใช้บริการทรู แคร์ แชทค่ะ",
"startchat1":"พิมพ์ข้อความที่นี",
"btn_q":"ตกลง",
"btn_ok":"ตกลง",
"btn_end":"สิ้นสุดการสนทนา",
"btn_cancel":"ยกเลิก",
"btn_email":"ส่งอีเมล",
"SmsY":"ส่ง",
"SmsN":"ยกเลิก",
"AskSMSBox":" 089XXXXXXX",
"Textsent":"พิมพ์ข้อความที่นี่...",
"typing":"กำลังพิมพ์ ...",
"Joinedchat":"เข้าสู่การสนทนา ทรูขออนุญาตบันทึกการสนทนาในครั้งนี้ โดยข้อมูลการสนทนา จะนำไปใช้เพื่อปรับปรุงการให้บริการเท่านั้น ",
"DownloadButton":"ดาวน์โหลด",
"DownloadButtonios":"กดยืนยันการดาวน์โหลด",
"Leftchat":"ออกจากการสนทนา",
"iserviceendchat":"หากต้องการสนทนาอีกครั้ง กรุณากดย้อนกลับและทำรายการใหม่อีกครั้ง",
"btniserviceendchat":"เริ่มต้นสนทนาอีกครั้ง",
"phonenumber":"กรุณาตรวจสอบหมายเลขโทรศัพท์ของท่าน",
"EWT":"คุณจะได้รับบริการใน _X_ นาที หากต้องการรับบริการต่อกรุณาเลือก 'ตกลง' หรือสามารถเลือกทำรายการอื่นได้ค่ะ",
"ChatEndQuestion":"ต้องการสิ้นสุดการสนทนาหรือไม่?",
"CancelChatEnd":"ต้องการสิ้นสุดรายการสนทนาหรือไม่?",
"EmailChatEnd":"ต้องการส่งอีเมลหรือไม่?",
"Error-Download-Attemps":"ไม่สามารถดาวน์โหลดไฟล์ได้เนื่องจากคุณดาวน์โหลดเกินจำนวครั้งที่กำหนดไว้",
"Error-Max-File-Size":"ไฟล์มีขนาดใหญ่เกินกว่าที่กำหนด",
"Error-File-Types":"นามสกุลไฟล์ของคุณไม่ตรงตามที่กำหนดไว้",
"Error-Upload-Max-Files":"จำนวนไฟล์ทั้งหมดเกินที่กำหนดไว้",
"Error-Max-Total-Size":"ขนาดของไฟล์ทั้งหมดเกินที่กำหนดไว้",
"Error-File-Types-Agent":"ไฟล์อันตรายไม่สามารถดาวน์โหลดได้",
"Error-102":"ไม่สามารถเข้าสู่ระบบสนทนาได้ กรุณาลองใหม่อีกครั้ง",
"Error-103":"ไม่สามารถเข้าสู่ระบบสนทนาได้ กรุณาลองใหม่อีกครั้ง",
"Error-161":"ไม่สามารถเข้าสู่ระบบสนทนาได้ กรุณาลองใหม่อีกครั้ง",
"Error-204":"ขออภัย ไม่สามารถส่งข้อความนี้ได้เนื่องจากข้อความยาวเกินไป กรุณาปรับข้อความให้สั้นลง",
"Error-401":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"Error-403":"ไม่สามารถเข้าสู่ระบบสนทนาได้ กรุณาลองใหม่อีกครั้ง",
"Error-404":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"Error-405":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"Error-0":"การเชื่อมต่อขัดข้อง กรุณาตรวจสอบอินเทอร์เน็ต ระบบจะนำท่านกลับสู่การสนทนาอัตโนมัติ",
"Error-408":"การเชื่อมต่อขัดข้อง กรุณาตรวจสอบอินเทอร์เน็ตและลองใหม่อีกครั้ง",
"Error-500":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"Error-502":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"Error-504":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"CriticalFault":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"StartFailed":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"MessageFailed":"ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
"RestoreFailed":"ขออภัย ระบบขาดการเชื่อมต่อ ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่อีกครั้ง",
"TransferFailed":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาลองใหม่ภายหลัง",
"FileTransferSizeError":"ขออภัย ไม่สามารถส่งไฟล์ได้เนื่องจากไฟล์มีขนาดใหญ่เกินไป",
"InviteFailed":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาลองใหม่ภายหลัง",
"ChatServerWentOffline":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"RestoredOffline":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง",
"Disconnected":"<div style='text-align:center'>การเชื่อมต่อขัดข้อง</div>",
"Reconnected":"<div style='text-align:center'>กำลังกลับเข้าสู่การสนทนา</div>",
"FileSendFailed":"ขออภัย ไม่สามารถส่งไฟล์ได้ กรุณาลองใหม่อีกครั้ง",
"Generic":"<div style='text-align:center'>ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง</div>",
"Email":"อีเมล์",
"ESubject":"เรื่อง",
"EProduct":"ประเภทสินค้า",
"AskEmailBox" :" กรุณาระบุอีเมล์ของท่าน",
"AskEmailSubjectBox" :" เรื่องที่ต้องการสอบถาม",
"AskEmailProductBox" :" กรุณาเลือกประเภทสินค้า",
"HeadEmail":"กรุณาทำรายการด้านล่างนี้",
"tabmessagenow":"ข้อความปัจุบัน",
"tabmessagehistory":"ข้อความก่อนหน้า",
"tabmessagehistoryfirst":"ตรวจสอบประวัติการสนทนา",
"alerthistory":"ไม่สามารถดูประวัติการสนทนาได้ในขณะนี้",
"alerthistorynotrequest":"กรุณารอเจ้าหน้าที่ตอบกลับสักครู่ค่ะ ",
"alerthistorynoserviceid":"กรุณา Log in เพื่อดูประวัติสนทนา",
"alerthistoryendchat":"ไม่สามารถดูประวัติสนทนาได้ หากยังไม่ได้คลิกปุ่มเริ่มต้นสนทนา ",
"alertoldhistory":"ไม่สามารถแสดงรายการของก่อนวันที่ "
}; 
 var dataMessageEN={
"Greeting":"สวัสดีค่ะ ทรูแคร์แชทยินดีให้บริการค่ะ . Hello welcome to True Care Chat service. ",
"startchat":"Please select the service you need from the options below. You may scroll left/right to view or select a specific product. If you cannot find the service that you require on the menu, please type in your request." ,
"TypeIntention":"Please type in your service request or question e.g. balance enquiry of mobile no. 0912345678. ",
"Outofwork":"Our operating hours are from 8 am to 11 pm. Please contact us again during operating hours. Sorry for the inconvenience this may have caused. ",
"queueparttern1":"Your queue is ",
"queueparttern2":"Have queue before you is ",
"queueparttern3":"Please click button if you wanna be chat with Agent. ",
"SystemMessageinformEWT":"Estimate wait time to chat is 15 minutes. ",
"AskSMS":"Please identify TrueMove H mobile number to receive an SMS alert when you are first in the queue. ",
"ConfirmSMSnumber":"SMS alert will be sent to ",
"Textsent":"Type your message... ",
"ChatStarted":"For speedy service,  you can check various information by yourself easily by using automated systems via <a href='https://iservice.truecorp.co.th/' target='_blank'>www.TrueiService.com </a> or Application TrueiService which can be downloaded from App Store for ios or Play Store for Android. Information is being transferred to one of our customer representatives.",
"btn_q":"OK",
"btn_ok":"OK",
"btn_end":"End Chat",
"btn_cancel":"Cancel",
"btn_email":"Send Email",
"SmsY":"Send",
"SmsN":"Cancel",
"AskSMSBox":"089XXXXXXX",
"typing":"typing...",
"Joinedchat":"Joined In Chat",
"DownloadButton":"Download",
"DownloadButtonios":"Click Confirm to Download.",
"Leftchat":"Left the chat",
"iserviceendchat":"If you wish to continue the conversation, please press 'return' to make the transaction again.",
"btniserviceendchat":"Start chatting again",
"phonenumber":"Please check your telephone number.",
"EWT":"Your request chat will be responded in _X_ mins. Choose 'OK' to continue waiting in the line, or end email instead",
"ChatEndQuestion":"To end the conversation?",
"CancelChatEnd":"To continue waiting in the line?",
"EmailChatEnd":"To send email?",
"Error-Download-Attemps":"Unable to download file, Downloaded more than limit Session",
"Error-Max-File-Size":"The file is exceeded the designation size",
"Error-File-Types":"Incorrect file type",
"Error-Upload-Max-Files":"The files are exceeded the designation amounts",
"Error-Max-Total-Size":"Oversize file",
"Error-File-Types-Agent":"Dangerous files cannot be downloaded",
"Error-102":"Cannot start joined in chat, please try again later",
"Error-103":"Cannot start joined in chat, please try again later",
"Error-161":"Cannot start joined in chat, please try again later",
"Error-204":"Sorry, this message cannot be sent because the message is too long. Please shorten the text.",
"Error-401":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"Error-403":"Cannot start joined in chat, please try again later",
"Error-404":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"Error-405":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"Error-0":"Sorry, there seems to have a connection issue, please check your internet connection. The system will takes you back to the chat conversation when the connection is ready. ",
"Error-408":"Sorry, there seems to have a connection issue, please check your internet and try again later.",
"Error-500":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"Error-502":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"Error-504":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"CriticalFault":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"StartFailed":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"MessageFailed":"ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
"RestoreFailed":"ขออภัย ระบบขาดการเชื่อมต่อ ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่อีกครั้ง",
"TransferFailed":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาลองใหม่ภายหลัง",
"FileTransferSizeError":"ขออภัย ไม่สามารถส่งไฟล์ได้เนื่องจากไฟล์มีขนาดใหญ่เกินไป",
"InviteFailed":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาลองใหม่ภายหลัง",
"ChatServerWentOffline":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"RestoredOffline":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง",
"Disconnected":"<div style='text-align:center'>การเชื่อมต่อขัดข้อง</div>",
"Reconnected":"<div style='text-align:center'>กำลังกลับเข้าสู่การสนทนา</div>",
"FileSendFailed":"ขออภัย ไม่สามารถส่งไฟล์ได้ กรุณาลองใหม่อีกครั้ง",
"Generic":"<div style='text-align:center'>ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง</div>",
"Email":"Email",
"ESubject":"Subject",
"EProduct":"Type of Product",
"AskEmailBox" :" please input your email",
"AskEmailSubjectBox" :" Subject",
"AskEmailProductBox" :" Please select product",
"HeadEmail":"Please fill the box below",
"tabmessagenow":"Current messages",
"tabmessagehistory":"ข้อความก่อนหน้า",
"alerthistory":"can not see history . please try again later.",
"alerthistorynotrequest":"Please wait for the staff to respond. ",
"alerthistorynoserviceid":"Please log in to see the Chat history.",
"alertoldhistory":"Cannot display items before ",
"alerthistoryendchat":"can not see history . Please Click the start conversation button.",
"tabmessagehistoryfirst":"Checking conversation"
 };

 
var UserIntentionTH = [
	{	"picture":"TMH-Main.png",
		"titlevalue":"TMH",
		"titletext":"มือถือ ทรูมูฟเอช",
		"choicevalue1":"BILL",
		"choicetext1":"ขอรายละเอียดค่าบริการมือถือ",
		"choicevalue2":"TECH",
		"choicetext2":"เน็ตมือถือใช้ไม่ได้ หรือโทรออกไม่ได้",
		"choicevalue3":"PROMO",
		"choicetext3":"อยากเปลี่ยนโปรโมชั่นมือถือ"
	},
	{	"picture":"TOL-Main.png",
		"titlevalue":"TOL",
		"titletext":"อินเทอร์เน็ตบ้าน ทรูออนไลน์",
		"choicevalue1":"BILL",
		"choicetext1":"ขอรายละเอียดค่าบริการเน็ตบ้าน",
		"choicevalue2":"TECH",
		"choicetext2":"เน็ตบ้านสัญญาณไม่ดี",
		"choicevalue3":"PROMO",
		"choicetext3":"เปลี่ยนแพ็กเกจ/ปรับสปีดเน็ตบ้าน"
	},
	{	"picture":"TVS-Main.png",
		"titlevalue":"TVS",
		"titletext":"เคเบิลทีวี ทรูวิชั่นส์",
		"choicevalue1":"BILL",
		"choicetext1":"ขอรายละเอียดบิลค่าบริการทรูวิชั่นส์",
		"choicevalue2":"TECH",
		"choicetext2":"ดูทีวีไม่ได้",
		"choicevalue3":"PROMO",
		"choicetext3":"เปลี่ยนแพ็กเกจ/เพิ่มช่องทรูวิชั่นส์"
	}
];

var UserIntentionEN = [
	{	"picture":"TMH-Main.png",
		"titlevalue":"TMH",
		"titletext":"Mobile Service",
		"choicevalue1":"BILL",
		"choicetext1":"Billing and payment",
		"choicevalue2":"TECH",
		"choicetext2":"Technical difficulties or network",
		"choicevalue3":"PROMO",
		"choicetext3":"Promotion Enquiry"
	},
	{	"picture":"TOL-Main.png",
		"titlevalue":"TOL",
		"titletext":"Internet",
		"choicevalue1":"BILL",
		"choicetext1":"Billing and payment",
		"choicevalue2":"TECH",
		"choicetext2":"Technical difficulties or network",
		"choicevalue3":"PROMO",
		"choicetext3":"Promotion Enquiry"
	},
	{	"picture":"TVS-Main.png",
		"titlevalue":"TVS",
		"titletext":"Cable TV",
		"choicevalue1":"BILL",
		"choicetext1":"Billing and payment",
		"choicevalue2":"TECH",
		"choicetext2":"Technical difficulties or network",
		"choicevalue3":"PROMO",
		"choicetext3":"Promotion Enquiry"
	}
];
	
var emoji = ["😁","😂","😃","😄","😆","😊","😍","😘","😚","😩","😫","😭","😷","😺","😻"];
var btn_Q = true;
var btn_CancelQ = true;
var btn_Email = false;
var WorkStartEng = 8 ;
var WorkStopEng = 23;	
var wgBtntabmessagehistoryfirst = {id:"btn-history",t:"wgSystem[wgLanguage]['messageresponse']['tabmessagehistoryfirst']",v:"",oc:"stephistory();" };
var wgBtnEng = {id:"btn-eng",t:"english",v:"EN",oc:"clearTimeEng();readConfig(this.value);afterSelectLanguage();" };
var wgBtnChat = {id:"btn-startchat",t:"startchat",v:"",oc:"openForm();end=false;" };
var wgBtnreChat = {id:"btn-restartchat",t:"startchat",v:"",oc:"openForm();" };
var wgBtnQ = {id:"btn-q",t:"",v:"q",oc:"selectq();clearTimeout(timeselecter);" };
var wgBtnCancelQ = {id:"btn-canq",t:"",v:"cancel",oc:"closeForm(this.val);" };
var wgBtnEmail = {id:"btn-email",t:"",v:"email",oc:"openemail();clearTimeout(timeselecter);" };
var wgImage = {agent:"agent.png",customer:"",external:"",mari:"mari.png"}

var wgAction = document;
var wgChatboxId = "wgChatbox";
var wgDivChatId = "chat-history";
var wgUlChatId = "ul-history";
var wgBackGID = "comfirm-end-background";
var wgSystem = {
	TH:	{
		agent:"Agent",customer:"You",external:"System",mari:"MARI",messageresponse:dataMessageTH,userintention:UserIntentionTH
	},
	EN: {
		agent:"Agent",customer:"You",external:"System",mari:"MARI",messageresponse:dataMessageEN,userintention:UserIntentionEN
	}
	};
var wgMimeType = {
	txt:"text/plain",htm:"text/html",html:"text/html",js:"text/javascript",css:"text/css",csv:"text/csv",
	jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",gif:"image/gif",bmp:"text/bmp",ico:"image/vnd.microsoft.icon",svg:"image/svg+xml",
	mp3:"audio/mpeg",wav:"audio/wav",acc:"audio/aac",mid:"audio/midi",midi:"audio/x-midi",mpeg:"audio/mpeg",
	mp4:"video/mp4",avi:"video/x-msvideo",avi:"video/x-msvideo",
	bin:"application/octet-stream",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",xls:"application/vnd.ms-excel",
	doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",pdf:"application/pdf",
	jar:"application/java-archive",json:"application/json",ppt:"application/vnd.ms-powerpoint",
	rar:"application/x-rar-compressed",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	xml:"application/xml",zip:"application/zip",z7:"application/x-7z-compressed",tif:"image/tiff"
	};
var wgMsgMari = {
	position : "",
	headclass : "message-data",
	img : wgServer+"/"+wgImagePath+"/"+ wgImage["mari"],
	name : wgSystem[wgLanguage]["mari"],
	headnameclass : "message-data-name",
	timeclass : "message-data-time",
	bodyclass : "message my-message"
};
var wgMsgMariload = {
	position : "load",
	headclass : "message-data",
	img : wgServer+"/"+wgImagePath+"/"+ wgImage["mari"],
	name : wgSystem[wgLanguage]["mari"],
	headnameclass : "message-data-name",
	timeclass : "message-data-time",
	bodyclass : "message my-message"
};
var wgMsgAgent = {
	position : "",
	headclass : "message-data",
	img : wgServer+"/"+wgImagePath+"/"+ wgImage["agent"],
	name : wgSystem[wgLanguage]["agent"],
	headnameclass : "message-data-name",
	timeclass : "message-data-time",
	bodyclass : "message my-message"
};
var wgMsgCustomer = {
	position : "right",
	headclass : "message-data  align-right",
	img : wgServer+"/"+wgImagePath+"/"+ wgImage["customer"],
	name : wgSystem[wgLanguage]["customer"],
	headnameclass : "message-data-name",
	timeclass : "message-data-time",
	bodyclass : "message other-message float-right" 
};
var tagList = "li",tagDiv = "div",tagImg = "img",tagSpan = "span";
var timeoutEng  = 4500;
var timeReadCsv = 500;
var timeChSelect = 180000;
var prodIntention = [];
var webSystax = ["http://","https://","\\.co","\\.th","www\\."];
var ewttime = 0;  //3600
var bul = 0;
var listproduct = [{id:"TMH",	value:"TrueMoveH"},
	{id:"TVS",	value:"TrueVision"},
	{id:"TOL",	value:"TrueOnline"},
	{id:"CVG",	value:"TrueConvergent"},
	];
var internet = true;
var userintention = "";
var url1 = "";
var timeSms = 30000;
var timehis = 3;
var titlenoti = "ทดสอบ";
var bodynoti = "ระบบ";
var timerestartchat = 1000;
var timereload = 1000;
var agentjoin = false;
var scrolltext = true;
var checklist = {
    "whilelist": [
	{
			"header": "fff15080",
			"type": "audio/vnd.dlna.adts",
	},
	{
			"header": "424df63",
			"type": "image/bmp",
	},
	{
			"header": "22416374",
			"type": "application/vnd.ms-excel",
	},
	{
			"header": "504b34",
			"type": "New Microsoft Word Document.doc",
	},
	{
			"header": "504b34",
			"type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	},
	{
			"header": "47494638",
			"type": "image/gif",
	},
	{
			"header": "3c21444f",
			"type": "text/html",
	},
	{
			"header": "3c68746d",
			"type": "text/html",
	},
	{
			"header": "ffd8ffe0",
			"type": "image/jpeg",
	},
	{
			"header": "4944334",
			"type": "audio/mp3",
	},
	{
			"header": "25504446",
			"type": "application/pdf",
	},
	{
			"header": "89504e47",
			"type": "image/png",
	},
	{
			"header": "504b34",
			"type": "application/vnd.ms-powerpoint",
	},
	{
			"header": "504b34",
			"type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	},
	{
			"header": "49492a0",
			"type": "image/tiff",
	},
	{
			"header": "2d206d61",
			"type": "text/plain",
	},
	{
			"header": "68656c6c",
			"type": "text/plain",
	},
	{
			"header": "52494646",
			"type": "audio/wav",
	},
	{
			"header": "3026b275",
			"type": "video/x-ms-wmv",
	},
	{
			"header": "504b34",
			"type": "application/vnd.ms-excel",
	},
	{
			"header": "504b34",
			"type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	},
]};
var tokendownload = "";
var tokenhistory = "";
var expirytoken = false;
var Hisuser = "histest";
var Hispass = "password";
var verify = "Z25z";
var checkfiletype = false;