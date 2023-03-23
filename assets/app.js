const zendeskCCP = () => {

    var client = ZAFClient.init();

    client.metadata().then(async function() {
        let ccpUrl = 'localhost:8080';
        let url = "sandeza-testing.my.connect.aws/ccp-v2#";


        let Iframe = document.querySelector("iframe");
        const IframeWindow = document.getElementById("zendeskframe");
        console.log("ttttttt",IframeWindow)
        let iframeWin = IframeWindow.contentWindow;
        console.log("iframeWin",iframeWin)
        iframeWin.postMessage("hide", "*");
        window.addEventListener("message", messageHandler(client), false);

        Iframe.setAttribute("id", "customCCP");
        Iframe.setAttribute(
            "src",
            // `https://${ccpUrl}/?connect_url=https://${url}&access_key=${accessKey}&integration_id=${integrationId}&extra_data=${extraData}`
            `https://${ccpUrl}/?connect_url=https://${url}`
        );
        Iframe.setAttribute(
            "sandbox",
            "allow-scripts allow-forms allow-popups-to-escape-sandbox allow-same-origin allow-popups allow-top-navigation allow-top-navigation-by-user-activation"
        );
        Iframe.setAttribute("allow", "microphone");
        Iframe.setAttribute("width", "360");
        Iframe.setAttribute("height", "500");
        Iframe.setAttribute("frameborder", "0");
        client.invoke("resize", {
            width: "380px",
            height: "506px"
        });

        client.request("/api/v2/tickets.json").then(function(tickets) {
            tickets;
        });
    }),


    client.invoke('resize', { width: '360px', height: '500px' })

    
};
zendeskCCP();


function messageHandler(client) {
    return async function(event) {
        event = event.data;
  
        let messageData = {};
        if (event.action == "agentConnected") {
        
        } else if (event.action == "inboundCall") {
      
            var callHistory = [];
            var callLog = {};
            callLog.callType = "inbound";
            callLog.contactId = event.contactId;
            callLog.contactName = event.contactName;
            callLog.contactNumber = event.contactNumber;
            callLog.calledTime = event.calledTime;
            callHistory.push(callLog);
        } else if (event.action == "missedcall") {
  
       
            var callHistory = [];
            var callLog = {};
            callLog.callType = "Missed";
            callLog.contactId = event.contactId;
            callLog.contactName = event.contactName;
            callLog.contactNumber = event.contactNumber;
            callLog.calledTime = event.calledTime;
            callHistory.push(callLog);
        } else if (event.action == "outboundCall") {
  
            var callHistory = [];
            var callLog = {};
            callLog.callType = "outbound";
            callLog.contactId = event.contactId;
            callLog.contactName = event.contactName;
            callLog.contactNumber = event.contactNumber;
            callLog.calledTime = event.calledTime;
            callHistory.push(callLog);
        } else if (event.action == "incomingCall") {
    
            callLog.callType = "incomingCall";
            callLog.contactId = event.contactId;
            callLog.contactName = event.contactName;
            callLog.contactNumber = event.contactNumber;
        } else if (event.action == "openContact") {
        
            client.invoke("routeTo", "user", event.contactId);
        } else if (event.action == "openTicket") {
    
            client.invoke("routeTo", "ticket", event.ticketId);
        } else if (event.action == "endcall") {
       
        } else if (event.action == "addNote") {
      
        } else if (event.action == "addContact") {
        } else if (event.action == "createTicket") {
        } else if (event.action == "languageChange") {
        }
    };
  }