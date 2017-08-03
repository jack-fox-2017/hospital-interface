const readline = require('readline');
const fs = require('fs');
// const Dokter = require('./dokter');
// const Reception = require('./reception');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Hospital {
  constructor(name, location, employees, patients) {
    this.name = 'RS. HARAPAN BUNDA'//name
    this.employees = employees
    this.patients = patients
    this.location = 'Jl. Raya Pondok Indah Jakarta Selatan'//location
    this.dataEmployee = './employee.json'
    this.dataPatient = './patient.json'
    this.whoami = ''
  }

  runApp(){
    this.clear()
    rl.question('\nMasukkan Username: ', (input)=>{
      let getData = this.readEmployee()
      // console.log(getData);
      for(let i = 0; i < getData.length; i++){
        if(input == getData[i].username){
          this.cekPassword(i)
        }

      }
      this.runApp()
    })
  }
  cekPassword(id){
    rl.question('\nMasukkan Password: ', (input)=>{
      let getData = this.readEmployee()
        if(input == getData[id].password){
          if(getData[id].position === 'admin'){
            this.whoami = 'admin'
            this.menuAdmin()
          } else if(getData[id].position === 'dokter'){
            this.whoami = 'dokter'
            this.menuAdmin()
            // this.menuDokter()
          } else if(getData[id].position === 'receptionist'){
            this.whoami = 'receptionist'
            this.menuAdmin()
            // this.menuReceptionist()
          } else if(getData[id].position === 'office boy'){
            this.menuOB(getData[id].name)
          } else {
            this.runApp()
          }
        } else {
          this.runApp()
        }
    })
  }

  menuAdmin(){
    if(this.whoami == 'admin'){
      this.clear()
      // console.log(this.whoami + '********************');
      console.log(`
        --- Menu Sistem Admin ---
        [1] Tambah Pegawai
        [2] Daftar Pegawai
        [3] Hapus Pegawai
        [4] Tambah Pasien
        [5] Daftar Pasien
        [6] Hapus Pasien
        [7] Tambah Rekam Medis
        [8] Hapus Rekam Medis
        [9] Logout`);
      rl.question('\nPilih Menu dengan mengetik angka: ', (input)=>{
        if(input == 1){
          this.tambahEmployee()
        } else if(input == 2){
          this.showEmployee()
        } else if(input == 3){
          this.delEmployee()
        } else if(input == 4){
          this.tambahPatient()
        } else if(input == 5){
          this.showPatient()
        } else if(input == 6){
          this.delPatient()
        } else if(input == 7){
          this.addRekam()
        } else if(input == 8){
          this.delRekam()
        } else if(input == 9){
          this.logout()
        } else {
          this.logout()
        }
      })
    } else if (this.whoami == 'dokter') {
      this.clear()
      // console.log(this.whoami + '********************');

      console.log(`
        --- Menu Sistem Dokter ---
        [1] Daftar Pasien
        [2] Tambah Rekam Medis
        [3] Hapus Rekam Medis
        [4] Logout`);
      rl.question('\nPilih Menu dengan mengetik angka: ', (input)=>{
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
    } else if (this.whoami == 'receptionist') {
      this.clear()
      // console.log(this.whoami + '********************');

      console.log(`
        --- Menu Sistem Receptionist ---
        [1] Tambah Pasien
        [2] Daftar Pasien
        [3] Hapus Pasien
        [4] Tambah Rekam Medis
        [5] Hapus Rekam Medis
        [6] Logout`);

      rl.question('\nPilih Menu dengan mengetik angka: ', (input)=>{
        if (input == 1) {
          this.tambahPatient()
        } else if (input == 2) {
          this.showPatient()
        } else if (input == 3) {
          this.delPatient()
        } else if (input == 4) {
          this.addRekam()
        } else if (input == 5) {
          this.delRekam()
        } else {
          this.logout()
        }
      })
    }
  }
  menuDokter(){
    // let getMenu = new Dokter()
    // getMenu.menuAdmin()
  }
  menuReceptionist(){
    // let getMenu = new Reception()
    // getMenu.menuAdmin()
  }
  menuOB(user){
    console.log(`Halo ${user}`);
    console.log(`
      --- Maaf anda tidak punya hak akses ---
      [1] Logout`);
    rl.question('\nPilih Menu dengan mengetik angka: ', (input)=>{
      if(input === 1){
        this.logout()
      } else {
        this.logout()
      }
    })
  }

//Employee Methods
  readEmployee(){
    return JSON.parse(fs.readFileSync(this.dataEmployee, 'utf8'))
  }

  addEmployee(str){
    let allData = []
    let getData = JSON.parse(fs.readFileSync(this.dataEmployee, 'utf8'))
    for(let i = 0; i < getData.length; i++){
      allData.push(getData[i])
    }
    let newData = str.split(', ')

    allData.push(new Employee(newData[0], newData[1], newData[2], newData[3]))
    fs.writeFileSync('employee.json',JSON.stringify(allData, null, 2));
    this.menuAdmin()
  }

  tambahEmployee(){
    this.clear()
    console.log(`
      MENU TAMBAH PEGAWAI BARU

      Format Penulisan:
      nama-pegawai, posisi, username, password
      Fakhrul Azhim, dokter, drAchim, passKeren

      *) setiap data dibatasi oleh koma (,)`);
      rl.question('\nJika format telah sesuai tekan Enter!!!  ', (input) => {
        this.addEmployee(input)
      })
  }

  showEmployee(){
    this.clear()
    let dataEmployee = this.readEmployee()
    // console.log('Name       | Position           | Username        | Password');
    for(let i = 0; i < dataEmployee.length; i++){
    console.log(`
      Data ke  : ${i+1}
      Nama     : ${dataEmployee[i].name}
      Position : ${dataEmployee[i].position}
      Username : ${dataEmployee[i].username}
      Password : ${dataEmployee[i].password}\n`);
    }
    rl.question('\nTekan ENTER untuk kembali ke MENU\n', () => {
      this.menuAdmin()
    })
  }


  delEmployee(){
    this.clear()
    let dataEmployee = this.readEmployee()
    // console.log('Name       | Position           | Username        | Password');
    for(let i = 0; i < dataEmployee.length; i++){
    console.log(`
      Data ke  : ${i+1}
      Nama     : ${dataEmployee[i].name}
      Position : ${dataEmployee[i].position}\n`);
    }
    rl.question(`
      Masukkan angka Data untuk menghapus Pegawai
      Untuk membatalkan ketik back
      `, (input) => {
        if(input === 'back'){
          this.menuAdmin()
        } else {
          let indeks = input-1
          this.hapusPegawai(indeks)
        }
      })
  }

  hapusPegawai(indeks){
    let allData = []
    let data = this.readEmployee()
    for (let i=0; i<data.length; i++) {
      // console.log(iddelete + '=======' + data[i].id);
      if(indeks != i){
        allData.push(data[i])
      }
    }
    fs.writeFileSync('employee.json',JSON.stringify(allData, null, 2));
    this.menuAdmin()
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
    rl.question(`
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
    rl.question('Tekan ENTER untuk kembali ke MENU\n', () => {
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
    rl.question(`
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
    rl.question(`
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
    rl.question(`
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
    rl.question(`
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
    rl.question(`
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
    rl.close();
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

let run = new Hospital()
run.runApp()
// console.log(run.readEmployee());
// console.log(run.readPatient());
// console.log(run.addPatient('Nasikin'));
module.exports = Hospital;
