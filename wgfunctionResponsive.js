var timeselecter;
var wgDateMessage;
var numhistory = 0;
var oAction = {
	MsgTemplate: function(message) {}
}

function createMessage(msgFrom,msgText,redate){
	if(redate == "history")
	{
		wgDateMessage="";
	}else
	{
		wgDateMessage = createWgDateMessage();
	}
	
	var listChat  = wgAction.createElement(tagList);
	numhistory = numhistory - 1;
	listChat.id   = tagList + numhistory;
	var template = "<div class='"+msgFrom["headclass"]+"'>";
	if(msgFrom["position"] == "right"){
		template+= "	<span class='"+msgFrom["timeclass"]+"'>"+wgDateMessage+"</span>"
				+  "	<span class='"+msgFrom["headnameclass"]+"'>"+msgFrom["name"]+"</span>"
				;
	} 
	else{
		template+= "	<img src='"+msgFrom["img"]+"'>"
				+  "	<span class='"+msgFrom["headnameclass"]+"'>"+msgFrom["name"]+"</span>"
				+  "	<span class='"+msgFrom["timeclass"]+"'>"+wgDateMessage+"</span>"
				;
	}
	if(msgFrom["position"] == "load")
	{
	template += "</div>"
			 + "<div class='"+msgFrom["bodyclass"]+"'>"+msgText+" "+"<img src="+wgServer+"/"+wgImagePath+"/loading.gif width='30' height='8' style='display:inline-block;'></div>"
			 ;
	}
	else
	{
	template += "</div>"
			 + "<div class='"+msgFrom["bodyclass"]+"'>"+msgText+"</div>"
			 ;	
	}
	listChat.innerHTML = template;				   
	wgAction.getElementById(wgUlChatId).appendChild(listChat);
	if(scrolltext && chat == "" || chat == undefined)
	{
		focusScrollwgChatbox();		
	}	
}

function createMessagehistory(msgFrom,msgText){
	var listChat  = wgAction.createElement(tagList);
	numhistory = numhistory - 1;
	listChat.id   = tagList + numhistory;
	var template = "<div class='messagehistory'><center>"+msgText+"</center></div>";
	listChat.innerHTML = template;				   
	wgAction.getElementById(wgUlChatId).appendChild(listChat);	
}

function createMessagehistoryfirst(msgFrom,msgText){
	var listChat  = wgAction.createElement(tagList);
	numhistory = numhistory - 1;
	listChat.id   = tagList + numhistory;
	var template = "<div class='messagehistoryfirst'><center>"+msgText+"</center></div>";
	listChat.innerHTML = template;				   
	wgAction.getElementById(wgUlChatId).appendChild(listChat);	
}

function createMessagedownload(msgFrom,msgText){
	var listChat  = wgAction.createElement(tagList);
	listChat.id   = tagList + wgAction.getElementById(wgUlChatId).childNodes.length;
	var template = "<div class='messagedownload'><center>"+msgText+"</center></div>";
	listChat.innerHTML = template;				   
	wgAction.getElementById(wgUlChatId).appendChild(listChat);

	document.getElementById(listChat.id).style.visibility = "hidden";
}

$(document).on('keypress keyup','input[name=textsms]',function (e) {
		$(this).val($(this).val().replace(/[^0-9\.]/g,''));
		if ((e.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
			e.preventDefault();
		}
		if($(this).val().length>0){	
			document.getElementById("btn-SmsY").disabled = false;
		}
	
    });

function createSms(msgFrom,msgText){
	wgDateMessage = createWgDateMessage();
	var listChat  = wgAction.createElement(tagList);
	listChat.id   = tagList + "-btn-sms";
	
	var template = "<div class='"+msgFrom["headclass"]+"'>";
	if(msgFrom["position"] == "right"){
		template+= "	<span class='"+msgFrom["timeclass"]+"'>"+wgDateMessage+"</span>"
				+  "	<span class='"+msgFrom["headnameclass"]+"'>"+msgFrom["name"]+"</span>"
				;
	} 
	else{
		template+= "	<img src='"+msgFrom["img"]+"'>"
				+  "	<span class='"+msgFrom["headnameclass"]+"'>"+msgFrom["name"]+"</span>"
				+  "	<span class='"+msgFrom["timeclass"]+"'>"+wgDateMessage+"</span>"
				;
	}
	template += "</div>"
			 + "<div class='messagesms'>"+msgText+"<br>"
			 + "<center><input  id='sms' type='text' name='textsms' class='txtboxsms' placeholder='"+wgSystem[wgLanguage]["messageresponse"]["AskSMSBox"]+"' title='' maxlength='10' required /><br>"
			 + "</center></div>"
			 + "<center><button type='button' class='btn-sms' id='btn-SmsN' value='cencel' onclick='closeForm(this.value);' >"+wgSystem[wgLanguage]["messageresponse"]["btn_cancel"]+"</button><button type='button' class='btn-sms' id='btn-SmsY' onclick='submitSms() ;' >"+wgSystem[wgLanguage]["messageresponse"]["SmsY"]+"</button></center>"
			 ;
	listChat.innerHTML = template;				   
	wgAction.getElementById(wgUlChatId).appendChild(listChat);
	if(rehistory == 0)
	{
		focusScrollwgChatbox();
	}
	document.getElementById("btn-SmsY").disabled = true;
}

function displayUserIntention(msgFrom,msgText){
	wgDateMessage = createWgDateMessage();
	var listChat  = wgAction.createElement(tagList);
	listChat.id   = tagList + wgAction.getElementById(wgUlChatId).childNodes.length;;
	
	var template = "<div class='"+msgFrom["headclass"]+"'>";
	if(msgFrom["position"] == "right"){
		template+= "	<span class='"+msgFrom["timeclass"]+"'>"+wgDateMessage+"</span>"
				+  "	<span class='"+msgFrom["headnameclass"]+"'>"+msgFrom["name"]+"</span>"
				;
	} else{
		template+= "	<img src='"+msgFrom["img"]+"'>"
				+  "	<span class='"+msgFrom["headnameclass"]+"'>"+msgFrom["name"]+"</span>"
				+  "	<span class='"+msgFrom["timeclass"]+"'>"+wgDateMessage+"</span>"
				;
	}
	
	template += msgText;		 
	listChat.innerHTML = template;				   
	wgAction.getElementById(wgUlChatId).appendChild(listChat);
	if(rehistory == 0)
	{
		focusScrollwgChatbox();
	}
}

function createWgDateMessage(){
	var returnDate;
	var testtime;
	var today  = new Date();
	returnDate = ((today.getHours() < 13) ? today.getHours() : (today.getHours() - 12))+ ":" 
	+(((today.getMinutes() < 10)? "0" : "")+today.getMinutes()+" "+((today.getHours() < 12) ? "AM" : "PM"));
	testtime = ((today.getMinutes() < 10)? "0" : "");
	return returnDate;
}

function createBtnInChat(btnObj){ 
	var listChat  = wgAction.createElement(tagList);
	listChat.id   = tagList+"-btn"+btnObj["id"];	
	var template = "<center>"
				 + "<button type='button' class='btn-in-chat' "
				 + "id='"+btnObj["id"]+"' "
				 + "value='"+btnObj["v"]+"' " 
				 + "onclick='"+btnObj["oc"]+"' "
				 + ">"+btnObj["t"]+"</button>"
				 + "</center>"
				 ;
	listChat.innerHTML = template;
	wgAction.getElementById(wgUlChatId).appendChild(listChat);     
	if(rehistory == 0)
	{
		focusScrollwgChatbox();
	}
}

function createBtnInChathistory(btnObj){ 
	var listChat  = wgAction.createElement(tagList);
	listChat.id   = tagList+"-btn"+btnObj["id"];	
	var template = "<center>"
				 + "<button type='button' class='btn-in-chathistory' "
				 + "id='"+btnObj["id"]+"' "
				 + "value='"+btnObj["v"]+"' " 
				 + "onclick='"+btnObj["oc"]+"' "
				 + ">"+wgSystem[wgLanguage]["messageresponse"]["tabmessagehistoryfirst"]+"</button>"
				 + "</center>"
				 ;
	listChat.innerHTML = template;
	wgAction.getElementById(wgUlChatId).appendChild(listChat);     
	if(rehistory == 0)
	{
		focusScrollwgChatbox();
	}
}

function createBtnReChat(btnObj){ 
	var listChat  = wgAction.createElement(tagList);
	listChat.id   = tagList+"-btn"+btnObj["id"];	
	var template = "<center>"
				 + "<button type='button' class='btn-re-chat' "
				 + "id='"+btnObj["id"]+"' "
				 + "value='"+btnObj["v"]+"' " 
				 + "onclick='"+btnObj["oc"]+"' "
				 + ">"+btnObj["t"]+"</button>"
				 + "</center>"
				 ;
	listChat.innerHTML = template;
	wgAction.getElementById(wgUlChatId).appendChild(listChat);     
	if(rehistory == 0)
	{
		focusScrollwgChatbox();
	}
}

function createBtnSelect(btnqObj,btncanqObj,btnEmObj){ 
	var listChat  = wgAction.createElement(tagDiv);
	listChat.id   = tagList+"-btn-selecter";
	
	
	
	
	
	
	var template = ""
		if(btn_Q == true)
		{		
				btnqObj["t"] = wgSystem[wgLanguage]["messageresponse"]["btn_q"];
				template += "<div class='btn-select' "
				+ "id='"+btnqObj["id"]+"' "
				+ "value='"+btnqObj["v"]+"' " 
				+ "onclick='"+btnqObj["oc"]+"' "
				+ ">"+btnqObj["t"]+"<span class='selec' >"+" >"+" </span></div>" 
				;
		}
		if(btn_CancelQ == true){
				
				btncanqObj["t"] = wgSystem[wgLanguage]["messageresponse"]["btn_cancel"];
				template += "<div  class='btn-select' "
				+ "id='"+btncanqObj["id"]+"' "
				+ "value='"+btncanqObj["v"]+"' " 
				+ "onclick='"+btncanqObj["oc"]+"' "
				+ ">"+btncanqObj["t"]+"<span class='selec' >"+" >"+" </span></div>"
				;
		}
		if(btn_Email == true){
				
				btnEmObj["t"] = wgSystem[wgLanguage]["messageresponse"]["btn_email"];
				template += "<div  class='btn-select' "
				+ "id='"+btnEmObj["id"]+"' "
				+ "value='"+btnEmObj["v"]+"' " 
				+ "onclick='"+btnEmObj["oc"]+"' "
				+ ">"+btnEmObj["t"]+"<span class='selec' >"+" >"+" </span></div>"
				;
		}
		template += "</center>";
	
	listChat.innerHTML = template;
	wgAction.getElementById(wgUlChatId).appendChild(listChat);     
	if(rehistory == 0)
	{
		focusScrollwgChatbox();
	}
	timeselecter = setTimeout(function(){ endChat();}, timeChSelect);
}

function removeBtnInChat(id){
	if(wgAction.getElementById(id)){
		wgAction.getElementById(id).parentNode.removeChild(wgAction.getElementById(id));
	}
}

function focusScrollwgChatbox(){
		$("#"+wgDivChatId).animate({
			scrollTop: $("#"+wgDivChatId).prop("scrollHeight")
		}, 'slow');
}

function readWgMessageClient(lang,what){
	wgLanguage = lang;
	$.ajax({
		type: "GET",  
		url: ""+wgSystem[lang][what],
		dataType: "text",       
		success: function(response){ 
			if(response){
				if(what == "userintention"){				
					processUserIntention(response.split(/\r\n|\n/));
					
				} else{
					processData(response.split(/\r\n|\n/));
					
				}
			}
		}   
	});
}

function readWgemoji(){
	$.ajax({
		type: "GET",  
		url: ""+wgServer+"/"+wgConfigPath+"/emoji.txt",
		dataType: "text",       
		success: function(response){ 
			if(response){
				
					processemoji(response.split(/\r\n|\n/));
					
			}
		}   
	});
}

function readWgFunction(){
	$.ajax({
		type: "GET",  
		url: ""+wgServer+"/"+wgConfigPath+"/Function.txt",
		dataType: "text",       
		success: function(response){ 
			if(response){
				
					processFunction(response.split(/\r\n|\n/));
					
			}
		}   
	});
}

function processData(dataArr){
	dataArr.forEach(function(element) {
		var temp = element.split(",");
		dataMessage[temp[0]] = temp[1]; 
	});
	document.getElementById("messagechat").placeholder = wgSystem[wgLanguage]["messageresponse"]["Textsent"];
}

function processFunction(dataArr){
	dataArr.forEach(function(element) {
		var temp = element.split(",");
		dataFunction[temp[0]] = temp[1]; 
	});
	
}
	
function processUserIntention(dataArr){
	prodIntention = [];
	var keyParam = dataArr[0].split(",");
	var i=0;
	dataArr.forEach(function(e) {
		var temp = e.split(",");
		var obj = {};
		for(var j=0;j<keyParam.length;j++){
			obj[keyParam[j]] = temp[j];
		}
		if(i!=0){
			prodIntention.push(obj);
		}
		i++;
	});
}

function processemoji(dataArr){
	prodIntentione = [];
	var keyParame ;
	if(keyParame != "")
	{
		keyParame = dataArr;
	}
	var h=0;
	
	
		var obje = [];
		
			
		for(var g=0;g<keyParame.length;g++){
			obje[keyParame[g]];
			var liObj = document.createElement('span');
			liObj.className = "emoji-option" ;
			liObj.id = "emoji-option"+g;
			liObj.styleSheets = "display:inline-block";
			liObj.innerHTML = keyParame[g];
			document.getElementById("wg-emoji").appendChild(liObj);  			
		}
		 
		if(h!=0){
			prodIntentione.push(obje);
		}
		h++;	  
}

function createUserIntention(pi){
	var styleProdIntention  = "<div class='dv-generic-carousel'>"
							+ "	<div id='prev' class='sd sd-left'>"
							+ "		<img src='"+wgServer+"/"+wgImagePath+"/btn-left.png' class='imgbtn-uin'>"
							+ "	</div>"	
							+ "	<div id='next'  class='sd sd-right'>"
							+ "		<img src='"+wgServer+"/"+wgImagePath+"/btn-right.png' class='imgbtn-uin'>"
							+ "	</div>"
							+ " <ul class='ul-gc'>"
							;
			
							var listIntent = "";
							for(var i=0;i<pi.length;i++){
								listIntent += "<li>"
											+ "	<div class='dv-thumb'> "
											+ "		<img src='"+wgServer+"/"+wgImagePath+"/"+pi[i]["picture"]+"'> "
											+ " </div> "
											+ "<div class='dv-title'>"	
											+ "	<p class='p-title'>"+pi[i]["titletext"]+"</p>";
											+ "	<p class='p-subtitle'></p>"
											+ "</div>"
											;
								for(var j=0;j<((Object.keys(pi[i]).length)-3)/2;j++){
									listIntent += "<div id='"+pi[i]["titlevalue"]+"-"+pi[i]["choicevalue"+(j+1)]+"' class='dv-button'>"
												+ pi[i]["choicetext"+(j+1)]
												+ "</div>"
								}
								listIntent += "</li>";
							}
							styleProdIntention += listIntent
												+ "</ul>"
												+ "<div class='bul-slide-img'>";
												for(var k=0;k<pi.length;k++){
													var act = "bulnone";
													if(k == 0)act = "bulact";
													
													styleProdIntention += "<span id='bul"+k+"'"
																	   + " class='bul-img "+act+" ' onclick='bulActive("+k+")'></span>"
												}
												styleProdIntention += "</div></div>";
												
	return styleProdIntention;
}

function typingMessage(msgFrom,msgText){
	wgDateMessage = createWgDateMessage();
	var listChat  = wgAction.createElement(tagList);
	listChat.id   = tagList + "Typing";
	
	var template = "<div class='"+msgFrom["headclass"]+"'>";
	if(msgFrom["position"] == "right"){
		template+= "	<span class='"+msgFrom["timeclass"]+"'>"+wgDateMessage+"</span>"
				+  "	<span class='"+msgFrom["headnameclass"]+"'>"+msgFrom["name"]+"</span>"
				;
	} else{
		template+= "	<img src='"+msgFrom["img"]+"'>"
				+  "	<span class='"+msgFrom["headnameclass"]+"'>"+msgFrom["name"]+"</span>"
				+  "	<span class='"+msgFrom["timeclass"]+"'>"+wgDateMessage+"</span>"
				;
	}
	
	template += "</div>"
			 + "<div class='"+msgFrom["bodyclass"]+"'>"+msgText+"</div>"
			 ;
			 
	listChat.innerHTML = template;				   
	wgAction.getElementById(wgUlChatId).appendChild(listChat);
	if(chat != "ChatCookie" && rehistory == 0)
	{
		focusScrollwgChatbox();
	}
}
  
function removeTyping(){
	if(document.getElementById('liTyping')){
		document.getElementById('liTyping').parentNode.removeChild(document.getElementById('liTyping'));
	}  
	if(chat != "ChatCookie" && rehistory == 0)
	{
		focusScrollwgChatbox();
	}
}

function srvTime(){
		var xmlHttp;
		try {
		//FF, Opera, Safari, Chrome
		xmlHttp = new XMLHttpRequest();
		}
		catch (err1) {
		//IE
			try {
			xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
			}
			catch (err2) {
				try {
				xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
				}
				catch (eerr3) {
					//AJAX not supported, use CPU time.
					}
				}
			}
		xmlHttp.open('HEAD',window.location.href.toString(),false);
		xmlHttp.setRequestHeader("Content-Type", "text/html");
		xmlHttp.send('');
		return xmlHttp.getResponseHeader("Date");
		}	
	  
	function  checkedtimeworking(){
		var iswork = true;
		var servertime = srvTime();
        var today = new Date(servertime);
        var h = today.getHours();
		if(h<WorkStartEng){
			iswork = false;
			
		}else if(h==WorkStopEng){
			iswork = false;
		}
		
		return iswork;
	}
	
	function bulActive(n){
  
		var x = ($('.ul-gc').width()*n);
		$('.ul-gc').animate({
			scrollLeft: x
		}, 500, 'swing');
		 
		buletActive(n);
 
	}
	
	function buletActive(n){
		for(var i=0;i<$(".bul-img").length; i++){
			$("#bul"+i).attr("class", "bul-img bulnone");
		}
		$("#bul"+n).attr("class", "bul-img bulact");
		bul = n;
	}

function createEmail(msgFrom){
	wgDateMessage = createWgDateMessage();
	var subtext = $("input[name=Subject]").val();
	var protext = $("input[id=Product]").val();
	var listChat  = wgAction.createElement(tagList);
	listChat.id   = tagList + "-btn-sms";
	
	var template = "<div class='"+msgFrom["headclass"]+"'>";
	if(msgFrom["position"] == "right"){
		template+= "	<span class='"+msgFrom["timeclass"]+"'>"+wgDateMessage+"</span>"
				+  "	<span class='"+msgFrom["headnameclass"]+"'>"+msgFrom["name"]+"</span>"
				;
	} 
	else{
		template+= "	<img src='"+msgFrom["img"]+"'>"
				+  "	<span class='"+msgFrom["headnameclass"]+"'>"+msgFrom["name"]+"</span>"
				+  "	<span class='"+msgFrom["timeclass"]+"'>"+wgDateMessage+"</span>"
				;
	}
	template += "</div>"
			 + "<div class='messagesms'><div class='exit' onclick='closeForm(end)'>X</div>"
			 
			 + "<center><span class='txtemail'>"+wgSystem[wgLanguage]["messageresponse"]["HeadEmail"]+"</span></center><br><span class='txtemail'>"+wgSystem[wgLanguage]["messageresponse"]["Email"]+"</span><br><input  id='email' type='text' name='textemail' class='txtboxemail' placeholder='"+wgSystem[wgLanguage]["messageresponse"]["AskEmailBox"]+"' title='' maxlength='10' required /><br>"
			 + "<br><span class='txtemail'>"+wgSystem[wgLanguage]["messageresponse"]["ESubject"]+"<br></span><input  id='emailsubject' type='text' name='textemailsubject' class='txtboxemail' value='"+subtext+"' title='' maxlength='10' required /><br>"
			 +"<br><span class='txtemail'>"+wgSystem[wgLanguage]["messageresponse"]["EProduct"]+"<br></span><select name='cars' class='txtboxemail'><option value='"+protext+"'>"+protext+"</option>"
			 +"<option value='saab'>Saab</option>"
			 +"<option value='fiat'>Fiat</option>"
		     +"<option value='audi'>Audi</option>"
			 +"</select>"
			 + "<input type='file' id='uploadfile1' onchange='attach(this.files);' style='display:none;'/>"
			 + "<center><div class='attachemail' onclick=$('#uploadfile1').click(); >"
			 + "<img src='"+wgServer+"/"+wgImagePath+"/attach.png' id='uploadfile' class='imgfile' style='cursor:pointer;' width='13' height='13'>&nbsp;Attach file</div> </center>"
			 + "</div>"
			 + "<center><button type='button' class='btn-sms' id='btn-SmsN' value='cencel' onclick='closeForm(this.value);' >"+wgSystem[wgLanguage]["messageresponse"]["btn_cancel"]+"</button><button type='button' class='btn-sms' id='btn-SmsY' onclick='submitSms() ;' >"+wgSystem[wgLanguage]["messageresponse"]["SmsY"]+"</button></center>"
			 ;
	
	listChat.innerHTML = template;				   
	wgAction.getElementById(wgUlChatId).appendChild(listChat);
	if(rehistory == 0)
	{
		focusScrollwgChatbox();
	}
	
}
	$( "#chat-history" ).scroll(function() {
		if($("#chat-history").scrollTop() == 0 && serviceid != "" && end != true && oChatStart == true &&(chat == "Chatcookie" || chat != "Chatcookie") && agentjoin) {	
				$(".comfirm-end-background").removeClass("hide");
				document.getElementById("imgloader").style.display = "block";
						setTimeout(function() { 
							var list = document.getElementById("ul-history").childNodes;	
							var numui = document.getElementById("ul-history").childNodes.length;
							for(var i=0;i<numui;i++)
							{
								if((i+1) == numui)
								{
									if(rehistory == 0)
									{
										rehistory = parseInt(rehistory) + 2;
									}else
									{
										rehistory = parseInt(rehistory) + 1;
									}										
										oChat.chathisrotyview("ทดสอบยิงapi");
								}
							}
						},timereload);
		   
		}
	else if($("#chat-history").scrollTop() == 0 && oChatStart != true )
		{
			
		}
	else if($("#chat-history").scrollTop() == 0 && (serviceid == "" || !serviceid) && oChatStart == true )
		{
			onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["alerthistorynoserviceid"]);
		}
	else if($("#chat-history").scrollTop() == 0 && serviceid != "" && oChatStart == true && !agentjoin)
		{
			onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["alerthistorynotrequest"]);
		}
	else if($("#chat-history").scrollTop() == 0 && serviceid != "" && end == true)
		{
			onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["alerthistoryendchat"]);
		}
	  // else if($("#chat-history").scrollTop() == 0 && (serviceid == ""||serviceid != "") ||( end == true )&& oChatStart != true && !agentjoin)
		// {
			// onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["alerthistory"]);
		// }
		
	});
	
	function stephistory(){
	  if(serviceid != "" && end != true && oChatStart == true &&(chat == "Chatcookie" || chat != "Chatcookie") && agentjoin) 	
	  {
			$(".comfirm-end-background").removeClass("hide");
					document.getElementById("imgloader").style.display = "block";
							setTimeout(function() { 
								var list = document.getElementById("ul-history").childNodes;	
								var numui = document.getElementById("ul-history").childNodes.length;
								for(var i=0;i<numui;i++)
								{
								if((i+1) == numui)
									{
										if(rehistory == 0)
										{
											rehistory = parseInt(rehistory) + 2;
										}else
										{
											rehistory = parseInt(rehistory) + 1;
										}										
										oChat.chathisrotyview("ทดสอบยิงapi");
									}
								}
							},timereload);
	  }
	else if($("#chat-history").scrollTop() == 0 && oChatStart != true )
		{
			
		}
	else if($("#chat-history").scrollTop() == 0 && (serviceid == "" || !serviceid) && oChatStart == true )
		{
			onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["alerthistorynoserviceid"]);
		}
	else if($("#chat-history").scrollTop() == 0 && serviceid != "" && oChatStart == true && !agentjoin)
		{
			onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["alerthistorynotrequest"]);
		}
	else if($("#chat-history").scrollTop() == 0 && serviceid != "" && end == true)
		{
			onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["alerthistoryendchat"]);
		}
	// else if($("#chat-history").scrollTop() == 0 && (serviceid == ""||serviceid != "") ||( end == true )&& oChatStart != true && !agentjoin)
		// {
			// onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["alerthistory"]);
		// }
}
	
$(document).on('click','#prev', function(e) { $('.ul-gc').animate({scrollLeft: "-="+$('.ul-gc').width()}, 500, 'swing');if(bul>0){buletActive(bul-1);}});
$(document).on('click','#next',     function() { $('.ul-gc').animate({scrollLeft: "+="+$('.ul-gc').width()}, 500, 'swing');if(bul>=0 && bul < $(".bul-img").length-1){buletActive(bul+1);}});
$(document).on('click','.dv-button',function() { selectProductService(this.id,$(this).text()); });
$(document).on('click touchend','.emoji-option',function(e) { 
		selectEmoji(this.id,$(this).text()); 
		clickemoji();
		
});
$(document).on('click','.chat-history','.dv-button',function() { document.getElementById("emoji-chat").style.display = "none";
click=false; });
 $(document).on('click','input[name=textsms]',function (e) {
  clearTimeout(SmsTime);       
  SmsTime = setTimeout(function() { 
		document.getElementById('li-btn-sms').parentNode.removeChild(document.getElementById('li-btn-sms'));
			createMessage(wgMsgMariload,SplashMes[0]);					
		isewt = false;		
		clearTimeout(timeselecter); }, timeSms);
	});
$(document).on('click touchend','.messagehistoryfirst',function(e) { 		
			stephistory();		
});

	







