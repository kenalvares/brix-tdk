const getCreateBrixComponentJsCode = obj => {
    return `#!/usr/bin/env node

import * as fs from "fs";
import promptSync from "prompt-sync";
import child_process from "child_process";
const prompt = promptSync({ sigint: true });
let component = {};

// Returns the data object of the component entered when typing 'npx create-brix-component <group> <root> <style>'
const getComponentData = () => {
    if (process.argv.length < 5 || process.argv.length > 5) {
    console.log(
        "(!) Please use:\\n\\tnpx create-brix-component <group> <root> <style>"
    );
    process.exit(1);
    } else {
    return {
        group: process.argv[2],
        root: process.argv[3],
        style: process.argv[4],
        name: process.argv[3]+"-"+process.argv[4]
    };
    }
};

const replaceContents = (file, replacement, cb) => {
    fs.readFile(replacement, (err, contents) => {
    if (err) return cb(err);
    fs.writeFile(file, contents, cb);
    });
};

// Main function
const main = () => {
    // @use "header-centered"
    component = getComponentData();
    process.chdir("./components/" + component.group);
    const sourceComponentPhp = process.cwd() + "/" + component.name + ".php";
    process.chdir("../../scss/components");
    const componentDirScss = process.cwd() + "/__components-dir.scss";
    fs.appendFile(componentDirScss, "@use \\\"" + component.name + "\\\"", (err) => {
        if (err) {
            console.log(err);
        }
    });
    process.chdir("../../../${obj.themeSlug}/components");
    const newComponentPhp = process.cwd() + "/"+ component.root+ "-component.php";
    console.log(sourceComponentPhp, newComponentPhp);

    replaceContents(newComponentPhp, sourceComponentPhp, err => {
    if (err) {
        // handle errors here
        throw err;
    }
    console.log('done');
    });
};

main();
`;
}

export default getCreateBrixComponentJsCode;