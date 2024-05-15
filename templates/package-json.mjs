const getPackageJsonContent = obj => {
return `
{
    "name": "${obj.themeName}",
    "version": "1.0.0",
    "devDependencies": {
      "gulp": "^4.0.2",
      "gulp-concat": "^2.6.1",
      "gulp-sass": "^5.1.0",
      "sass": "^1.77.1"
    },
    "type": "module"
}`;
}

export default getPackageJsonContent;