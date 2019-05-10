const util = require('util');

// import {promisify} from 'util';
// const {promisify} = require('util');
const testFolder = 'mychatwidget';
const fs = require('fs');
// const readdir = util.promisify(fs.readdir);


const readdir = util.promisify(fs.readdir, (resolve, reject) => {
  resolve('ok');
});

  async function displayData(testFolder) {
    try {
      let data = await readdir(testFolder)//, (err, files) => {
      let intermediateData = data.map(async (file) => {
        let returnObject = {};
        returnObject.value = file;
        returnObject.id = testFolder + '/' + file;
        let filenamearray = file.split('');
        if (filenamearray[0] !== '.' && file !== 'node_modules') {
          if (fs.lstatSync(testFolder + '/' + file).isDirectory()) {
            let functionResponse = await displayData(testFolder + '/' + file);
            returnObject.data = functionResponse;
            returnObject.type = 'folder';
            return returnObject;
          } else {
            returnObject.type = 'text';
            return returnObject;

          }
        }
       else
       returnObject.type = 'text';
        return returnObject;
      });
      return Promise.all(intermediateData).then(result => result)
    } catch (e) {
      console.log(e);
    }
  // })

};
// displayData(testFolder)
//   .then(response => {
//     console.log(response);
//     // console.log(response[8])
//   })

module.exports.displayData = displayData;