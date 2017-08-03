const fs = require('fs');

let file = './hospitalData.json';

class ModelHospital{
  static getData(cb){
    let obj = fs.readFile(file, 'utf-8', (err, Data) => {
      return cb(Data);
    });
  }
  static writeData(data){
    let jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(file, jsonData);
  }
}

module.exports = ModelHospital;
