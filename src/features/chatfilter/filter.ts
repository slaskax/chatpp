/// Notice: This functionality is not finished yet.

// Where rules will be stored in localStorage.
const FILTER_KEY = "chatpp_filter_rules";

// The things that can be filtered upon.
enum FilterTypes {
    String,
    Username,
    Nickname,
    ID
};

// A singleton object that can be used to filter chat messages.
class Filter {
    private static instance: Filter;
    private static rules: {
        string: string[],
        username: string[],
        nickname: string[],
        id?: number[]
    };

    private constructor() {
        Filter.rules = {string: [], username: [], nickname: [], id: []};

        // Load data from localStorage if it exists.
        let ls_data = localStorage.getItem(FILTER_KEY);
        if (ls_data)
            Filter.rules = Object.assign(Filter.rules, JSON.parse(ls_data));
    };

    // Get an instance of the Filter singleton.
    public static get_instance(): Filter {
        if (!Filter.instance)
            Filter.instance = new Filter();
        
        return Filter.instance;
    }

    // Get the list of rules, used for displaying the list.
    public get_rules() {
        return Filter.rules;
    }

    // Saves changed data to localStorage.
    private static save_data() {
        var copy = Object.assign({}, Filter.rules);
        delete copy.id;

        localStorage.setItem(FILTER_KEY, JSON.stringify(copy));
    }

    public reset_rules() {
        Filter.rules = {string: [], username: [], nickname: [], id: []};
        Filter.save_data();
    }

    public add_rule(kind: FilterTypes, data: any) {
        Filter.save_data();
    }

    public del_rule(kind: FilterTypes, data: any) {
        Filter.save_data();
    }

    public should_filter(event: OWOTData): boolean {
        // Case-insensitive check for disallowed strings.
        for (const i of Filter.rules.string) {
            if (event.message.toLowerCase().includes(i.toLowerCase())) {
                return true;
            }
        }

        // Case-sensitive check for disallowed nicknames.
        if (Filter.rules.nickname.includes(event.nickname))
            return true;
        
        // Check for disallowed users.
        if (Filter.rules.username.includes(event.realUsername))
            return true;
        
        // Check for disallowed IDs.
        if (Filter.rules.id?.includes(event.id))
            return true;

        // If it has passed all checks, then allow it through.
        return false;
    }
}

// The bit that actual does the filtering.
w.events["chatmod"] = w.events["chatmod"] ?? [];
w.events["chatmod"].unshift((e: OWOTData) => {
    if (Filter.get_instance().should_filter(e))
        e.hide = true;
});