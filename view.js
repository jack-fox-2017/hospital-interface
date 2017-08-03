var ModelTodoList = require('./model')
class viewList{
  //show input LIST
  static showList(data){
    console.log(`No. |  Nama    | Jabatan`)
    for (var i = 0; i < data.length; i++) {
      console.log(`${i+1}.  |  ${data[i].nama}   | ${data[i].position}`);
    }
  }

  static showPasien(data){
    console.log(`No. |  Nama    | Diagnosa`)
    for (var i = 0; i < data.length; i++) {
      console.log(`${i+1}.  |  ${data[i].nama}   | ${data[i].diagnosa}`);
    }
  }

  static showDokter(data){
    console.log(`No. | Nama Dokter `)
    for (var i = 0; i < data.length; i++) {
      if (data[i].position === "Dokter") {
        console.log(`${i}. |  ${data[i].nama} `);
      }
    }
  }

  static findPasien(id){
    let data = ModelTodoList.pasienFile('./dataPasien.json')
    for (var i = 0; i < data.length; i++) {
      if(data[i].id == id){
        console.log(`${i+1}.  |  ${data[i].nama}   | ${data[i].diagnosa}`);
      }
    }
  }

  static findPegawai(id){
    let data = ModelTodoList.readAFile('./dataPegawai.json')
    for (var i = 0; i < data.length; i++) {
      if(data[i].id == id){
        console.log(`${i+1}.  |  ${data[i].nama}   | ${data[i].position}`);
      }
    }
  }

  static findDokter(nama){
    let data = ModelTodoList.readAFile('./dataPegawai.json')
    for (var i = 0; i < data.length; i++) {
      if(data[i].nama == nama){
        console.log(`${i+1}.  |  ${data[i].nama} `);
      }
    }
  }

}

module.exports = viewList
