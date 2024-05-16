// Removes all whitespaces in a string
const removeWhiteSpaces = (str) => str.replace(/\s+/g, "");

const goUpFolder = (path) => {
  if (path.slice(-1) === "/") {
    if (path.length <= 1) {
      return path;
    }
    path = path.slice(0, -1);
  }
  const lastSlashIndex = path.lastIndexOf("/");
  if (lastSlashIndex !== -1) {
    return path.slice(0, lastSlashIndex);
  }
  return path;
};

export { removeWhiteSpaces, goUpFolder };
