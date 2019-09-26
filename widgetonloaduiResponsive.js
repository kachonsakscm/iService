	var paramUrl = {};
    var langweb ;	
	var dateMsg = "";
	var dataMessage = {};
	var dataFunction = {};
	var oChat;
	var oChatStart = false;
	var timeEng;
	var click = false;	
	var SplashMes = [];
	var isewt = false;
	var end = false;
	var selecInten = false;
	var SmsTime;
	var firstmessage = true;
	var chanelselect = true;
	var valcookie = {};
	var aa="";
	window.onload = function() {
		
		document.getElementById("formchat").style.display = "block";
		getpara();
		
		// $("#formchat").fadeIn();
		
		// if(window.innerWidth <= 1000)
		// {
			// alert("มือถือ");
		// }
		for(var i=0;i<wgScript.length;i++){
			var oScript = wgScript[i],oTag;
			if(wgAction.getElementById(oScript.id)) return;
			oTag = wgAction.createElement(oScript.type); oTag.id = oScript.id;
			if(oScript.type == "script"){
				oTag.src = oScript.path;
			} else if(oScript.type == "link"){
				oTag.type = 'text/css';oTag.rel = 'stylesheet';oTag.href = oScript.path; 
			}
			wgAction.head.appendChild(oTag);	
			
		}
		
		setTimeout(function(){
			readConfig(wgLanguage);
			processemoji(emoji);
			checkCookie();	
			openForm();
		},timeReadCsv);
			
				
	}
	function openweb(urlweb){
		 alert("เข้านะ"+urlweb);
		 
		window.open(urlweb, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			reloadWeb();
		}
		
	}
	
	function ClearCookie() {
		chat="";		
		  var d = new Date();		
		  var b = new Date();		
		  d.setTime();		
		  b.setTime(b.getTime() );	  
		  var expires = "expires=" + d.toGMTString();		
		  var expiresb = "expires=" + b.toGMTString();			
		  document.cookie ="";		
	}		
			
	function setCookie(cname,cvalue,exdays) {		
		  var d = new Date();		
		  var b = new Date();		
		  d.setTime(d.getTime() + (exdays*24*60*60*1000));		
		  b.setTime(b.getTime() );		
		  var expires = "expires=" + d.toGMTString();		
		  var expiresb = "expires=" + b.toGMTString();			
		  document.cookie = "UserId" + "=" + UserId + "," +"ChatId" + "=" + ChatId + "," +"SecureKey" + "=" + SecureKey+ "," +"Alias" + "=" + Alias + "," +"TranscriptPosition" + "=" + TranscriptPosition + "," +cname + "=" + cvalue + ";" + expires + ";path=/";	
			
	}		
	function getCookie(cname) {		
		  var name = cname + "=";				
		  var decodedCookie = decodeURIComponent(document.cookie);		
		  var ca = decodedCookie.split(';');
		  var c = "";		
		  for(var i = 0; i < ca.length; i++) {		
			  if(ca[i].search("UserId")>=0)		
			  {		
				  c = ca[i];		
				  c = c.substring(0);	
			  }		
			// while (c.charAt(0) == ' ') {		
			  // c = c.substring(1);	
			// }		
			if (c.indexOf(name) == 0) {				
			  return c.substring(name.length, c.length);		
			}		
		}		
		  if(c.search("UserId") >= 0)		
		  {			
			  return c;		
		  }else		
		  {				
			  return "";		
		  }		
		  		
		}		
	function checkCookie() {		
		  user=getCookie("username");	
		    if (user != "") {		
				user = user.split(',');			
				for(var j=0;j<user.length; j++)		
				{		
					var mark = 0;		
					mark = user[j].search("=");			
					valcookie[j]=user[j].substring(mark+1);		
				}		
				UserId = valcookie[0];		
				ChatId = valcookie[1] ;		
				SecureKey = valcookie[2] ;		
				Alias = valcookie[3] ;		
				TranscriptPosition = valcookie[4] ;		
				chat = "ChatCookie";		
				// openForm();	
				
			}else {		
				 // user = "ChatCookie";			
				 // setCookie("username", user, 0.00105);		
			 }		
	}
	
	function getpara(){
		var url=decodeURIComponent(window.location.href).replace( /\+/g, ' ' );
		 alert(url);
		var urlStep1 = url.split("?");
		if(urlStep1.length > 1){
			var urlStep2 = urlStep1[1].split("&");
			urlStep2.forEach(function(e) {
			var temp = e.split("=");
			paramUrl[temp[0]] = temp[1]; 
			}); 
		}
		 $("input[id=Service_number]").val(paramUrl['service_id']);
		//$("input[name=Service_number]").val("0820891926");
		userintention = paramUrl['UserIntention'];
		
		if(paramUrl['Channel'] != "")
		{
			var channel = "";
			channel = $("input[id=SubmitterSourceName]").val();
			
			if(paramUrl['Channel'] == "web")
			{
				
				$("input[id=SubmitterSourceName]").val(channel+paramUrl['Channel']);
			}
			else
			{
				$("input[id=SubmitterSourceName]").val(channel+"app");
			}
		}
		// langweb  = paramUrl["ln"];
		// if(langweb != null)
		// {
			
			// langweb = langweb.toUpperCase();
			// wgLanguage = langweb;
		// }
	}
	function readConfig(lang){
		wgLanguage = lang;
		document.getElementById("messagechat").placeholder = wgSystem[wgLanguage]["messageresponse"]["Textsent"];
		// readWgMessageClient(lang,"messageresponse");
		// readWgMessageClient(lang,"userintention");
		
		//readWgFunction();
	}
	function openForm(){
		
		firstmessage = true;
		$("#Product").val("");
		$("#user_intent").val("");
		$("input[name=Subject]").val("");
		$("#GCTI_LanguageCode").val("");
		document.getElementById("formchat").style.display = "block";
		selecInten = false;
		// $('#uploadfile').prop('disabled', true);
		$('#messagechat').prop('disabled', false);	
		$('#btn-Send').prop('disabled', false);		
		// $('#btn-emoji').prop('disabled', false);
		document.getElementById("btn-emoji").disabled = false;
		if(!$("#"+wgChatboxId).hasClass("hide")){
			return;	
		}	
		document.getElementById("messagechat").placeholder = wgSystem[wgLanguage]["messageresponse"]["Textsent"];
		$("#"+wgChatboxId).removeClass("hide");
		if(chat != "ChatCookie")
		{
			createMessage(wgMsgMari,wgSystem[wgLanguage]["messageresponse"]["Greeting"]);
			if(wgLanguage == 'TH')
			{
				createBtnInChat(wgBtnEng);
				timeEng = setTimeout(function(){ afterSelectLanguage();}, timeoutEng);
			}
			else
			{
				 afterSelectLanguage();
			}
		}else if(chat == "ChatCookie")
		{
			requestChat();
		}	
	}
	
	function reloadWeb(){
		window.location.reload(true);
	}
	
	function afterSelectLanguage(){
		removeBtnInChat(wgBtnEng["id"]);
		var isWork = checkedtimeworking();
		if(!isWork && wgLanguage == "EN"){
			createMessage(wgMsgMari,wgSystem[wgLanguage]["messageresponse"]["Outofwork"]);
			$('#btn-Send').prop('disabled', true);
			// $('#uploadfile').prop('disabled', true);
			document.getElementById("btn-emoji").disabled = true;
			$('#messagechat').prop('disabled', true);
			return false;
		}		
		else{
			setTimeout(function(){
				var userIntent = createUserIntention(wgSystem[wgLanguage]["userintention"]);
				displayUserIntention(wgMsgMari,userIntent);
				// createBtnInChat(wgBtnRequestChat);
				// createBtnSelect(wgBtnQ,wgBtnCancelQ,wgBtnEmail);
			},timeReadCsv);
		}
		
	}
	
	function createMessageExternal(msgFrom,msgText){
      createDateMsg();
      var liObj = document.createElement('li');
      liObj.id = "li"+document.getElementById("ul-history").childNodes.length;
      liObj.innerHTML = "</div><center><div class='message-smallbox'><div class='message-smallbox-head'>"+msgFrom+"  |  "+dateMsg+"</div><div class='message-smallbox-body'>"+msgText+"</div></div></center>";
      document.getElementById("ul-history").appendChild(liObj);     
      focusScroll();
	}
	
	
	
	function clearTimeEng(){
		clearTimeout(timeEng);
	}
	
	function closeForm(data){
		end = true;
		if(oChatStart){
			openConfirmEnd(data);
		} else{
			clearChatbox();
			document.getElementById("emoji-chat").style.display = "none";
			click=false;
		}
	}
	
	function clearChatbox(){
		// closeConfirmEnd();
		// alert("เข้าแล้วนะ");
		// $(".comfirm-end-background").removeClass("hide");
			// $(".comfirm-end-box").removeClass("hide");
			// $('.comfirm-end-inside span').text(data);
			// $('.comfirm-end-inside button[name="btn-cancel"]').text(wgSystem[wgLanguage]["messageresponse"]["btn_ok"]);
			// document.getElementById("btn-end").style.display = "none";
			// document.getElementById("btn-cancel").style.display = "block";
		clearTimeEng();
		if(internet == true)
		{
			 closeConfirmEnd();	
		}
		wgLanguage = "TH";
		readConfig(wgLanguage);
		isewt = false;
		onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["iserviceendchat"]);
		// $("#wgChatbox").addClass("hide");
		// $("#ul-history").empty();
	}
	
	function clickemoji(){
		if(click == false){
			document.getElementById("emoji-chat").style.display = "block";
			click=true;
		}
		else{
			document.getElementById("emoji-chat").style.display = "none";
			click=false;
		}
		
	}
	
	function openConfirmEnd(data){
		$(".comfirm-end-background").removeClass("hide");
		$(".comfirm-end-box").removeClass("hide");
		if(data == "end")
		{	
			
			$('.comfirm-end-inside span').text(wgSystem[wgLanguage]["messageresponse"]["ChatEndQuestion"]);
			$('.comfirm-end-inside button[name="btn-cancel"]').text(wgSystem[wgLanguage]["messageresponse"]["btn_cancel"]);
			$('.comfirm-end-inside button[name="btn-end"]').text(wgSystem[wgLanguage]["messageresponse"]["btn_end"]);
			$('#btn-email').hide();
			$('#btn-end').show();
			//$('#btn-cancel').show();
			$('#btn-cancel').css('display', 'inline-block');
			
		}
		else {
			
			$('.comfirm-end-inside span').text(wgSystem[wgLanguage]["messageresponse"]["CancelChatEnd"]);
			$('.comfirm-end-inside button[name="btn-cancel"]').text(wgSystem[wgLanguage]["messageresponse"]["btn_cancel"]);
			$('.comfirm-end-inside button[name="btn-end"]').text(wgSystem[wgLanguage]["messageresponse"]["btn_end"]);
			$('#btn-end').show();
			$('#btn-cancel').css('display', 'inline-block');
			//$('#btn-cancel').show();
		}
		// else{
			// $('.comfirm-end-inside span').text(dataMessage["EmailChatEnd"]);	
			// $('.comfirm-end-inside button[name="btn-cancel"]').text("Cancel");
			// $('.comfirm-end-inside button[name="btn-email"]').text("Send Email");
			
		// }
		
		
	}
	
	function onMessageAlert(data){
		if(internet || firstmessage)
		{	$(".comfirm-end-background").removeClass("hide");
			$(".comfirm-end-box").removeClass("hide");
			$('.comfirm-end-inside span').text(data);
			$('.comfirm-end-inside button[name="btn-cancel"]').text(wgSystem[wgLanguage]["messageresponse"]["btn_ok"]);
			document.getElementById("btn-end").style.display = "none";
			document.getElementById("btn-cancel").style.display = "block";
		}
		else if(!internet)
		{
			$(".comfirm-end-background").removeClass("hide");
			$(".comfirm-end-box").removeClass("hide");
			$('.comfirm-end-inside span').text(data);
			$('.comfirm-end-inside button[name="btn-cancel"]').text(wgSystem[wgLanguage]["messageresponse"]["btn_ok"]);
			document.getElementById("btn-end").style.display = "none";
			document.getElementById("btn-cancel").style.display = "none";
		}
		//$('#btn-cancel').show();
		
	}
	
	function closeConfirmEnd(){
		$(".comfirm-end-background").addClass("hide");
		$(".comfirm-end-box").addClass("hide");
	}
	
	function createBtnReqChat(){
		var liObj = document.createElement('li');
		liObj.id = "li"+document.getElementById("ul-history").childNodes.length;
		liObj.innerHTML = "<center><button type='button' class='btn-in-chat' id='btn-reqchat' onclick='requestChat();'>Request Chat</button></center>";
		document.getElementById("ul-history").appendChild(liObj);     
		focusScroll();
	}
	
	function sendMsg(){
		
		clearTimeout(timeEng);
		removeBtnInChat(wgBtnEng["id"]);
		//afterSelectLanguage();
		var text = $('textarea[name=messagechat]').val().replace(/\n/g, "");
		console.log(text);
		$('textarea[name=messagechat]').val("");
		if(text.trim() == ""){
			return false;
		}
		setTimeout(function(){			
			if(!oChatStart){
				$("input[name=Subject]").val(text);
				 if(firstmessage == true)
				 {
					 createMessage(wgMsgCustomer,text);
					 
				 }
				 else
				 {
					
				 }
				$("#GCTI_LanguageCode").val("");
				requestChat();
			} else{
						oChat.sendMessage(text);
					
			}
		},timeReadCsv);
		
	}
	
	function isBlankSetAnonymous(val){
		var ret = val;
		if( ret == "") ret = "Anonymous";
		return ret;
	}
	
	
	
	function selectProductService(pin,txt){
		if(selecInten == false)
		{
			var v = pin.split("-");
			createMessage(wgMsgCustomer,txt);
			$("#Product").val(v[0]);
			$("#user_intent").val(v[1]);
			$("input[name=Subject]").val(txt);
			$("#GCTI_LanguageCode").val(wgLanguage);
			firstmessage = true;
			requestChat();
			selecInten = true;			
			//oChat.sendMessage(txt);
		}
		
	}
	
	function selectEmoji(pin,txt){
		// var x = document.getElementById("messagechat").val();
		// var x = $("textarea[name=messagechat]").val();	
		var x = document.getElementById("messagechat").value
		 document.getElementById("messagechat").value = x+txt;
		 
		// $("#messagechat").val(x+txt);
		// document.frmMain.messagechat.focus();		
		$("#messagechat").focus();
	}

	function requestChat(){
		if(chat != "ChatCookie")
		{
			$("input[name=firstName]").val(isBlankSetAnonymous($('input[name=firstName]').val()));
			$("input[name=lastName]").val(isBlankSetAnonymous($('input[name=lastName]').val()));
			var formchat = $('#formchat').serialize();
			oChat = new ChatFactory({
				<!--baseURL: "https://galb.truecorp.co.th",-->  //PRODUCTION URL
				<!--baseURL: "https://galb-dev.truecorp.co.th",-->	//DEV URL
				baseURL: "https://172.16.56.134:8443",	//UAT URL
				chatServiceName: "gms-chat",
				useCometD: false,
				verbose: true,
				debug:true,
				onStarted: onStarted,
				onEnded: onEnded,
				<!-- onFileSent: onFileSent, -->
				onMessageReceived: onMessageReceived,
				onFileReceived: onFileReceived,
				onError: onError,
				onDownloadFile:onDownloadFile,
				onDownloadFileIE:onDownloadFileIE,
				onMessageAlert:onMessageAlert
			});
			// Start the chat using the variable in form.
			alert(formchat);
			oChat.startChat(formchat);
			createMessage(wgMsgMari,wgSystem[wgLanguage]["messageresponse"]["ChatStarted"]);
			setTimeout(function(){
				if(firstmessage == true)
				{
					oChat.sendMessage($("input[name=Subject]").val());
					
				}
			}, 2000);  
		}else if(chat == "ChatCookie")
		{
			var formchat = "ChatCookie";
			oChat = new ChatFactory({
				<!--baseURL: "https://galb.truecorp.co.th",-->  //PRODUCTION URL
				<!--baseURL: "https://galb-dev.truecorp.co.th",-->	//DEV URL
				baseURL: "https://172.16.56.134:8443",	//UAT URL
				chatServiceName: "gms-chat",
				useCometD: false,
				verbose: true,
				debug:true,
				onStarted: onStarted,
				onEnded: onEnded,
				<!-- onFileSent: onFileSent, -->
				onMessageReceived: onMessageReceived,
				onFileReceived: onFileReceived,
				onError: onError,
				onDownloadFile:onDownloadFile,
				onDownloadFileIE:onDownloadFileIE,
				onMessageAlert:onMessageAlert
			});
			// Start the chat using the variable in form.
			alert(formchat);
			oChat.startChat(formchat);
		}
		// $('textarea[name=messagechat-re]').val($("input[name=Subject]").val());
		// var text = $('textarea[name=messagechat-re]').val();
		// oChat.sendMessage(text);
		// firstmessage = true;
		// sendMsg();
		
		
	}
	
	// The Chat class will call onStarted when the chat session has been successfully created
	function onStarted() {
		oChatStart = true;
	}
	
	// The Chat class will call onEnded when the chat session has ended
	function onEnded() {
		oChatStart = false;
	}
  
  function onMessageReceived(typeFrom,typeMsg,nickname,textMsg,chatend) {
		
		var msg = "";
		
		if ( typeMsg === 'Message' || typeMsg === 'Message.Text' ) {
			var n = textMsg.search("http");
			if(n>1)
			{
				var	texth = textMsg.substring(0, n)
				var urlweb = textMsg.substring(n,textMsg.length);	
				var m = urlweb.search(" ");
				var textn = urlweb.substring(m,textMsg.length);
				if(m > 0)
				{
					urlweb = urlweb.substring(0, m);
					// msg = ""+texth+"<a href='"+urlweb+"' target='_blank' >"+urlweb+"</a>"+textn+"";
					msg = ""+texth+"<a onclick='openweb('"+urlweb+"')>"+urlweb+"</a>"+textn+"";
					
				}
				else
				{
					urlweb = urlweb.substring(0, textMsg.length);
					//msg = ""+texth+"<a href='"+urlweb+"' target='_blank' >"+urlweb+"</a>";
				    msg = ""+texth+"<a onclick=openweb('"+urlweb+"')>"+urlweb+"</a>";
					
				}
				// msg = textt+" "+urlweb;
			}
			else if(n>=0 && n<2){
			var urlweb = textMsg.substring(n,textMsg.length);	
				var m = urlweb.search(" ");
				var textn = urlweb.substring(m,textMsg.length);
				if(m > 0)
				{
					urlweb = urlweb.substring(0, m);
					//msg = "<a href='"+urlweb+"' target='_blank' >"+urlweb+"</a>"+textn+"";	
					msg = "<a onclick=openweb('"+urlweb+"')>"+urlweb+"</a>"+textn+"";
					
				}
				else
				{
					urlweb = urlweb.substring(0, textMsg.length);
					 msg = "<a href='"+urlweb+"' target='_blank' >"+urlweb+"</a>";	
				 // msg = "<a onclick=openweb('"+urlweb+"')>"+urlweb+"</a>";
					// window.open(urlweb,'_blank','toolbar=0,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400');
				}
			}
			else{
			msg = textMsg;
			}
		} else if ( typeMsg === 'ParticipantJoined' || typeMsg === 'Notice.Joined') {
			msg = wgSystem[wgLanguage]["messageresponse"]["Joinedchat"];
			$('#uploadfile').prop('disabled', false);
		} else if ( typeMsg === 'ParticipantLeft' || typeMsg === 'Notice.Left') {
			msg = wgSystem[wgLanguage]["messageresponse"]["Leftchat"];
		} else if ( typeMsg === 'PushUrl' || typeMsg === 'PushUrl.Text' ) {
			// msg = "<a href='"+textMsg+"'>"+textMsg+"</a>";
			
			msg = "<a onclick=openweb('"+textMsg+"') >"+textMsg+"</a>";
		} else if ( typeMsg === 'Notice' || typeMsg === 'Notice.Text' ) {
			msg = textMsg;
		}
		// msg.length
		if(typeFrom === "Client" && typeMsg === "TypingStarted") return;
		if(typeFrom === "Client" && typeMsg === "TypingStopped") return;
		if(typeFrom === "Client" && msg === "read-confirm") return;
    
    if(typeFrom === "Agent" && typeMsg === "TypingStarted"){
		if(!document.getElementById('liTyping')){
			typingMessage(wgMsgAgent,wgSystem[wgLanguage]["messageresponse"]["typing"]);
		}
      return false;
    }
    
    if(typeFrom === "Agent" && typeMsg === "TypingStopped"){
		removeTyping();
		// $('#li-btn-selecter').empty();
		return false;
    }
    
		if(typeFrom === "Client"){
			if(msg == wgSystem[wgLanguage]["messageresponse"]["Joinedchat"]  )
				{
					$('#uploadfile').prop('disabled', false);
				 	return;
				}
				if(firstmessage == true)
				{
					firstmessage = false;
				}
			 else if(firstmessage == false)
				 {
					
					createMessage(wgMsgCustomer,msg); 
				 }
			
		} else if(typeFrom === "Agent"){
			if(msg == wgSystem[wgLanguage]["messageresponse"]["Leftchat"] && chatend == true){
				removeTyping();
				$('#btn-Send').prop('disabled', true);
				// $('#uploadfile').prop('disabled', true);
				$('#btn-emoji').prop('disabled', true);
				document.getElementById("btn-emoji").disabled = true;
				$('#messagechat').prop('disabled', true);
				createMessage(wgMsgAgent,msg);
				ClearCookie();
				setTimeout(function(){
					
					createBtnInChat(wgBtnChat);
					$('#btn-startchat').text("เริ่มต้นสนทนาอีกครั้ง")
				}, 2000);  
				
			}
			if(isewt == true)
			{	
				clearTimeout(timeselecter);
				if(document.getElementById('li-btn-selecter') != null && chanelselect == true )
				{
					document.getElementById('li-btn-selecter').parentNode.removeChild(document.getElementById('li-btn-selecter'));
					createMessage(wgMsgAgent,msg);
					isewt = false;
					chanelselect = false;
				}else if($("#li-btn-sms") && isewt && chanelselect == false){
					clearTimeout(SmsTime);
					if(document.getElementById('li-btn-sms') != null){
					document.getElementById('li-btn-sms').parentNode.removeChild(document.getElementById('li-btn-sms'));	
					}
					createMessage(wgMsgAgent,msg);
					isewt = false;
					
				}				
			}
			
			else if(msg != wgSystem[wgLanguage]["messageresponse"]["Leftchat"] && chatend == false)
			{
				removeTyping();
				createMessage(wgMsgAgent,msg);
			}
			// $('#li-btn-selecter').empty();
			
		} else if(typeFrom === "External"){
			
			if(msg.search("VQ_")>=0)
			{	var obj= {};
				obj = msg.split(",");
				alert(obj[1]);
				 if(obj[1] > ewttime)   //ewttime
				 {
					timefilter(msg);
					isewt = true;
				 }
			}else if(msg == wgSystem[wgLanguage]["messageresponse"]["Joinedchat"]){
				return;
			}else{
				if(!isewt && msg != "")
				{
					createMessage(wgMsgMariload,msg);
				}
				else
				{
					SplashMes.push(msg);
				}
			}
			
			
			
			 
		}
	}
  
	function onFileReceived(typeFrom,nickname,udata) {
		
		var msg = "";
		var filesize = (parseInt(udata["file-size"])/1024).toFixed(2);
		//message : {"from":{"nickname":"agent","participantId":2,"type":"Agent"},"index":10,"text":"00D25C4FD5580141","type":"FileUploaded","utcTime":1548735832000,"userData":{"file-document-id":"0002KaE4JJ9Y00BX","file-source":"ucs","file-upload-path":"C:\\Users\\Administrator\\Desktop\\New Text Document.txt","file-id":"00D25C4FD5580141","file-upload-type":"file-system","file-size":"438","file-name":"New Text Document.txt"}}
		msg = udata["file-name"]
			+ "<br/>"
			+ filesize+" KB"
			+ "<br/>"
			+ "<center>"
			+ "<button type='button' class='btn-in-chat-download' "
			+ "value='"+udata["file-id"]+"' "
			+ "onclick='downloadfile(this.value,\""+udata["file-name"]+"\")' "
			+ ">"+wgSystem[wgLanguage]["messageresponse"]["DownloadButton"]+"</button>"
			+ "</center>"
			;
		
		if(typeFrom === "Client"){
			createMessage(wgMsgCustomer,msg); 
		} else if(typeFrom === "Agent"){
			removeTyping();
			createMessage(wgMsgAgent,msg);
		} else if(typeFrom === "External"){
			createMessage(wgMsgMari,msg);
		}
	}
	
	function downloadfile(fileid,filename){
		oChat.downloadfileChat(fileid,filename);
	}
	// function onDownloadFile(data,filename){
	function onDownloadFile(data,filename,userId,secureKey,alias,baseURL,chatServiceName,chatId,fileId){
		
		
		if(paramUrl['Channel'] == "web")
		{
			alert("เข้าดาวน์โหลดเว็บ");
			 var ev = document.createEvent("MouseEvents");
			 ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			 var a = document.createElement('a');
			 var spt = filename.split(".");
			 var blob = data;
			 var url = window.URL.createObjectURL(blob);
			 a.href = url;
			 a.download = filename;
			 a.dispatchEvent(ev);
			 setTimeout(function(){
				 window.URL.revokeObjectURL(url);
			 }, 2000);  
		}else
		{
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			alert("เข้าดาวน์โหลดแอนดรอย");
			 openweb("https://galb.truecorp.co.th/iservice/downloadfile.html?userId='"+userId+"'&secureKey='"+secureKey+"'&alias='"+alias+"'&baseURL='"+baseURL+"'&chatServiceName='"+chatServiceName+"'&chatId='"+chatId+"'&fileId='"+fileId+"'&fileName='"+fileName+"'");			 
			}else
			{
			alert("เข้าดาวน์โหลดไอโฟน4");
			 var downloadurl = 'https://galb.truecorp.co.th/iservice/downloadfile.html?userId='+userId+'&secureKey='+secureKey+'&alias='+alias+'&baseURL='+baseURL+'&chatServiceName='+chatServiceName+'&chatId='+chatId+'&fileId='+fileId+'&fileName='+filename;
			 // window.open(downloadurl, "_blank");
			 // var windowReference = window.open(downloadurl, "_blank");
			 // myService.getUrl().then(function(downloadurl) {
				 // windowReference.location = downloadurl, "_blank";
			// });
			function openTab(url) {
			// Create link in memory
			var a = window.document.createElement("a");
			a.target = '_blank';
			a.href = url;

			// Dispatch fake click
			var e = window.document.createEvent("MouseEvents");
			e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);
};
			openTab(downloadurl);
			 reloadWeb();
			}
		 } 
		// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			// alert("เข้าดาวน์โหลดมือถือ");
			 // // openweb("http://192.168.43.48/downloadfile.html?userId='"+userId+"'&secureKey='"+secureKey+"'&alias='"+alias+"'&baseURL='"+baseURL+"'&chatServiceName='"+chatServiceName+"'&chatId='"+chatId+"'&fileId='"+fileId+"'&fileName='"+fileName+"'");
			 // // openweb('http://192.168.43.48/downloadfile.html');
			 
		// }
		// else
			// {
			// // var ev = document.createEvent("MouseEvents");		
			// // ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);		
			// // var a = document.createElement('a');
			// // var spt = filename.split(".");
			// // var blob = data;
			//alert(window.URL.createObjectURL());
			// alert("url4 : "+url1);
			// var url = (window.URL || window.webkitURL || window || {} || URL).createObjectURL(data);
			//window.URL = window.URL || window.webkitURL;
			//var url = window.navigator.msSaveBlob(blob, filename);

				// // var url = window.URL.createObjectURL(blob);
			
			 
			// url1 = data;
			// var url2 = atob(blob);
			// // a.href = url;
			// // a.download = filename;
			// // a.dispatchEvent(ev);
			
			// // setTimeout(function(){
				// // window.URL.revokeObjectURL(url);
			// // }, 2000);  
		// }
		
		
		
	}
	
	function onDownloadFileIE(data,filename){
		// // var ev = document.createEvent("MouseEvents");
		// // ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		// var a = document.createElement('a');
		// var spt = filename.split(".");
		// var blob = new Blob([data],{type: wgMimeType[spt[1]]});
		// var url = window.URL.createObjectURL(blob);
		// a.href = url;
		// a.download = filename;
		// a.click();
		// // a.dispatchEvent(ev);
		// // setTimeout(function(){
		// window.URL.revokeObjectURL(url);
		// // }, 2000);  
		window.navigator.msSaveBlob(data, filename);
		
	}
	// The chat class will call onError when an error occurs for any reason
	function onError(err) {
		//alert(err);
	}
	
	function endChat(){
		
		if(end == true)
		{
			var val={DisconnectReason:"Chat_UserEnd"};
			oChat.updateUserDataChat(val);
			end = false;
		}
		else{
			var val={DisconnectReason:"Chat_ChannelSelectorTimeout"};
			oChat.updateUserDataChat(val);
			
		}
		oChat.endChat();
		clearChatbox();
		oChatStart = false;
		wgLanguage = "TH";
		readConfig(wgLanguage);
		document.getElementById("emoji-chat").style.display = "none";
		click=false;
		document.getElementById("wg-emoji").innerHTML=""; 
		if(document.getElementById('li-btn-selecter') != null )
		{
			document.getElementById('li-btn-selecter').parentNode.removeChild(document.getElementById('li-btn-selecter'));
			
		}else if(document.getElementById('li-btn-sms') != null){
			document.getElementById('li-btn-sms').parentNode.removeChild(document.getElementById('li-btn-sms'));	
		}				
		createMessage(wgMsgAgent,wgSystem[wgLanguage]["messageresponse"]["Leftchat"]);
		createMessage(wgMsgCustomer,wgSystem[wgLanguage]["messageresponse"]["Leftchat"]);
		$('#btn-Send').prop('disabled', true);
		$('#uploadfile').prop('disabled', true);
		$('#btn-emoji').prop('disabled', true);
		document.getElementById("btn-emoji").disabled = true;
		$('#messagechat').prop('disabled', true);
		
		ClearCookie();
		
	}
	
	$(document).on('keypress','textarea[name=messagechat]',function(e) { 
		if ( e.which == 13 ) {
			e.preventDefault();sendMsg();
		} 
	});
	
	function timefilter(dataArr) {
		// createMessage(wgSelect,text); 
		// createBtnInChat("chselect");
		
		var obj = {};
		var x ;
		obj = dataArr.split(",");
		 if(obj[1] > 0)
		 {	
			x = obj[1]/60;
			x = Math.round(x);
			var messageewt = wgSystem[wgLanguage]["messageresponse"]["EWT"].replace("_X_",x);
			createMessage(wgMsgMari,messageewt);	
			createBtnSelect(wgBtnQ,wgBtnCancelQ,wgBtnEmail);
			
			
		 }
		// else
		// {
			// createMessage(wgMsgMari,msg);
		// }
	}
	function openemail() {
		// createEmail(wgMsgMari,wgSystem[wgLanguage]["messageresponse"]["AskSMS"]);
		window.open("http://www3.truecorp.co.th/contact_us/cm", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
		
	}
	function selectq() {
		// $('#li-btn-selecter').empty();
		chanelselect = false;
		document.getElementById('li-btn-selecter').parentNode.removeChild(document.getElementById('li-btn-selecter'));
		
		// isewt = false;
		createSms(wgMsgMari,wgSystem[wgLanguage]["messageresponse"]["AskSMS"]);
		 SmsTime = setTimeout(function(){
				document.getElementById('li-btn-sms').parentNode.removeChild(document.getElementById('li-btn-sms'));
				// for(var j=0;j<SplashMes.length;j++){		
					createMessage(wgMsgMariload,SplashMes[0]);					
				// }		
						
				clearTimeout(timeselecter);
				
			},timeSms);
	}
	
	$(document).on('keydown','textarea[name=messagechat]',function(e) { 
		if(oChatStart){
			oChat.startTypingChat();
		}
	});
	
	// $(document).on('keyup','textarea[name=messagechat]',function(e) { 
		// if(oChatStart){
			// oChat.stopTypingChat();
		// }
	// });
	
	function attach(fileup){	
		oChat.uploadfileChat(fileup);
	}
	
	function Selectewt() {
		var str = "Visit W3Schools!"; 
		var n = str.search("W3Schools");
		document.getElementById("demo").innerHTML = n;
	}
	function submitSms(){
		isewt = false;
		var smsval={SMSContactNumber:$('#sms').val().trim()};
		oChat.updateUserDataChat(smsval);
		document.getElementById('li-btn-sms').parentNode.removeChild(document.getElementById('li-btn-sms'));
		for(var j=0;j<1;j++){		//SplashMes.length
			createMessage(wgMsgMariload,SplashMes[j]);					}		
			isewt = false;		
			clearTimeout(timeselecter);
			clearTimeout(SmsTime);
	}
	
	
	