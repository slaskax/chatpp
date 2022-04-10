/// <reference path="globals.ts" />
// Various utility functions used throughout the program.

// Abstraction for addChat().
function informUser(message: string, allow_html: boolean) {
    // Escape text and replace \n with <br> if allow_html is false.
    if (!allow_html)
        message = html_tag_esc(message, false, true);

    addChat(
        null,
        0,
        "user",
        CHATPP_USER[0],
        message,
        CHATPP_USER[0],
        true,
        false,
        false,
        CHATPP_USER[1],
        getDate()
    );
}

/* Allows you to print word-wrapped monospace text in chat. Useful for lists.
 * Does not sanitize message, make sure to do that beforehand. */
function informMono(message: string) {
    informUser(`<pre style='white-space:pre-wrap;'>${message}</pre>`, true);
}

// Allows you to add a command with a check for duplicates.
function addCommand(cmd: string, func: (args: string[]) => any, overwrite = false) {
    if (typeof client_commands[cmd] !== "undefined" && !overwrite) {
        throw `/${cmd} is already defined!`;
    }

    client_commands[cmd] = func;
}
