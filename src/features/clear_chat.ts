addCommandDoc("clear", "Clears the current chat window.");
addCommand("clear", (args) => {
    // short and simple :)
    byId(selectedChatTab ?
         "global_chatfield" :
         "page_chatfield").innerHTML = '';
});
