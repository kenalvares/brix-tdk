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

export { removeWhiteSpaces, removeLastFolder };
