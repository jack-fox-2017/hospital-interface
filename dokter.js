// const Hospital = require('./hospital');
const readlined = require('readline');
const fs = require('fs');
const rld = readlined.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Dokter{
  constructor(){
    this.name = 'RS. HARAPAN BUNDA'//name
    this.location = 'Jl. Raya Pondok Indah Jakarta Selatan'
    this.dataEmployee = './employee.json'
    this.dataPatient = './patient.json'
  }

  menuAdmin(){
    this.clear()
    console.log(`
      --- Menu Sistem Dokter ---
      [1] Daftar Pasien
      [2] Tambah Rekam Medis
      [3] Hapus Rekam Medis
      [4] Logout`);
    rld.question('\nPilih Menu dengan mengetik angka: ', (input)=>{
      if(input == 1){
        this.showPatient()
      } else if (input == 2) {
        this.addRekam()
      } else if (input == 3) {
        this.delRekam()
      } else if (input == 4) {
        this.logout()
      } else {
        this.logout()
      }
    })
  }

  //Patient Methods
    readPatient(){
      return JSON.parse(fs.readFileSync(this.dataPatient, 'utf8'))
    }


    addPatient(str){
      let allData = []
      let getData = JSON.parse(fs.readFileSync(this.dataPatient, 'utf8'))
      for(let i = 0; i < getData.length; i++){
        allData.push(getData[i])
      }
      let newID = getData[getData.length-1].id + 1

      allData.push(new Patient(newID, str))
      fs.writeFileSync('patient.json',JSON.stringify(allData, null, 2));
      this.showPatient()
    }

    tambahPatient(){
      this.clear()
      console.log(`
        MENU TAMBAH PASIEN BARU
        `);
      rld.question(`
        Masukkan Nama Lengkap Pasien
        Jika telah sesuai tekan ENTER
        `, (input) => {
          this.addPatient(input)
        })
    }

    showPatient(){
      this.clear()
      console.log('DAFTAR PASIEN');
      let data = this.readPatient()
      for(let i = 0; i < data.length; i++){
        console.log(`
          ID Pasien  : ${data[i].id}
          Name       : ${data[i].name}
          Diagnosis  : ${data[i].diagnosis}`);
      }
      rld.question('Tekan ENTER untuk kembali ke MENU\n', () => {
        this.menuAdmin()
      })
    }

    delPatient(){
      this.clear()
      let data = this.readPatient()
      for(let i = 0; i < data.length; i++){
        console.log(`
          ID Pasien  : ${data[i].id}
          Name       : ${data[i].name}`);
      }
      rld.question(`
        Masukkan ID Pasien untuk menghapus Pasien
        Untuk membatalkan ketik 'back'
        `, (input) => {
          if(input === 'back'){
            this.menuAdmin()
          } else {
            this.hapusPasien(input)
          }
        })
    }

    hapusPasien(idPasien){
      let allData = []
      let data = this.readPatient()
      for (let i=0; i<data.length; i++) {
        // console.log(iddelete + '=======' + data[i].id);
        if(idPasien != data[i].id){
          allData.push(data[i])
        }
      }
      fs.writeFileSync('patient.json',JSON.stringify(allData, null, 2));
      this.menuAdmin()
    }

    addRekam(){
      this.clear()
      console.log('MENU PENAMBAHAN REKAM MEDIS');
      let data = this.readPatient()
      for(let i = 0; i < data.length; i++){
        console.log(`
          ID Pasien  : ${data[i].id}
          Name       : ${data[i].name}
          Diagnosis  : ${data[i].diagnosis}`);
      }
      rld.question(`
        Masukkan ID Pasien untuk penambahan Diagnosis/Rekam Medis
        *) Data sebelumnya akan tertindih oleh data baru yang anda Masukkan
        Untuk membatalkan ketik 'back'
        `, (input) => {
          if(input === 'back'){
            this.menuAdmin()
          } else {
            this.tambahRekam(input)
          }
        })
    }

    tambahRekam(id){
      this.clear()
      let allData = this.readPatient()
      let data = []
      for(let i = 0; i < allData.length; i++){
        if(allData[i].id == id){
          data.push(allData[i])
        }
      }
      console.log(`
        MENU PENAMBAHAN REKAM MEDIS
        ---------------------------
        ID Pasien  : ${data[0].id}
        Name       : ${data[0].name}
        Diagnosis  : ${data[0].diagnosis}
        ---------------------------`);
      rld.question(`
        Masukkan rekam medis, boleh lebih dari satu dan dibatasi dengan koma,
        contoh:
        demam berdarah, gejala tipus, kelelahan
        `, (input) => {
          this.tambahinRekam(id, input)
        })
    }
    tambahinRekam(id, input){
       let data = this.readPatient()
       let newArr = input.split(', ')
       let allData = []
       for(let i = 0; i < data.length; i++){
         if(data[i].id == id){
           data[i].diagnosis = newArr
           allData.push(data[i])
         } else {
           allData.push(data[i])
         }
       }
       fs.writeFileSync('patient.json',JSON.stringify(allData, null, 2));
       this.menuAdmin()
    }

    delRekam(){
      this.clear()
      let data = this.readPatient()
      for(let i = 0; i < data.length; i++){
        console.log(`
          ID Pasien  : ${data[i].id}
          Name       : ${data[i].name}
          Diagnosis  : ${data[i].diagnosis}`);
      }
      rld.question(`
        Masukkan ID Pasien untuk penghapusan Diagnosis/Rekam Medis
        *) Jika tidak yakin ketik 'back'
        Untuk membatalkan ketik 'back'
        `, (input) => {
          if(input === 'back'){
            this.menuAdmin()
          } else {
            this.deleteRekam(input)
          }
        })
    }

    deleteRekam(id){
      this.clear()
      let allData = this.readPatient()
      let data = []
      for(let i = 0; i < allData.length; i++){
        if(allData[i].id == id){
          data.push(allData[i])
        }
      }
      console.log(`
        MENU HAPUS REKAM MEDIS
        ---------------------------
        ID Pasien  : ${data[0].id}
        Name       : ${data[0].name}
        Diagnosis  : ${data[0].diagnosis}
        ---------------------------`);
      rld.question(`
        PERINGATAN : Tindakan ini akan menghapus data rekam medis pasien diatas!!!,
        ketik 'cancel' tanpa petik untuk membatalkan
        tekan ENTER untuk melanjutkan
        `, (input) => {
          if(input === 'cancel'){
            this.menuAdmin()
          } else {
            this.deletinRekam(id)
          }
        })
    }

    deletinRekam(id){
      let data = this.readPatient()
      let allData = []
      for(let i = 0; i < data.length; i++){
        if(data[i].id == id){
          data[i].diagnosis = []
          allData.push(data[i])
        } else {
          allData.push(data[i])
        }
      }
      fs.writeFileSync('patient.json',JSON.stringify(allData, null, 2));
      this.menuAdmin()
    }


    logout(){
      rld.close();
    }

    clear(){
      console.log('\x1Bc');
      console.log('-----------------------------------------------');
      console.log(`----- SELAMAT DATANG DI ${this.name} -----\n     ${this.location}`)
      console.log('-----------------------------------------------');
    }
  }

  class Patient {
    constructor(id, name) {
      this.id = id
      this.name = name
      this.diagnosis = []
    }
  }

  class Employee {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
    }
  }

module.exports = Dokter;
