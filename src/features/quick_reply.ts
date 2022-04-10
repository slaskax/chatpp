/// <reference path="../usage.ts" />

let last_pm: number | null = null;

// Used to get the ID of the last PM you recieve.
w.on("chatmod", (e: OWOTData) => {
    if (e.hide) return;
    
    if (e.dataObj.privateMessage && e.dataObj.privateMessage == "to_me")
        last_pm = e.id;
});

// Adds the /r command.
addCommandDoc("r", "Quickly replies to last PM.", [["message", true]]);
addCommand("r", (args) => {
    if (last_pm === null) {
        informUser("You have not recived any PMs yet!", false);
        return;
    }

    api_chat_send(`/tell ${last_pm} ${args.join(" ")}`);
    chatWriteHistory.splice(chatWriteHistory.length - 2, 1);
});

// shhh nothing to see here
addCommand("funne", (args) => {
    let url = Math.random() >= 0.5 ?
              "https://tlras.s-ul.eu/aXq170dD.jpg" :
              "https://bigrat.monster/media/bigrat.png" ;
    
    informUser(
        `<img style='max-width:100%;max-height:100%'
        src='${url}' />`,
        true
    );
});