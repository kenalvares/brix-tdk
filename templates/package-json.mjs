const getPackageJsonContent = obj => {
return `
{
  "name": "${obj.themeSlug}",
  "version": "${obj.themeVersion}",
  "type": "module",
  "main": "gulpfile.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "${obj.themeAuthorName}",
  "license": "${obj.themeLicenseName}",
  "description": ""
}
`;
}

export default getPackageJsonContent;