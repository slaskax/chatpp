/// <reference path="utils.ts"  />

let doc_strings: string[] = [];

function addCommandDoc(name: string, desc: string, args?: Array<[string, boolean]>) {
    // Start with the command's name.
    let doc = [`/${name} `]

    // Add each argument of the command (if there are any).
    if (typeof args !== "undefined") {
        for (let i of args) {
            doc.push(i[1] ? `<${i[0]}> ` : `[${i[0]}] `);
        }
    }

    // Give its description and merge into one string.
    doc.push(`- ${desc}`);
    let str = html_tag_esc(doc.join(''));

    // Insert it into the doc_strings then sort.
    doc_strings.push(str);
    doc_strings.sort();
}

// Prints information on how to use the program.
function usage() {
    informMono(doc_strings.join("\n"));
}

// Add the /usage command itself.
addCommandDoc("usage", "Prints this.");
addCommand("usage", usage);