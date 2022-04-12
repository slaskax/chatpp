declare function assignColor(nick: string): string;
declare var client_commands : {[key: string]: Function};
declare function getDate() : number;
declare namespace w {
    export function on(event: string, func: Function);
    export var events: {[key: string]: Function[]};
};
declare function addChat(
    chatfield: string?,
    id: number,
    type: string,
    nickname: string?,
    message: string?,
    realUsername: string?,
    op: boolean,
    admin: boolean,
    staff: boolean,
    color: string?,
    date: number,
    dataObj: object? = null
);
declare var chatWriteHistory: string[];
declare function api_chat_send(message: string, opts?: object);
declare namespace network {
    export function chat(message: string, location: string, nickname: string, color: string);
};
declare var selectedChatTab: number;
declare namespace YourWorld {
    export var Nickname: string;
    export var Color: number;
};
declare var defaultChatColor: number;
declare function html_tag_esc(text: string, nbsp?: boolean, nl?: boolean): string;
declare var elm: {[key: string]: HTMLElement};
declare function resizeChat(width: number, height: number): [number, number];
declare function byId(id: string): HTMLElement;

type OWOTData = {[key: string]: any};