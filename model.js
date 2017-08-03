let fs = require('fs')

class ModelTodoList{
  //read file for LIST
  static readAFile(file){
    let data = fs.readFileSync(file , 'utf-8')
    let data_json = JSON.parse(data)
    return data_json
  }

  static pasienFile(file){
    let data = fs.readFileSync(file , 'utf-8')
    let data_json = JSON.parse(data)
    return data_json
  }

  static addPasien(newData){
    let file = fs.writeFile('dataPasien.json', JSON.stringify(newData,null,2), 'utf-8', (err) => {
      if (err) throw err;
    })
  }

  static deletePasien(id){
    let file = fs.writeFile('dataPasien.json', JSON.stringify(id,null,2), 'utf-8', (err) => {
      if (err) throw err;
    })
  }

  static addPegawai(newData){
    let file = fs.writeFile('dataPegawai.json', JSON.stringify(newData,null,2), 'utf-8', (err) => {
      if (err) throw err;
    })
  }

  static deletePegawai(id){
    let file = fs.writeFile('dataPegawai.json', JSON.stringify(id,null,2), 'utf-8', (err) => {
      if (err) throw err;
    })
  }

}

module.exports = ModelTodoList
