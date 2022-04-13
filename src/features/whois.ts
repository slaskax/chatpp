/// <reference path="anon_colors.ts" />

type UserRecord = {
    user?: string;
    nick: string;
    id: number;
    last_message: number;
};

// A mapping between usernames and their last seen ID.
let user_data: {[key: string]: UserRecord} = {};
let ud_index = {
    "user": {} as { [key: string]: string },
    "id": {} as { [key: number]: string }
};

// Updates user_data with the relevent info.
w.on("chat", (e: OWOTData) => {
    let r: UserRecord = { nick: e.nickname, id: e.id, last_message: e.dataObj.date }

    if (e.realUsername !== "(anon)" /* needed due to anon colors */) {
        r.user = e.realUsername;
        ud_index.user[e.realUsername] = e.dataObj.channel;
    }

    ud_index.id[e.id] = e.dataObj.channel;
    user_data[e.dataObj.channel] = r;
});

addCommand("whois", (args) => {
    if (args.length !== 1) {
        informUser("Invalid number of arguments.", false);
        return;
    }

    // Get record for user.
    let r: UserRecord;
    if (args[0].charAt(0) === "@") {
        let user = args[0].slice(1);
        r = user_data[ud_index.user[user]];

        // Error if entry could not be found.
        if (typeof r === "undefined") {
            informUser(`@${user} hasn't been seen since Chat++ started.`, false);
            return;
        }
    } else {
        let id = parseInt(args[0]);
        if (Number.isNaN(id)) {
            informUser("Invalid ID.", false);
            return;
        }

        r = user_data[ud_index.id[id]];
        if (typeof r === "undefined") {
            informUser(`${id} hasn't been seen since Chat++ started.`, false);
            return;
        }
    }

    // Display info.
    let out = [];
    if (typeof r.user !== "undefined")
        out.push(`Username: ${r.user}`);
    out.push(`Nickname: ${r.nick}`);
    out.push(`ID: ${r.id}`);
    out.push(`Last message: ${(new Date(r.last_message)).toISOString()}`);

    informMono(`\n${out.join("\n")}`);
})