const GRIDSIZE_ALIASES: {[key: string]: string} = {
    "default": "10x18",
    "sqaure": "18x18",
    "half": "10x20",
    "mixed": "18x20",
}

client_commands.gridsize = new Proxy(client_commands.gridsize, {
    apply: (func, _, args) => {
        if (args.length !== 0 && GRIDSIZE_ALIASES.hasOwnProperty(args[0]))
            args[0] = [GRIDSIZE_ALIASES[args[0]]];
        
        func(...args);
    }
});