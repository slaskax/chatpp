/// <reference path="autofilter.ts" />

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
        string: Set<string>,
        username: Set<string>,
        nickname: Set<string>,
        id?: Set<number>
    };
    private static auto: Autofilter;

    private constructor() {
        Filter.rules = {
            string: new Set(),
            username: new Set(),
            nickname: new Set(),
            id: new Set()
        };

        // Load data from localStorage if it exists.
        let ls_data = localStorage.getItem(FILTER_KEY);
        if (ls_data) {
            // Convert the saved arrays into Set objects.
            let dec = JSON.parse(ls_data);
            for (let i in dec)
                dec[i] = new Set(dec[i]);

            Filter.rules = Object.assign(Filter.rules, dec);
        }
        Filter.auto = Autofilter.get_instance();
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
        let copy: {[key: string]: Set<any> | any[]} = Object.assign({}, Filter.rules);

        // Remove IDs since they frequently change.
        delete copy.id;

        // Convert sets to arrays for storage.
        for (let i in copy)
            copy[i] = [...copy[i].values()];

        localStorage.setItem(FILTER_KEY, JSON.stringify(copy));
    }

    public reset_rules() {
        Filter.rules.id?.clear();
        Filter.rules.nickname.clear();
        Filter.rules.string.clear();
        Filter.rules.username.clear();

        Filter.save_data();
    }

    public add_rule(kind: FilterTypes, data: any) {
        switch (kind) {
        case FilterTypes.Username:
            if (typeof data !== "string") throw Error();

            if (!Filter.rules.username.has(data)) {
                Filter.rules.username.add(data);
                Filter.save_data();
                return;
            }

            break;
        case FilterTypes.Nickname:
            if (typeof data !== "string") return;

            if (!Filter.rules.nickname.has(data)) {
                Filter.rules.nickname.add(data);
                Filter.save_data();
                return;
            }

            break;
        case FilterTypes.String:
            if (typeof data !== "string") throw Error();

            if (!Filter.rules.string.has(data)) {
                Filter.rules.string.add(data);
                Filter.save_data();
                return;
            }

            break;
        case FilterTypes.ID:
            if (typeof data !== "number") throw Error();

            if (!Filter.rules.id?.has(data)) {
                Filter.rules.id?.add(data);
                Filter.save_data();
                return;
            }

            break;
        }

        /* If this point has been reached (i.e. return wasn't called), then
         * the rule must already exist, and we'll inform the user of this */
        throw "Rule already exists.";
    }

    public del_rule(kind: FilterTypes, data: any) {
        let idx;

        switch (kind) {
        case FilterTypes.Username:
            if (typeof data !== "string") throw Error();

            if (!Filter.rules.username.has(data)) break;

            Filter.rules.username.delete(data);
            return;
        case FilterTypes.Nickname:
            if (typeof data !== "string") throw Error();

            if (!Filter.rules.nickname.has(data)) break;

            Filter.rules.nickname.delete(data);
            return;
        case FilterTypes.String:
            if (typeof data !== "string") throw Error();

            if (!Filter.rules.string.has(data)) break;

            Filter.rules.string.delete(data);
            return;
        case FilterTypes.ID:
            if (typeof data !== "number") throw Error();

            if (!Filter.rules.id?.has(data)) break;

            Filter.rules.id?.delete(data);
            return;
        }

        /* If this point has been reached (i.e. return wasn't called), then
         *the rule must not exist, and we'll inform the user of this */
        throw "Rule does not exist.";
    }

    public should_filter(event: OWOTData): boolean {
        // Case-insensitive check for disallowed strings.
        for (const i of Filter.rules.string) {
            if (event.message.toLowerCase().includes(i.toLowerCase())) {
                return true;
            }
        }

        // Case-sensitive check for disallowed nicknames.
        if (Filter.rules.nickname.has(event.nickname))
            return true;
        
        // Check for disallowed users.
        if (Filter.rules.username.has(event.realUsername))
            return true;
        
        // Check for disallowed IDs.
        if (Filter.rules.id?.has(event.id))
            return true;
        
        // See if the auto-filter has any issue with it.
        if (Filter.auto.should_filter(event))
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