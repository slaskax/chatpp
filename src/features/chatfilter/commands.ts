/// <reference path="filter.ts" />
/// <reference path="../../usage.ts" />

// Lists everything in the block list.
addCommandDoc("list", "Shows your block list.");
addCommand("list", (args) => {
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
});
