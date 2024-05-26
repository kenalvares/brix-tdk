const getCreateBrixComponentJsCode = obj => {
    return `#!/usr/bin/env node

import * as fs from "fs";
import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });
let component = {};

// Returns the data object of the component entered when typing 'npx create-brix-component <group> <name> <style> <format>'
const getComponentData = () => {
    if (process.argv.length < 6 || process.argv.length > 6) {
    console.log(
        '(!) Please use:\\n\\tnpx create-brix-component <group> <name> <style> <format>'
    );
    process.exit(1);
    } else {
    return {
        group: process.argv[2],
        name: process.argv[3],
        style: process.argv[4],
        format: process.argv[5]}
    }
};

// Main function
const main = () => {
    component = getComponentData();
    process.chdir("components/" + component.group);
    console.log(process.cwd() + "-" + component.style + "." + component.format);
    console.log(component);
};

main();
`;
}

export default getCreateBrixComponentJsCode;