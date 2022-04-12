class Autofilter {
    // Not implemented yet.
    private static instance: Autofilter;
    private constructor() {};

    // Get an instance of the Autofilter singleton.
    public static get_instance(): Autofilter {
        if (!Autofilter.instance)
            Autofilter.instance = new Autofilter();
        
        return Autofilter.instance;
    }

    public should_filter(_e: OWOTData) {
        return false;
    }
}
