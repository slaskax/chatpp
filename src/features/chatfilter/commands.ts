/// <reference path="filter.ts" />
/// <reference path="../../usage.ts" />

// Functionality that is shared between /block and /unblock.
let core_subcommands = {
    user: (args: string[], callback: (user: string) => {}) => {
        if (args.length === 1)
            throw "Invalid username.";

        callback(args[0]);
    },
    nick: (args: string[], callback: (nick: string) => {}) => {
        if (args.length < 1)
            throw "Invalid number of args.";

        let nick = args.join(" ");
        callback(nick);
    },
    string: (args: string[], callback: (str: string) => {}) => {
        if (args.length < 1)
            throw "Invalid number of args.";

        let str = args.join(" ");
        callback(str);
    },
    id: (args: string[], callback: (id: number) => {}) => {
        if (args.length < 1)
            throw "Invalid number of args.";

        for (let i = 0; i < args.length; ++i) {
            let id = parseInt(args[i]);
            if (Number.isNaN(id))
                throw args.length == 1 ?
                    'Invalid ID.' :
                    `Invalid ID in position ${i}`;

            callback(id);
        }
    }
}

/*************************************
 * /block functions / command
 *************************************/

let block_subcommands = {
    list: (args: string[]) => {
        let out = "Your block list:\n";
        let filter_rules = Filter.get_instance().get_rules();
    
        out += `=== Strings (${filter_rules.string.length})\n`;
        for (const i of filter_rules.string) {
            out += `  * ${html_tag_esc(i)}\n`;
        }
    
        out += `=== Nicknames (${filter_rules.nickname.length})<br>`;
        for (const i of filter_rules.nickname) {
            out += `  * ${html_tag_esc(i)}\n`;
        }
    
        out += `=== Users (${filter_rules.username.length})<br>`;
        for (const i of filter_rules.username) {
            out += `  * ${html_tag_esc(i)}\n`;
        }
    
        out += `=== IDs (${filter_rules.id?.length})<br>`; // @ts-ignore
        for (const i of filter_rules.id) {
            out += `  * ${html_tag_esc(i.toString())}\n`;
        }
    
        informMono(out);
    },
    user: (args: string[]) => {
        core_subcommands.user(args, (user) => {
            Filter.get_instance().add_rule(FilterTypes.Username, user);
        });
    },
    nick: (args: string[]) => {
        core_subcommands.nick(args, (id) => {
            Filter.get_instance().add_rule(FilterTypes.Nickname, nick);
        });
    },
    string: (args: string[]) => {
        core_subcommands.string(args, (str) => {
            Filter.get_instance().add_rule(FilterTypes.String, str);
        });
    },
    id: (args: string[]) => {
        core_subcommands.id(args, (id) => {
            Filter.get_instance().add_rule(FilterTypes.ID, id);
        });
    }
}

addCommandDoc("block list", "Shows your block list.");
addCommandDoc("block string", "Blocks a specific piece of text.", [["str", true]]);
addCommandDoc("block user", "blocks a specific user.", [["username", true]]);
addCommandDoc("block nick", "Blocks someone with a specific nickname.", [["nick", true]]);
addCommandDoc("block id", "Blocks someone with a specific ID.", [["str", true]]);
addCommand("block", (args) => {
    if (args.length < 1) {
        informUser("Not enough arguments provided.", false);
        return;
    }

    // Match subcommand to function and print message if error thrown.
    let nargs = args.slice(1)
    try {
        switch (args[0]) {
            case "list":
                block_subcommands.list();
                break;
            case "user":
                block_subcommands.user(nargs);
                break;
            case "nick":
                block_subcommands.nick(nargs);
                break;
            case "string":
                block_subcommands.string(nargs);
                break;
            case "id":
                block_subcommands.id(nargs);
                break;
            default:
                throw "Invalid subcommand.";
        }
    } catch (msg: string) {
        informUser(msg, false);
    }
});

/*************************************
 * /unblock functions / command
 *************************************/

let unblock_subcommands = {
    all: () => {
        Filter.get_instance().reset_rules();
    },
    user: (args: string[]) => {
        core_subcommands.user(args, (user) => {
            Filter.get_instance().del_rule(FilterTypes.Username, user);
        });
    },
    nick: (args: string[]) => {
        core_subcommands.nick(args, (id) => {
            Filter.get_instance().del_rule(FilterTypes.Nickname, nick);
        });
    },
    string: (args: string[]) => {
        core_subcommands.string(args, (str) => {
            Filter.get_instance().del_rule(FilterTypes.String, str);
        });
    },
    id: (args: string[]) => {
        core_subcommands.id(args, (id) => {
            Filter.get_instance().del_rule(FilterTypes.ID, id);
        });
    }
}

addCommandDoc("unblock all", "Unblocks everything; resets the block list.");
addCommandDoc("unblock string", "Unblocks a specific piece of text.", [["str", true]]);
addCommandDoc("unblock user", "Unblocks a specific user.", [["username", true]]);
addCommandDoc("unblock nick", "Unblocks someone with a specific nickname.", [["nick", true]]);
addCommandDoc("unblock id", "Unblocks someone with a specific ID.", [["str", true]]);
addCommand("unblock", (args) => {
    if (args.length < 1) {
        informUser("Not enough arguments provided.", false);
        return;
    }

    let nargs = args.slice(1)
    try {
        switch (args[0]) {
            case "all":
                unblock_subcommands.all();
                break;
            case "user":
                unblock_subcommands.user(nargs);
                break;
            case "nick":
                unblock_subcommands.nick(nargs);
                break;
            case "string":
                unblock_subcommands.string(nargs);
                break;
            case "id":
                unblock_subcommands.id(nargs);
                break;
            default:
                throw "Invalid subcommand.";
        }
    } catch (msg: string) {
        informUser(msg, false);
    }
});