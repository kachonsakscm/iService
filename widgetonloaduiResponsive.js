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
	var handlefromline = 0;
	var noti = "";
	var HistoryTime;
	var rehistory = 0;
	var serviceid = "" ;
	var fileName = [""];
	var dateold = "";
	
	window.onload = function() {
		
		document.getElementById("formchat").style.display = "block";
		getpara();
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
		 document.cookie = "UserId" + "=" + UserId + "," +"ChatId" + "=" + ChatId + "," +"SecureKey" + "=" + SecureKey+ "," +"Alias" + "=" + Alias + "," +"TranscriptPosition" + "=" + TranscriptPosition + "," +"rehistory" + "=" + rehistory + "," +"tokendownload" + "=" + tokendownload + "," +"tokenhistory" + "=" + tokenhistory + "," +"language" + "=" + wgLanguage + "," +cname + "=" + cvalue + ";" + expires + ";path=/";	
	
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
				rehistory = parseInt(valcookie[5]) ;
				tokendownload = valcookie[6];
				tokenhistory = valcookie[7];
				wgLanguage = valcookie[8];
				chat = "ChatCookie";		
				
			}else {			
			 }		
	}
	
	function getpara(){
		var url=decodeURIComponent(window.location.href).replace( /\+/g,'');
		  // alert(url);
		var urlStep1 = url.split("?");
		if(urlStep1.length > 1){
			var urlStep2 = urlStep1[1].split("&");
			urlStep2.forEach(function(e) {
			var temp = e.split("=");
			paramUrl[temp[0]] = temp[1]; 
			}); 
		}
		 if(paramUrl['service_id'])
		 {
			 $("input[id=Service_number]").val(paramUrl['service_id']);
			 serviceid = paramUrl['service_id'];
		 }
		userintention = paramUrl['UserIntention'];
		if(paramUrl['Channel'])
		{
			if(paramUrl['SubmitterSourceName'])
			{
				$("input[id=SubmitterSourceName]").val(paramUrl['SubmitterSourceName']+"_"+paramUrl['Channel']);
			}
			else
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
		}
		if(paramUrl['Product'])
		{
			$("#Product").val(paramUrl['Product']);
			handlefromline += 1;
		}
		else if(paramUrl['Product'] == "")
		{
			$("#Product").val("");
		}
		if(paramUrl['User_intent'])
		{
			$("#user_intent").val(paramUrl['User_intent']);
			handlefromline += 1;
		}
		else if(paramUrl['User_intent'] == "")
		{
			$("#user_intent").val("");
		}
		if(paramUrl['Subject'])
		{
			$("textarea[name=messagechat]").val(paramUrl['Subject'])
			handlefromline += 1;
		}
		else if(paramUrl['Subject'] == "")
		{
			$("textarea[name=messagechat]").val("");
		}
		if(paramUrl['Language'])
		{
			$("#GCTI_LanguageCode").val(paramUrl['Language']);
			handlefromline += 1;
		}
		else if(paramUrl['Language'] == "")
		{
			$("#GCTI_LanguageCode").val("");
		}		
		noti = paramUrl['noti_token'];
	}
	function readConfig(lang){
		wgLanguage = lang;
		document.getElementById("messagechat").placeholder = wgSystem[wgLanguage]["messageresponse"]["Textsent"];
	}
	function openForm(){
			createBtnInChathistory(wgBtntabmessagehistoryfirst);
			createMessagehistory(wgMsgCustomer,wgSystem[wgLanguage]["messageresponse"]["tabmessagenow"]); 
			end = false;
			firstmessage = true;
			document.getElementById("formchat").style.display = "block";
			selecInten = false;
			$('#messagechat').prop('disabled', false);	
			$('#btn-Send').prop('disabled', false);		
			document.getElementById("btn-emoji").disabled = false;
			document.getElementById("messagechat").placeholder = wgSystem[wgLanguage]["messageresponse"]["Textsent"];
			$("#"+wgChatboxId).removeClass("hide");
			if((chat != "ChatCookie" || !chat ) && (oChatStart == false || oChatStart == true))
			{
				removeBtnInChat(wgBtnChat["id"]);
				if(handlefromline == 4)
					{
						sendMsg();
					}
				else
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
				}
			}else if(chat == "ChatCookie")
			{
				if(rehistory > 0)
				{
				}
				HistoryTime = setTimeout(function(){
					$("textarea[name=messagechat]").val("");
					requestChat();
				},timehis);
			}	
			
		
	}
	
	function reloadWeb(){
		setTimeout(function(){
					window.location.reload(true);
				},3000);
	}
	
	function afterSelectLanguage(){
		removeBtnInChat(wgBtnEng["id"]);
		var isWork = checkedtimeworking();
		if(!isWork && wgLanguage == "EN"){
			createMessage(wgMsgMari,wgSystem[wgLanguage]["messageresponse"]["Outofwork"]);
			$('#btn-Send').prop('disabled', true);
			document.getElementById("btn-emoji").disabled = true;
			$('#messagechat').prop('disabled', true);
			return false;
		}		
		else{
			setTimeout(function(){
				var userIntent = createUserIntention(wgSystem[wgLanguage]["userintention"]);
				displayUserIntention(wgMsgMari,userIntent);
			},timeReadCsv);
		}
		
	}
	
	function createMessageExternal(msgFrom,msgText){
      createDateMsg();
      var liObj = document.createElement('li');
      liObj.id = "li"+document.getElementById("ul-history").childNodes.length;
      liObj.innerHTML = "</div><center><div class='message-smallbox'><div class='message-smallbox-head'>"+msgFrom+"  |  "+dateMsg+"</div><div class='message-smallbox-body'>"+msgText+"</div></div></center>";
      document.getElementById("ul-history").appendChild(liObj);     
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
		clearTimeEng();
		if(internet == true)
		{
			 closeConfirmEnd();	
		}
		isewt = false;
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
			$('#btn-cancel').css('display', 'inline-block');
			
		}
		else {
			
			$('.comfirm-end-inside span').text(wgSystem[wgLanguage]["messageresponse"]["CancelChatEnd"]);
			$('.comfirm-end-inside button[name="btn-cancel"]').text(wgSystem[wgLanguage]["messageresponse"]["btn_cancel"]);
			$('.comfirm-end-inside button[name="btn-end"]').text(wgSystem[wgLanguage]["messageresponse"]["btn_end"]);
			$('#btn-end').show();
			$('#btn-cancel').css('display', 'inline-block');
		}	
	}
	
	function onMessageAlert(data){
		
		if((internet || firstmessage) && dateold == "")
		{	
			$(".comfirm-end-background").removeClass("hide");
			$(".comfirm-end-box").removeClass("hide");
			$('.comfirm-end-inside span').text(data);
			$('.comfirm-end-inside button[name="btn-cancel"]').text(wgSystem[wgLanguage]["messageresponse"]["btn_ok"]);
			document.getElementById("btn-end").style.display = "none";
			document.getElementById("btn-cancel").style.display = "block";
		}
		else if(!internet && dateold == "")
		{	
			$(".comfirm-end-background").removeClass("hide");
			$(".comfirm-end-box").removeClass("hide");
			$('.comfirm-end-inside span').text(data);
			$('.comfirm-end-inside button[name="btn-cancel"]').text(wgSystem[wgLanguage]["messageresponse"]["btn_ok"]);
			document.getElementById("btn-end").style.display = "none";
			document.getElementById("btn-cancel").style.display = "none";
		}
		else if(dateold != "")
		{	
			$(".comfirm-end-background").removeClass("hide");
			$(".comfirm-end-box").removeClass("hide");
			$('.comfirm-end-inside span').text(data+dateold);
			$('.comfirm-end-inside button[name="btn-cancel"]').text(wgSystem[wgLanguage]["messageresponse"]["btn_ok"]);
			document.getElementById("btn-end").style.display = "none";
			document.getElementById("btn-cancel").style.display = "block";
		}
		
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
		var text = $('textarea[name=messagechat]').val().replace(/\\n/g,"\n");
		$('textarea[name=messagechat]').val("");
		if(text.trim() == ""){
			return false;
		}
		setTimeout(function(){			
			if(!oChatStart){
				$("input[name=Subject]").val(text);
				 if(firstmessage == true)
				 {
					 if(handlefromline != 4)
					{
						createMessage(wgMsgCustomer,text);
					}
					 
				 }
				 else
				 {
					
				 }
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
			focusScrollwgChatbox();
		}
		
	}
	
	function selectEmoji(pin,txt){	
		var x = document.getElementById("messagechat").value
		 document.getElementById("messagechat").value = x+txt;
	
		$("#messagechat").focus();
	}

	function requestChat(){
		if(chat != "ChatCookie")
		{
			$("input[name=firstName]").val(isBlankSetAnonymous($('input[name=firstName]').val()));
			$("input[name=lastName]").val(isBlankSetAnonymous($('input[name=lastName]').val()));
			var formchat = $('#formchat').serialize();
			oChat = new ChatFactory({
				baseURL: apiServer,//PRODUCTION URL
				chatServiceName: gmschat,
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
			oChat.startChat(formchat);
			createMessage(wgMsgMari,wgSystem[wgLanguage]["messageresponse"]["ChatStarted"]);
			setTimeout(function(){
				if(firstmessage == true)
				{
					oChat.sendMessage($("input[name=Subject]").val().replace(/\\n/g,"\n"));
					
				}
			}, 2000);  
		}else if(chat == "ChatCookie")
		{
			var formchat = "ChatCookie";
			oChat = new ChatFactory({
				baseURL: apiServer,//PRODUCTION URL
				chatServiceName: gmschat,
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
			
				oChat.startChat(formchat);
			if(rehistory > 0)
						{
							var elmnt = document.getElementById("chat-history");
							elmnt.scrollTop = 0;
						}
		}		
		
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
					msg = ""+texth+"<a onclick='openweb('"+urlweb+"')>"+urlweb+"</a>"+textn+"";
					
				}
				else
				{
					urlweb = urlweb.substring(0, textMsg.length);
				    msg = ""+texth+"<a onclick=openweb('"+urlweb+"')>"+urlweb+"</a>";
					
				}
			}
			else if(n>=0 && n<2){
			var urlweb = textMsg.substring(n,textMsg.length);	
				var m = urlweb.search(" ");
				var textn = urlweb.substring(m,textMsg.length);
				if(m > 0)
				{
					urlweb = urlweb.substring(0, m);
					msg = "<a onclick=openweb('"+urlweb+"')>"+urlweb+"</a>"+textn+"";	
				}
				else
				{
					urlweb = urlweb.substring(0, textMsg.length);
					msg = "<a href='"+urlweb+"' target='_blank' >"+urlweb+"</a>";	
				}
			}
			else{
			msg = textMsg;
			}
		} else if ( typeMsg === 'ParticipantJoined' || typeMsg === 'Notice.Joined') {


			if( typeFrom === "Agent")
			{
				// oChat.notiinapp(noti);
				agentjoin = true;
			}
			msg = wgSystem[wgLanguage]["messageresponse"]["Joinedchat"];
			$('#uploadfile').prop('disabled', false);
		} else if ( typeMsg === 'ParticipantLeft' || typeMsg === 'Notice.Left') {
			msg = wgSystem[wgLanguage]["messageresponse"]["Leftchat"];
		} else if ( typeMsg === 'PushUrl' || typeMsg === 'PushUrl.Text' ) {
			msg = "<a onclick=openweb('"+textMsg+"') >"+textMsg+"</a>";
		} else if ( typeMsg === 'Notice' || typeMsg === 'Notice.Text' ) {
			msg = textMsg;
		}
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
			if((msg == wgSystem[wgLanguage]["messageresponse"]["Leftchat"] && chatend == true)||(chatend == true)){
				removeTyping();
				$('#btn-Send').prop('disabled', true);
				$('#btn-emoji').prop('disabled', true);
				document.getElementById("btn-emoji").disabled = true;
				$('#messagechat').prop('disabled', true);
				createMessage(wgMsgAgent,msg);
				ClearCookie();
				setCookie("username", user, 0.00001);
				rehistory=0;
				setTimeout(function(){
					createBtnReChat(wgBtnChat);
					$('#btn-startchat').text(wgSystem[wgLanguage]["messageresponse"]["btniserviceendchat"]);
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
			
		} else if(typeFrom === "External"){
			
			if(msg.search("VQ_")>=0)
			{	var obj= {};
				obj = msg.split(",");
				
				 if(obj[1] > ewttime && chat != "ChatCookie")   //ewttime
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
  
	function onFileReceived(typeFrom,nickname,udata,statustype) {
		var msg = "";
		var filesize = (parseInt(udata["file-size"])/1024).toFixed(2);
		fileName.push(udata["file-name"]);
		var numfileName = fileName.length-1;
		msg = udata["file-name"]
			+ "<br/>"
			+ filesize+" KB"
			+ "<br/>"
			+ "<center>"
			// if(statustype)
			// {
				msg = udata["file-name"]
				+ "<br/>"
				+ filesize+" KB"
				+ "<br/>"
				+ "<center>"
				+ "<button type='button' class='btn-in-chat-download' "
				+ "value='"+udata["file-id"]+"' "
				+ "onclick=downloadfile(this.value,\""+numfileName+"\") "
				+ ">"+wgSystem[wgLanguage]["messageresponse"]["DownloadButton"]+"</button>"
				+ "</center>"
				;
			// }else
			// {
				// msg = udata["file-name"]
				// + "<br/>"
				// + filesize+" KB"
				// + "<br/><br/>"
				// + "<center>"
				// +"<font color='#ed1c24' size='3em'>"+wgSystem[wgLanguage]["messageresponse"]["Error-File-Types-Agent"]+"</font>"
				// + "</center>"
				// ;
			// }
			
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
		if(paramUrl['Channel'] == "web")
		{
			oChat.downloadfileChat(fileid,filename);
		}
		else
		{
			onDownloadFile(fileid,filename)
		}
	}
	function onDownloadFile(data,filename,userId,secureKey,alias,baseURL,chatServiceName,chatId,fileId){
		if(paramUrl['Channel'] == "web")
		{
			 var spt = filename.split(".");			 
			 download(b64toBlob2(data, wgMimeType[spt[spt.length-1].toLowerCase()]), fileName[filename], wgMimeType[spt[spt.length-1].toLowerCase()]);
		 }else
		{
			 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || paramUrl['Channel'] == "android") {
				var spt = filename.split(".");
				var downloadurl = wgServer+'/downloadfile.html?fileId='+data+'&filename='+fileName[filename]+'&Tfile='+tokendownload+'&filetype='+wgMimeType[spt[spt.length-1].toLowerCase()]+'&';

				function openTab(url) {
				var a = window.document.createElement("a");
				a.target = '_blank';
				a.href = url;
				var e = window.document.createEvent("MouseEvents");
				e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				a.dispatchEvent(e);
				};
				 var reurl = window.btoa(verify);
				 openTab(downloadurl+reurl);	
							 
			}else
			{
				 var spt = filename.split(".");
				 var downloadurl = wgServer+'/downloadfile.html?fileId='+data+'&filename='+fileName[filename]+'&Tfile='+tokendownload+'&filetype='+wgMimeType[spt[spt.length-1].toLowerCase()]+'&';
				 var reurl = window.btoa(verify);
				 downloadurl = downloadurl+reurl;
				 var msg = "<a id='ttt' href='"+downloadurl+"' target='_blank' >"+wgSystem[wgLanguage]["messageresponse"]["DownloadButtonios"]+"</a>";	
				 createMessage(wgMsgMari,msg);
				 $(document).on('click touchend','#ttt',function(e) {  reloadWeb();  });
				// function openTab(url) {
					// var a = window.document.createElement("a");
					// a.target = '_blank';
					// a.href = url;

					// // Dispatch fake click
					// var e = window.document.createEvent("MouseEvents");
					// e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					// a.dispatchEvent(e);
				// };
				
			}
		 } 
	}
	
	
	function b64toBlob2(b64Data, contentType){
		const byteCharacters = window.atob(b64Data);
		const sliceSize=512;
		  const byteArrays = [];
		  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		    const slice = byteCharacters.slice(offset, offset + sliceSize);
	
		    const byteNumbers = new Array(slice.length);
		    for (let i = 0; i < slice.length; i++) {
		      byteNumbers[i] = slice.charCodeAt(i);
		    }
	
		    const byteArray = new Uint8Array(byteNumbers);
		    byteArrays.push(byteArray);
		  }
		  const blob = new Blob(byteArrays, {type: contentType});
		  return blob;
	}
	
	
	function onDownloadFileIE(data,filename){
		window.navigator.msSaveBlob(data, filename);
		
	}
	// The chat class will call onError when an error occurs for any reason
	function onError(err) {
	}
	
	function endChat(){
		
		if(end == true)
		{
			var val={DisconnectReason:"Chat_UserEnd"};
			oChat.updateUserDataChat(val);
			
		}
		else{
			var val={DisconnectReason:"Chat_ChannelSelectorTimeout"};
			oChat.updateUserDataChat(val);
			
		}
		oChat.endChat();
		clearChatbox();
		oChatStart = false;
		ClearCookie();
		setCookie("username", user, 0.00001);
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
		wgLanguage = "TH";
		readConfig(wgLanguage);
		$('.btn-in-chat-download').prop('disabled', true);
		$('#btn-Send').prop('disabled', true);
		$('#uploadfile').prop('disabled', true);
		$('#btn-emoji').prop('disabled', true);
		document.getElementById("btn-emoji").disabled = true;
		$('#messagechat').prop('disabled', true);
		rehistory = 0;
		setTimeout(function(){
					createBtnReChat(wgBtnChat);
					$('#btn-startchat').text(wgSystem[wgLanguage]["messageresponse"]["btniserviceendchat"]);
				}, 2000);  	
	}
	
	$(document).on('keypress','textarea[name=messagechat]',function(e) { 
		if ( e.which == 13 ) {
			e.preventDefault();sendMsg();
		} 
	});
	
	
	
	function timefilter(dataArr) {

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

	}
	function openemail() {
		
		var val={DisconnectReason:"Chat_UserSwitchTo_Email"};
		oChat.updateUserDataChat(val);
		endChat();
		
	}
	function selectq() {
		chanelselect = false;
		document.getElementById('li-btn-selecter').parentNode.removeChild(document.getElementById('li-btn-selecter'));
		
		createSms(wgMsgMari,wgSystem[wgLanguage]["messageresponse"]["AskSMS"]);
		SmsTime = setTimeout(function(){
			document.getElementById('li-btn-sms').parentNode.removeChild(document.getElementById('li-btn-sms'));
			createMessage(wgMsgMariload,SplashMes[0]);										
			clearTimeout(timeselecter);		
			},timeSms);
	}
	
	$(document).on('keydown','textarea[name=messagechat]',function(e) { 
		if(oChatStart){
			oChat.startTypingChat();
		}
	});
	
	
	function attach(fileup){	
		// oChat.checkmimetypecustomer(fileup[0],fileup);
		oChat.uploadfileChat(fileup);
			  
	}
	
	
	function submitSms(){
		isewt = false;
		var smsval={SMSContactNumber:$('#sms').val().trim()};
		if($('#sms').val().trim().length < 10)
		{
			onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["phonenumber"]);
		}
		else
		{
			oChat.updateUserDataChat(smsval);
			document.getElementById('li-btn-sms').parentNode.removeChild(document.getElementById('li-btn-sms'));
			for(var j=0;j<1;j++){	//SplashMes.length
				createMessage(wgMsgMariload,SplashMes[j]);					}		
				isewt = false;		
				clearTimeout(timeselecter);
				clearTimeout(SmsTime);
		}
	}

	function stopRefresh(){
		oChat._stopChatRefresh();
	}
	
	function chathistoryview(chatallhistory){
		scrolltext = false;
			var numcol = chatallhistory.message.length;
			var numlast = chatallhistory.message.length;
			rehistory = parseInt(rehistory);
			var now = false;
			for(j = 0;j < (rehistory-1); j++)
			{	

				if(j != (rehistory-1) && numcol != 0 && chatallhistory.message.length != 1)  
				{
					do{
						numcol--;
						if(numcol == 0 && new Date(chatallhistory.message[numcol+1].starttime)- new Date(chatallhistory.message[numcol].starttime) == 0)
						{
							dateold = new Date(chatallhistory.message[chatallhistory.message.length-1].starttime).toLocaleDateString()+" "+new Date(chatallhistory.message[chatallhistory.message.length-1].starttime).toLocaleTimeString();
							break;
						}
						else
						{
							try {
							  new Date(chatallhistory.message[numcol-1].starttime)
							}
							catch(err) {
								if(numcol == 0)
								{									
									dateold = new Date(chatallhistory.message[chatallhistory.message.length-1].starttime).toLocaleDateString()+" "+new Date(chatallhistory.message[chatallhistory.message.length-1].starttime).toLocaleTimeString();	
								}
								break;
							}
						}
					  }
					  while (new Date(chatallhistory.message[numcol-1].starttime)- new Date(chatallhistory.message[numcol].starttime) == 0 && j < (rehistory-1) );
				
					for(var i = numcol; i < numlast; i++) {
						var obj = chatallhistory.message[i].type;
						var obj1 = chatallhistory.message[i].text;
						var obj2 = chatallhistory.message[i].starttime;
						onMessageReceived(obj,"","",obj1,"");
						var obj3 = new Date(obj2);
						if(i == numcol && j != 0 && numcol != 0)
						{
							createMessagehistory(wgMsgCustomer,obj3.toLocaleDateString()+" "+obj3.toLocaleTimeString()); 
						}
						else if(i == numcol && j == 0 && numcol != 0)
						{
							createBtnInChathistory(wgBtntabmessagehistoryfirst);
							$('#btn-history').text(wgSystem[wgLanguage]["messageresponse"]["tabmessagehistoryfirst"]);
							createMessagehistory(wgMsgCustomer,obj3.toLocaleDateString()+" "+obj3.toLocaleTimeString()); 
						}
						if(obj == "wgMsgAgent" && numcol != 0)
						{
							createMessage(wgMsgAgent,obj1,"history"); 	
						}
						else if(obj == "wgMsgCustomer" && numcol != 0)
						{
							createMessage(wgMsgCustomer,obj1,"history"); 
						}
					}
				}
				if(j == (rehistory-2))
				{
					if(now == false)
					{
						createMessagehistory(wgMsgCustomer,wgSystem[wgLanguage]["messageresponse"]["tabmessagenow"]); 
						now = true;
					}if(numcol == 0)
					{
						onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["alertoldhistory"]);
					}
				}
				numlast = numcol;
			}
			
			chat = "ChatCookie";
			requestChat();
				document.getElementById("imgloader").style.display = "none";
				$(".comfirm-end-background").addClass("hide");
				
	}	


	
	
	
	