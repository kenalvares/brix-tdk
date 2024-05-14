const getBaseDirScssContent = obj => {
return `/*
This file is used to contain all base imports.
Files inside this folder can contain global styles used in the project.
*/

/*
Import Base files
*/
@import "reset";
@import "typography";
/*
Additonal Base Stylesheets 
*/`;
}

export default getBaseDirScssContent;