/// <reference path="filter.ts" />
/// <reference path="../../usage.ts" />

// Lists everything in the block list.
function list(args: string[]) {
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
}

// /(un)block commands
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

    let nargs = args.slice(1)
    switch (args[0]) {
    case "list":
        list(nargs);
        break;
    default:
        informUser("Invalid subcommand.", false);
        break;
    }
}, true);

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
    switch (args[0]) {
    case "all":
        Filter.get_instance().reset_rules();
        break;
    default:
        informUser("Invalid subcommand.", false);
        break;
    }
}, true);