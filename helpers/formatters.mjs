/* 
    Formatting related functions
*/

// Removes all whitespaces in a string
const removeWhiteSpaces = (str) => str.replace(/\s+/g, "");

// Moves up one folder from the provided path
const removeLastFolder = (path) => {
  if (path.slice(-1) === "/") {
    // If it ends in a slash ".../"
    if (path.length <= 1) {
      // If it's only a slash "/"
      return path;
    }
    // Remove last character
    path = path.slice(0, -1);
  }
  const lastSlashIndex = path.lastIndexOf("/");
  if (lastSlashIndex !== -1) {
    // Cut string from start till last slash index
    return path.slice(0, lastSlashIndex);
  }
  // Return string as is
  return path;
};

// Check if user is in brix folder
const isUserInBrixFolder = (path) => {
  if (path.slice(-1) === "/") {
    // If it ends in a slash ".../"
    if (path.length <= 1) {
      // If it's only a slash "/"
      console.log("You must be in /brix-tdk");
      return false;
    }
    // Remove last character
    path = path.slice(0, -1);
  }
  const lastSlashIndex = path.lastIndexOf("/");
  path = path.slice(lastSlashIndex, path.length);
  if (path !== "/brix-tdk") {
    console.log("You must be in /brix-tdk");
    return false;
  }
  return true;
};

export { removeWhiteSpaces, removeLastFolder, isUserInBrixFolder };
