var ChatFactory = function(config) {

	var apiObj = Chat.createAPIv2();
	apiObj.init(config);

	// Create an instance of a wrapper class that encapsulates the chat API implementation
	var chatObj = {
		_chatapi: apiObj,
		
		startChat: function(formchat) {
			this._chatapi.startChat(formchat);
		},
		
		endChat: function() {
			this._chatapi.endChat();
		},
		
		sendMessage: function(message) {
			this._chatapi.sendMessage(message);
		},
		
		downloadfileChat: function(fileId,fileName) {
			this._chatapi.downloadfileChat(fileId,fileName);
		},
		
		uploadfileChat: function(fileup) {
			this._chatapi.uploadfileChat(fileup);
		},
		startTypingChat: function(){
			this._chatapi.startTypingChat();
		},
		stopTypingChat: function(){
			this._chatapi.stopTypingChat();
		},
		pushUrlChat: function(url) {
			this._chatapi.pushUrlChat(url);
		},
		updateUserDataChat: function(url) {
			this._chatapi.updateUserDataChat(url);
		},
		notiinapp: function(url) {
			this._chatapi.notiinapp(url);
		},
		_stopChatRefresh: function(){
			this._chatapi._stopChatRefresh();
		},
		_stopVerifytoken: function(){
			this._chatapi._stopVerifytoken();
		},
		chathisrotyview: function(message) {
			this._chatapi.chathisrotyview(message);
		},
		gettokenhistory: function() {
			this._chatapi.gettokenhistory();
		},
		gettokendownload: function() {
			this._chatapi.gettokendownload();
		},
		verifytokendownload: function() {
			this._chatapi.verifytokendownload();
		},
		checkmimetypecustomer: function(file,fileup) {
			this._chatapi.checkmimetypecustomer(file,fileup);
		},
		checkmimetypeagent: function(file,fromtype,fromnickname,userData) {
			this._chatapi.checkmimetypeagent(file,fromtype,fromnickname,userData);
		},
		termitokendownload: function() {
			this._chatapi.termitokendownload();
		}

	}
	
	// Return the wrapper class to the caller
	return chatObj;
}

// IE doesn't support Object.create() so implement a version of it that will work for our needs
if (!Object.create) {  
    Object.create = function (o) {
        if (arguments.length > 1) {
            throw new Error('Object.create implementation only accepts the first parameter.');
        }
        function F() {}
        F.prototype = o;
        return new F();
    };
}

// This merges the properties of two classes together to allow for object inheritance 
var fromPrototype = function(prototype, object) {  
    var newObject = Object.create(prototype);
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            newObject[prop] = object[prop];
        }
    }
  	return newObject;
};

// Our base Chat class implementation to be overridden by the implementation classes
var Chat = { 
	init: function(config) {}, 
    startChat: function(formchat) {},
    endChat: function() {},
    sendMessage: function(message) {}
};

// An implementation of the Genesys Chat API v2
//
// Genesys Chat API v2 is the API implemented and used by Genesys Web Engagement
// It previously used to be exposed by a component known at Genesys WebAPI Server,
// but is now hosted by GMS.
//
// It differs from Chat API v1 in that no Orchestration session is created, and it
// DOES NOT offer a CometD event channel.
//
// Note, this class does not implement the entire API, but just enough to show the
// basics of how the API works.
//
Chat.createAPIv2 = function(config) {  
    
    return fromPrototype(Chat, {
    	_config: {},
    	_chatId: null,
    	_userId: null,
    	_secureKey: null,
    	_alias: null,
    	_transcriptPosition: 1,
    	_chatRefreshIntervalId: null,
		_tokenIntervalId: null,
		_downloadAttempts: null,
		_uploadMaxFiles: null,
		_uploadMaxFileSize: null,
		_uploadMaxTotalSize: null,
		_uploadNeedAgent: null,	
		_uploadFileTypes: null,
		_usedUploadMaxFiles: null,	
		_usedUploadMaxTotalSize: null,
		_usedDownloadAttempts: null,
    	
    	// Initialize the Chat API v2 Class
    	init: function(config) {
    		var me = this;
			
			// Save off the config object for later use
			me._config = config;
			
			// Modify the config.baseURL to reflect the API v2 URI
			me._config.baseURL = me._config.baseURL + '/genesys/2';
    	},
    	
    	// Start the Chat with the formchat values
        startChat: function(formchat) {
			var me = this;
			if(formchat.search("ChatCookie") >= 0)
			{
					me._startChatRefresh();
					me.verifytokendownload();
					me._startVerifytoken();
					me._refreshChat();
					me._config.onStarted();
					me._getlimitfileChat();
					var elmnt = document.getElementById("chat-history");
			}
			else
			{
				var url = me._config.baseURL + '/chat/' + me._config.chatServiceName;
				const request = new XMLHttpRequest();
				request.open("POST", url,true);
				request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				request.onerror = function() {
					if(request.status == 0)
					{	internet = false;
						if(wgLanguage == "TH")
						{
							onMessageAlert(dataMessageTH["Error-408"]);
						}
						else if(wgLanguage == "EN")
						{
							onMessageAlert(dataMessageEN["Error-408"]);
						}
					}
					else
					{
						me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
					}						
				}
				request.onreadystatechange = function() {
					if(request.readyState == 4 && request.status == 200) {
						if ( me._config.debug === true ) {
						}
						var oo = JSON.parse(request.responseText);
						me._chatId = oo.chatId;
						me._userId = oo.userId;
						me._secureKey = oo.secureKey;
						me._alias = oo.alias;
						// Save off the transcript position
						me._transcriptPosition = 1;
						UserId = oo.userId;
						SecureKey = oo.secureKey;
						Alias = oo.alias;
						TranscriptPosition = 1;
						ChatId = oo.chatId;
						// Let listeners know that the chat session started successfully
						me._config.onStarted();
						me._getlimitfileChat();
						// Start the interval polling for transcript updates
						me._startChatRefresh();
						me._refreshChat();
						me.gettokenhistory();
						me.gettokendownload();
						
					}					
				}
				request.send(formchat);
			}
        },
        
        // End the chat session
        endChat: function() {
        
        	var me = this;
        
        	// Populate the parameters and URL
			var params = 'userId=' + me._userId + '&secureKey=' + me._secureKey + '&alias=' + me._alias;
			var url = me._config.baseURL + '/chat/' + me._config.chatServiceName + '/' + me._chatId + '/disconnect';
			const request = new XMLHttpRequest();
			// request.responseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{						
					if(wgLanguage == "TH")
					{
						onMessageAlert(dataMessageTH["Error-408"]);					
					}
					else if(wgLanguage == "EN")
					{
						onMessageAlert(dataMessageEN["Error-408"]);
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 200){
						if ( me._config.debug === true ) {
						}
						var oo = JSON.parse(request.responseText);						
						// Stop the interval polling for transcript updates
						me._stopChatRefresh();	
						me._stopVerifytoken();
						// Clear out the session values
						me._chatId = oo.chatId;
						me._userId = oo.userId;
						me._secureKey = oo.secureKey;
						me._alias = oo.alias;
						me._transcriptPosition = 1;						
						// Let the listeners know that the chat has ended
						me._config.onEnded();
						me.termitokendownload();
					}
				}
			}
			request.send(params);
        },
        
        // Send a message
        sendMessage: function(message) {
        
        	var me = this;
			message = encodeURIComponent(message);
        	// Populate the parameters and URL
			var params = 'message=' + message + '&userId=' + me._userId + '&secureKey=' + me._secureKey + '&alias=' + me._alias;
			var url = me._config.baseURL + '/chat/' + me._config.chatServiceName + '/' + me._chatId + '/send';
			const request = new XMLHttpRequest();
			// request.responseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{			
					if(wgLanguage == "TH")
					{
						onMessageAlert(dataMessageTH["Error-408"]);					
					}
					else if(wgLanguage == "EN")
					{
						onMessageAlert(dataMessageEN["Error-408"]);					
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}			
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 200){
						if ( me._config.debug === true ) {
						}
						var oo = JSON.parse(request.responseText);
					}
				}
			}
			request.send(params);
        },
        
		// Start an interval object to make 'refresh' requests at 5 second intervals
		_startChatRefresh: function() {			
			var me = this;
			me._chatRefreshIntervalId = setInterval( function() {
				me._refreshChat();
			}, 5000);
		},
		
		
		_startVerifytoken: function() {			
			var me = this;
			me._tokenIntervalId = setInterval( function() {
				me.verifytokendownload();
			}, 210000);
		},
		
		// Stop the interval object from making 'refresh' requests		
		_stopChatRefresh: function() {
			var me = this;
			clearInterval(me._chatRefreshIntervalId);
		},
		
		_stopVerifytoken: function() {
			var me = this;
			clearInterval(me._tokenIntervalId);
		},
		
		// Refresh the Chat transcript by making a 'refresh' request
		_refreshChat: function() {
			var me = this;
			if(chat == "ChatCookie")					
			{		
				me._userId = UserId;		
				me._secureKey = SecureKey;		
				me._alias = Alias;		
				me._transcriptPosition = TranscriptPosition;		
				me._chatId = ChatId;	 
			}
			var params = 'userId=' + me._userId + '&secureKey=' + me._secureKey + '&alias=' + me._alias + '&transcriptPosition=' + me._transcriptPosition;
			var url = me._config.baseURL + '/chat/' + me._config.chatServiceName + '/' + me._chatId + '/refresh';
			const request = new XMLHttpRequest();
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	internet = false;
					if(wgLanguage == "TH")
					{
					onMessageAlert(dataMessageTH["Error-0"]);
					}
					else if(wgLanguage == "EN")
					{
					onMessageAlert(dataMessageEN["Error-0"]);
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}			
			}
			
			request.onreadystatechange = function() {
				if(request.status != 200)
				{
					internet = false;
					if(wgLanguage == "TH")
					{
					onMessageAlert(dataMessageTH["Error-0"]);
					}
					else if(wgLanguage == "EN")
					{
					onMessageAlert(dataMessageEN["Error-0"]);
					}
				}
				if(request.readyState == 4 && request.status == 200){ 
					if(internet == false)
					{
						$(".comfirm-end-background").addClass("hide");
						$(".comfirm-end-box").addClass("hide");
						internet = true;
					}
					if ( me._config.debug === true ) {
					}
					// Update the transcript position
					var oo = JSON.parse(request.responseText);
					if((oo.chatEnded == true && !oo.errors && internet == false )||(oo.chatEnded == true && !oo.errors && internet != false )||(oo.chatEnded == true && oo.errors && internet == false ) ||oo.chatEnded == true )
					{
						me.termitokendownload();
						me._stopChatRefresh();
						me._stopVerifytoken();
						setCookie("username", user, 0.00001);
						oChatStart = false;
						removeTyping();
						$('#btn-Send').prop('disabled', true);
						$('#uploadfile').prop('disabled', true);
						$('#messagechat').prop('disabled', true);
						if(document.getElementById("btn-emoji").disabled == false)
						{
							if(!end)
							{
								createMessage(wgMsgAgent,wgSystem[wgLanguage]["messageresponse"]["Leftchat"]);
								createMessage(wgMsgCustomer,wgSystem[wgLanguage]["messageresponse"]["Leftchat"]);
								setTimeout(function(){
								createBtnReChat(wgBtnChat);
								$('.btn-in-chat-download').prop('disabled', true);
								rehistory=0;
								$('#btn-startchat').text(wgSystem[wgLanguage]["messageresponse"]["btniserviceendchat"]);
								}, timerestartchat);  
							}else
							{
								$('.btn-in-chat-download').prop('disabled', true);
								createMessage(wgMsgAgent,wgSystem[wgLanguage]["messageresponse"]["Leftchat"]);
								createMessage(wgMsgCustomer,wgSystem[wgLanguage]["messageresponse"]["Leftchat"]);
							}								
						}
						document.getElementById("btn-emoji").disabled = true;
						chat = "";	
					}
					else if(!oo.chatEnded && !oo.errors && internet && chat == "ChatCookie")
					{
						user = "ChatCookie";		
						setCookie("username", user, 0.35000);
						internet = true;
						me._transcriptPosition = oo.nextPosition;
						// For each item in the transcript...
						$.each(oo.messages, function(index, message) {	
							if(message.type === "FileUploaded"){
								// me.checkmimetypeagent(message.userData["file-id"],message.from.type, message.from.nickname,message.userData);
								me._config.onFileReceived(message.from.type, message.from.nickname,message.userData);		
							} else{
									me._config.onMessageReceived(message.from.type,message.type, message.from.nickname, message.text, oo.chatEnded);
							}
						}); 
						if(rehistory > 0)
						{
							$("#chat-history").scrollTop(0);
						}
						chat = "";		
					}
					else if(!oo.chatEnded && !oo.errors && internet)
					{
						user = "ChatCookie";		
						setCookie("username", user, 0.35000);
						internet = true;
						me._transcriptPosition = oo.nextPosition;
						// For each item in the transcript...
						$.each(oo.messages, function(index, message) {	
							if(message.type === "FileUploaded"){
								// me.checkmimetypeagent(message.userData["file-id"],message.from.type, message.from.nickname,message.userData);
								me._config.onFileReceived(message.from.type, message.from.nickname,message.userData); 								
							} else{
								me._config.onMessageReceived(message.from.type,message.type, message.from.nickname, message.text, oo.chatEnded);
							}
						}); 
						scrolltext = true;
					}					
				}
			}
			request.send(params);
			
		},	
		
		downloadfileChat: function(fileId,fileName){
			var me = this;			
			var data = JSON.stringify({
				  "TokenID":tokendownload ,
				  "FileID": fileId
				});
			var url = urldownloadfileChat;
			const request = new XMLHttpRequest();
				request.onloadstart = function(ev) {
				}
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/json");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(wgLanguage == "TH")
					{
					onMessageAlert(dataMessageTH["Error-408"]);
					}
					else if(wgLanguage == "EN")
					{
					onMessageAlert(dataMessageEN["Error-408"]);
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}				
			}
			request.onreadystatechange = function() {				
				if(request.readyState == 4 && request.status == 201){ 			  
					 var oo = JSON.parse(request.response);
						if ( me._config.debug === true ) {
						}
						me._getlimitfileChat();
						if(isIE)
						{
							me._config.onDownloadFileIE(oo.FileDownload,fileName);							
						}
						else
						{
							me._config.onDownloadFile(oo.FileDownload,fileName,me._userId,me._secureKey,me._alias,me._config.baseURL,me._config.chatServiceName,me._chatId,fileId);										
						}
					}
			}
			request.send(data);
		},
		
		_getlimitfileChat: function() {
        	var me = this;
			var params = 'userId=' + me._userId + '&secureKey=' + me._secureKey + '&alias=' + me._alias;
			var url = me._config.baseURL + '/chat/' + me._config.chatServiceName + '/' + me._chatId + '/file/limits';
			const request = new XMLHttpRequest();
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(wgLanguage == "TH")
					{
					onMessageAlert(dataMessageTH["Error-408"]);
					}
					else if(wgLanguage == "EN")
					{
					onMessageAlert(dataMessageEN["Error-408"]);
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}		
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 200){
						if ( me._config.debug === true ) {
						}
						var oo = JSON.parse(request.responseText);
						var temp = oo.messages[0].userData;
						me._downloadAttempts = temp["download-attempts"];
						me._uploadMaxFiles = temp["upload-max-files"];
						me._uploadMaxFileSize = temp["upload-max-file-size"];
						me._uploadMaxTotalSize = temp["upload-max-total-size"];
						me._uploadNeedAgent = temp["upload-need-agent"];	
						me._uploadFileTypes = temp["upload-file-types"];
						me._usedUploadMaxFiles = temp["used-upload-max-files"];
						me._usedUploadMaxTotalSize = temp["used-upload-max-total-size"];
						me._usedDownloadAttempts = temp["used-download-attempts"];
					}
				}
			}
			request.send(params);		
        },
		
		
		uploadfileChat: function(fileup){
			var me = this;
			me._usedUploadMaxFiles = parseInt(me._usedUploadMaxFiles);
			me._uploadMaxFiles = parseInt(me._uploadMaxFiles);
			me._usedUploadMaxTotalSize = parseInt(me._usedUploadMaxTotalSize);
			me._uploadMaxTotalSize = parseInt(me._uploadMaxTotalSize);
			if(fileup[0].size > me._uploadMaxFileSize){
				me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-Max-File-Size"]);
				$("#uploadfile").val(null);
				return;
			}			
			var sptname =  fileup[0].name.split(".");			
			if(me._uploadFileTypes.search(sptname[sptname.length-1].toLowerCase()) == -1){
				me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-File-Types"]);
				$("#uploadfile").val(null);
				return;
			}	
			
			if(me._usedUploadMaxFiles >= me._uploadMaxFiles){
				me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-Upload-Max-Files"]);
				$("#uploadfile").val(null);
				return;
			}
			
			if(me._usedUploadMaxTotalSize >= me._uploadMaxTotalSize){
				me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-Max-Total-Size"]);
				$("#uploadfile").val(null);
				return;
			}
			
			var url = me._config.baseURL + '/chat/' + me._config.chatServiceName + '/' + me._chatId + '/file';		
			var formData = new FormData();
			formData.append('userId', me._userId);
			formData.append('secureKey',me._secureKey);
			formData.append('alias',me._alias);
			formData.append('file',fileup[0]);
			const request = new XMLHttpRequest();
			request.open("POST", url,true);
			request.setRequestHeader("Accept","*/*");
			request.overrideMimeType("multipart/form-data;");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(wgLanguage == "TH")
					{
					onMessageAlert(dataMessageTH["Error-408"]);
					}
					else if(wgLanguage == "EN")
					{
					onMessageAlert(dataMessageEN["Error-408"]);
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}		 
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					$("#uploadfile").val(null);
					if(request.status == 200){
						if ( me._config.debug === true ) {
						}
						var oo = JSON.parse(request.responseText);
						me._getlimitfileChat();
					}
				}
			}
			request.send(formData);
			
		},
		
		 startTypingChat: function() {
        
        	var me = this;
        
        	// Populate the parameters and URL
			var params = '&userId=' + me._userId + '&secureKey=' + me._secureKey + '&alias=' + me._alias;
			var url = me._config.baseURL + '/chat/' + me._config.chatServiceName + '/' + me._chatId + '/startTyping';
			const request = new XMLHttpRequest();
			// request.responseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(wgLanguage == "TH")
					{
					onMessageAlert(dataMessageTH["Error-408"]);
					}
					else if(wgLanguage == "EN")
					{
					onMessageAlert(dataMessageEN["Error-408"]);
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}				
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 200){
					
						if ( me._config.debug === true ) {
						}
						var oo = JSON.parse(request.responseText);
						me._readReceiptChat();
					}
				}
			}
			request.send(params);
        },
		
		 stopTypingChat: function() {
        
        	var me = this;
        
        	// Populate the parameters and URL
			var params = '&userId=' + me._userId + '&secureKey=' + me._secureKey + '&alias=' + me._alias;
			var url = me._config.baseURL + '/chat/' + me._config.chatServiceName + '/' + me._chatId + '/stopTyping';
			const request = new XMLHttpRequest();
			// request.responseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(wgLanguage == "TH")
					{
					onMessageAlert(dataMessageTH["Error-408"]);
					}
					else if(wgLanguage == "EN")
					{
					onMessageAlert(dataMessageEN["Error-408"]);
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}						
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4){ 
					if(request.status == 200){
					
						if ( me._config.debug === true ) {
						}
						var oo = JSON.parse(request.responseText);
					}
				}
			}
			request.send(params);
        },
		
		_readReceiptChat: function() {
        
        	var me = this;
        
        	// Populate the parameters and URL
			var params = '&userId=' + me._userId + '&secureKey=' + me._secureKey + '&alias=' + me._alias + '&transcriptPosition=' + me._transcriptPosition;
			var url = me._config.baseURL + '/chat/' + me._config.chatServiceName + '/' + me._chatId + '/readReceipt';
			const request = new XMLHttpRequest();
			// request.responseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(wgLanguage == "TH")
					{
					onMessageAlert(dataMessageTH["Error-408"]);
					}
					else if(wgLanguage == "EN")
					{
					onMessageAlert(dataMessageEN["Error-408"]);
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}							
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4){ 
					if(request.status == 200){
				
						if ( me._config.debug === true ) {
						}
						var oo = JSON.parse(request.responseText);
					}
				}
			}
			request.send(params);
        },
		
		pushUrlChat: function(url) {
        
        	var me = this;
        
        	// Populate the parameters and URL
			var params = '&userId=' + me._userId + '&secureKey=' + me._secureKey + '&alias=' + me._alias + '&pushUrl=' + url;
			var url = me._config.baseURL + '/chat/' + me._config.chatServiceName + '/' + me._chatId + '/pushUrl';
			const request = new XMLHttpRequest();
			// request.responseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(wgLanguage == "TH")
					{
					onMessageAlert(dataMessageTH["Error-408"]);
					}
					else if(wgLanguage == "EN")
					{
					onMessageAlert(dataMessageEN["Error-408"]);
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}							
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 200){
						if ( me._config.debug === true ) {
						}
						var oo = JSON.parse(request.responseText);
					}
				}
			}
			request.send(params);
        },
		
		updateUserDataChat: function(arrData) {
        
			var uData = "";
			for(var key in arrData){
				uData += "&userData[\""+key+"\"]="+arrData[key].trim();
			}
        	var me = this;
        	// Populate the parameters and URL
			var params = '&userId=' + me._userId + '&secureKey=' + me._secureKey + '&alias=' + me._alias + uData;
			var url = me._config.baseURL + '/chat/' + me._config.chatServiceName + '/' + me._chatId + '/updateData';
			const request = new XMLHttpRequest();
			// request.responseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(wgLanguage == "TH")
					{
					onMessageAlert(dataMessageTH["Error-408"]);
					}
					else if(wgLanguage == "EN")
					{
					onMessageAlert(dataMessageEN["Error-408"]);
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}						
				
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4){ 
					if(request.status == 200){
						if ( me._config.debug === true ) {
						}
						var oo = JSON.parse(request.responseText);
					}
				}
			}
			request.send(params);
        },
		
		notiinapp: function(tokenapp) {
        
        	var me = this;
        	// Populate the parameters and URL
			var params = JSON.stringify({	"tokens":[tokenapp], 
							"message": {"notification":	{ 	"title": titlenoti,
															"body": bodynoti, 
															"custom_notification": {"show_in_foreground": false}
														},
										"data": {"screen": "ExpertChat"}
									   }
						 });
			var url = "https://dmpapi2.trueid.net/iservice-notifications/api/send";
			const request = new XMLHttpRequest();
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/json");
			request.setRequestHeader("Cache-Control","no-cache");
			request.setRequestHeader("Authorization","Bearer 5aaf9ade15afe0324400bacc83067c9af5664822aaa0a739d528528b");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(wgLanguage == "TH")
					{
					onMessageAlert(dataMessageTH["Error-408"]);
					}
					else if(wgLanguage == "EN")
					{
					onMessageAlert(dataMessageEN["Error-408"]);
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}							
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 200){
						if ( me._config.debug === true ) {
						}
						var oo = JSON.parse(request.responseText);
					}
				}
			}
			request.send(params);
        },
		
   chathisrotyview: function(message) {

			var me = this;
			var url = urlchathisrotyview+'/?History='+rehistory;
			const request = new XMLHttpRequest();
			request.open("GET", url);
			request.setRequestHeader("Authorization","Bearer "+tokenhistory);
			request.setRequestHeader("Content-Type","application/json");
			request.onerror = function() {
				if(request.status != 200)
				{		
	
					if(wgLanguage == "TH")
					{
						onMessageAlert(dataMessageTH["Error-408"]);					
					}
					else if(wgLanguage == "EN")
					{
						onMessageAlert(dataMessageEN["Error-408"]);					
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}			
			}
			request.onreadystatechange = function() {
				if(request.status != 200 && request.status != 401){
						me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
					}
				if(request.status == 401)
				{	
					me.gettokenhistory();
					if(expirytoken == false)
					{
						expirytoken = true;
						rehistory = parseInt(rehistory)-1;
					}				
				}
				if(request.readyState == 4 ){ 
					if(request.status == 200){
						if ( me._config.debug === true ) {
						}
						me._stopChatRefresh();
						me._stopVerifytoken();
						var list = document.getElementById("ul-history").childNodes;	
						var numui = document.getElementById("ul-history").childNodes.length;
							for(var i=0;i<numui;i++)
							{
								document.getElementById(list[0].id).parentNode.removeChild(document.getElementById(list[0].id));
							}
						var oo = JSON.parse(request.responseText)
							chathistoryview(oo);
					}
				}
			}
			request.send();
			
        },
		
		gettokenhistory: function() {
        
			var me = this;
			var IxnID = window.btoa(ChatId);
			var params = JSON.stringify({"lxnID":IxnID});
			var url = urlgettokenhistory;
			const request = new XMLHttpRequest();
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/json");
			request.setRequestHeader("username",Hisuser);
			request.setRequestHeader("password",window.btoa(Hispass));
			request.onerror = function() {
				if(request.status != 200)
				{		
	
					if(wgLanguage == "TH")
					{
						onMessageAlert(dataMessageTH["Error-408"]);					
					}
					else if(wgLanguage == "EN")
					{
						onMessageAlert(dataMessageEN["Error-408"]);					
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}			
			}
			request.onreadystatechange = function() {
				if(request.status != 200){
						me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
					}
				if(request.readyState == 4 ){ 
					if(request.status == 200){
						if ( me._config.debug === true ) {
						}
						
						var oo = JSON.parse(request.responseText);
						tokenhistory = oo.token;
						if(expirytoken == true)
						{
							stephistory();
							expirytoken = false;
						}
					}
				}
			}
			request.send(params);
	
        },
		
		verifytokendownload: function() {

			var me = this;
			var url = urlverifytokendownload+tokendownload;
			const request = new XMLHttpRequest();
			request.open("GET", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
					me._stopVerifytoken();
					me.gettokendownload();			
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 201){
						if ( me._config.debug === true ) {
						}
						
						var oo = JSON.parse(request.responseText);
					}else
					{
						me._stopVerifytoken();	
						me.gettokendownload();
					}
				}
			}
			request.send();
	
        },
		
		termitokendownload: function() {
			var me = this;
			var url = urltermitokendownload+tokendownload;
			const request = new XMLHttpRequest();	
			request.open("GET",url);
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 200){
										
						var oo = JSON.parse(request.responseText);
					}
				}
			}
			request.send();			
        },
			
		gettokendownload: function() {

			var me = this;
			var data = JSON.stringify({
			  "UserID": me._userId,
			  "SecureKey": me._secureKey,
			  "Alias": me._alias,
			  "ChatID": me._chatId
			});
			var url = urlgettokendownload;
			const request = new XMLHttpRequest();
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/json");
			request.onerror = function() {
				if(request.status != 201)
				{		
	
					if(wgLanguage == "TH")
					{
						onMessageAlert(dataMessageTH["Error-408"]);					
					}
					else if(wgLanguage == "EN")
					{
						onMessageAlert(dataMessageEN["Error-408"]);					
					}
				}
				else
				{
					me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}			
			}
			request.onreadystatechange = function() {
				if(request.status != 201){
						me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
					}
				if(request.readyState == 4 ){ 
					if(request.status == 201){
						if ( me._config.debug === true ) {
						}					
						var oo = JSON.parse(request.responseText);
						 tokendownload = oo.token;
						 me._startVerifytoken();
					}
				}
			}
			request.send(data);
			
			
        },
		
		
		checkmimetypeagent: function(file,fromtype,fromnickname,userData) {

			var me = this;
			var data = JSON.stringify({
			  "TokenID": tokendownload,
			  "FileID": file
			});
			var url = urlcheckmimetypeagent;
			const request = new XMLHttpRequest();
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/json");
			request.onreadystatechange = function() {
				if(request.status != 200){
						me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
					}
				if(request.readyState == 4 ){ 
					if(request.status == 200){
						if ( me._config.debug === true ) {
						}
						
						var oo = JSON.parse(request.responseText);
						checkfiletype = oo.validate_result;
						// me._config.onFileReceived(fromtype, fromnickname,userData,checkfiletype);
						$("[value="+file+"]").prop('disabled', false);
						if(checkfiletype == false)
						{
							$("[value="+file+"]").attr("onclick","onMessageAlert(wgSystem[wgLanguage]['messageresponse']['Error-401'])");
						}
						
					}
				}
			}
			request.send(data);
			
			
        },
		
		checkmimetypecustomer: function(file,fileup) {
			var me = this;
			var data = new FormData();
			data.append("file", file);
			data.append("token", tokendownload);
			var url = urlcheckmimetypecustomer;
			const request = new XMLHttpRequest();
			request.open("POST", url);
			var spt = file.name.split(".");
			request.onreadystatechange = function() {
				if(request.status != 200){
						me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-401"]);
				}
				if(request.readyState == 4 ){ 
					if(request.status == 200){
						if ( me._config.debug === true ) {
						}				
						var oo = JSON.parse(request.responseText);
						  if(oo.validate_result)
						  {
							  me.uploadfileChat(fileup);
						  }else
						  {
							  me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-File-Types"]);
						  }
					}
				}
			}

			if(file.size < me._uploadMaxFileSize)
			{
				request.send(data);
			}
			else
			{
				me._config.onMessageAlert(wgSystem[wgLanguage]["messageresponse"]["Error-Max-File-Size"]);
			}
			
        }
   
		
    });
};