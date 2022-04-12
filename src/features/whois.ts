/// <reference path="anon_colors.ts" />

type UserRecord = {
    user?: string;
    nick: string;
    id: number;
    last_message: number;
};

// A mapping between usernames and their last seen ID.
let user_data: {[key: string]: UserRecord};
let user_data_index = {
    "user": {} as {[key: string]: string},
    "id": {} as {[key: number]: string}
};

// Updates user_data with the relevent info.
w.on("chat", (e: OWOTData) => {
    let r: UserRecord = {nick: e.nickname, id: e.id, last_message: e.date}
    
    user_data[e.channel] = r;
    user_data_index.id[e.id] = e.channel;
    user_data_index.user[e.realUsername] = e.channel;
});