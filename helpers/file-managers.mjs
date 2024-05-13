import * as fs from 'fs';

// Creates files using ( 'file name', '.fileFormat', 'content' )
const createFile = (name, format, content) => {
    try {
      fs.writeFileSync(`./${name}.${format}`, content);
    } catch (err) {
      console.log(err);
    }
  };

export { createFile };