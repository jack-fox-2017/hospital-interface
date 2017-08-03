const fs = require('fs')

const DBpasien = './dataPasien.json'
const DBpegawai = './dataPegawai.json'

class Model{

  static writeData(data){
    let dataJSON = JSON.stringify(data, null, ' ');
    fs.writeFile(DBpasien,dataJSON), function(err) {
      if(err) throw err;
      return console.log('data.json berhasil di update');
    }
  }

  static writeDataPegawai(data){
    let dataJSON = JSON.stringify(data, null, ' ');
    fs.writeFile(DBpegawai,dataJSON), function(err) {
      if(err) throw err;
      return console.log('data.json berhasil di update');
    }
  }

  static dataRS(){
    let dataRS = {
      nama: `RS Semoga Lekas Sembuh`,
      alamat: `Telukjambe Karawang, Jawa Barat`,
      jumlah_pasien: 100
    }
    return dataRS
  }

  static dataPegawai(){
    let data = fs.readFileSync(DBpegawai,'utf-8');
    let dataJSON = JSON.parse(data);
    return dataJSON
  }

  static dataPasien(){
    let data = fs.readFileSync(DBpasien,'utf-8');
    let dataJSON = JSON.parse(data);
    return dataJSON
  }

  static writeDataPasien(data){
    let dataJSON = JSON.stringify(data, null, ' ');
    fs.writeFile(DBpegawai,dataJSON), function(err) {
      if(err) throw err;
      return console.log('data.json berhasil di update');
    }
  }
}

module.exports = Model;
