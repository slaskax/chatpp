w.on("chatmod", (e: OWOTData) => {
    if (e.type.startsWith("anon")) {
        // Fix color if its been auto-assigned. 
        if (e.color === assignColor(e.nickname))
            e.color = "#000000";
        
        e.type = "user_nick";
        e.realUsername = "(anon)";
        e.nickname = e.nickname ? `[*${e.id}] ${e.nickname}` : `[${e.id}]`;
    }
});