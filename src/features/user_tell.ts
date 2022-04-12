/// <reference path="anon_colors.ts" />
/// <reference path="whois.ts" />

// Simple client-side wrapper around /tell to add @[user] functionality.
// /tell is implemented server-side, so we can just use addCommand here.
addCommandDoc(
    "tell",
    "Allows you to privately message by username rather than just id.",
    [["@username", true], ["message", true]]
);
addCommand("tell", (args) => {
    // Replace @[user] with their ID.
    if (args.length > 0 && args[0].charAt(0) === "@") {
        let user = args[0].slice(1);
        if (user_data_index.user.hasOwnProperty(user)) {
            args[0] = user_data[user_data_index.user[user]].id.toString();
        } else {
            informUser(`${user} hasn't been seen since Chat++ started.`, false);
            return;
        }
    }

    // Send an auto-generated /tell command.
    // mmmmmmmmmmm owot chat color logic, my favorite
    let chat_color = (defaultChatColor !== null) ?
                     "#" + ("00000" + defaultChatColor.toString(16)).slice(-6) :
                     (YourWorld.Color) ?
                     "#" + ("00000" + YourWorld.Color.toString(16)).slice(-6) :
                     assignColor(YourWorld.Nickname);

    network.chat(
        `/tell ${args.join(" ")}`,
        (selectedChatTab == 0 ? "page" : "global"),
        YourWorld.Nickname,
        chat_color
    );
}, true /* not really needed but semantically valid */);