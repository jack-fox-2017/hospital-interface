const readline = require('readline')
var ModelTodoList = require('./model')
var viewList = require('./view')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

class Hospital {
  constructor(name, location, patients, user, data) {
    this.name = name
    this.location = location
    this.patients = ModelTodoList.pasienFile('./dataPasien.json')
    this.user = null
    this.data = ModelTodoList.readAFile('./dataPegawai.json') //employess
  }

  //clear data
  clear() {
    console.log("\x1B[2J")
  }

  //back
  back(){
    rl.question('\nTekan ENTER untuk kembali ke menu utama', (input)=>{
      if(!input){
        this.welcomeUser(this.user)
      }
      else{
        this.back()
      }
    })
  }

  //start playing
  startPlay(){
    console.log(`\n----------------------- SISTEM INFORMASI RS ${this.name} ----------------------- \
    \n\ Alamat : ${this.location}\
    \n--------------------------------------------------------------------------------`);
    rl.question('\nPilih role access \
    \n[1].Pasien \
    \n[2].Pegawai \
    \n\nMasukan pilihan dengan angka : ',(input) => {
      if (input == '1') {
        console.log('Hai Pasien, Silahkan Masukan User dan Password');
        this.loginPasien()
      } else if(input == '2'){
        console.log('Hai Pegawai, Silahkan Masukan User dan Password');
        this.loginPegawai()
      } else{
        //this.clear()
        this.startPlay()
        console.log('pilihan anda tidak ada');
      }
    })
  } //method

  //login Pegawai
  loginPegawai(){
    this.clear()
    rl.question('Masukan Username : ', input => {
      this.data.forEach(d => {
        if(input === d.user){
          this.user = d //harus push data u/ cek useritu passnya apa
          console.log(d);
          return this.passwordUser()
        }
      })
      return this.loginPegawai()
    })
  }

  //password
  passwordUser(){
    rl.question('Masukan Password : ', (input) =>{
      if (input === this.user.password) {
        return this.welcomeUser();
      } else return this.passwordUser()
    })
  }

  //welcome page
  welcomeUser(){
    this.clear()
    console.log(`Halo, ${this.user.position} ${this.user.user}`)
    this.menuUser()
  }

  //menu utama
  menuUser(){
      console.log(`-------------------------------------- MENU -------------------------------------`);
      switch (this.user.position) {
        case "Admin":
          console.log(`\[1] Logout \
            \n[2] Lihat Dokter \
            \n[3] Cari Dokter <nama>\
            \n[4] Lihat Pasien [ID:REKAM MEDIK] \
            \n[5] Cari Pasien <id>\
            \n[6] Tambah Pasien \
            \n[7] Tambah Pegawai\
            \n[8] Daftar Pegawai\
            \n[9] Cari Pegawai <id>\
            \n[10] Hapus Pasien <id>\
            \n[11] Hapus Pegawai <id>`);
          break;
        case "Dokter":
        case "Resepsionis":
          console.log(`\[1] Logout \
            \n[2] Lihat Dokter \
            \n[3] Cari Dokter <nama>\
            \n[4] Lihat Pasien [ID:REKAM MEDIK]\
            \n[5] Cari Pasien <id>`);
          break;
        case "Pasien" :
          console.log(`\[1] Logout \
            \n[2] Lihat Dokter  \
            \n[3] Cari Dokter <nama>`);
          break;
        default:
          console.log(`[1] Logout`);
      }
      this.command()
  }

  //command
  command(){
    rl.question('\nPilih Menu: ', (input)=>{
      switch(input.split(' ')[0]){
        case '1': this.User = [];this.clear();this.startPlay();break   //ok
        case '2': this.dokterData(); break
        case '3': this.cariDokter(input.split(' ')[1]);break
        case '4': this.pasienData();break  //lihat data pasien  OK
        case '5': this.cariPasien(input.split(' ')[1]);break  //cari pasien
        case '6': this.tambahPasien();break
        case '7': this.tambahPegawai();break
        case '8': this.readData();break
        case '9': this.cariPegawai(input.split(' ')[1]);break
        case '10': this.hapusPasien(input.split(' ')[1]); this.back();break
        case '11': this.hapusPegawai(input.split(' ')[1]);break
      }
    })
  }

  //read Pegawai
  readData(){
    this.data
    viewList.showList(this.data)
    this.back()
  }

  //read Pasien
  pasienData(){
    this.patients
    viewList.showPasien(this.patients)
    this.back()
  }

  //lihat pasien
  cariPasien(id){
    viewList.findPasien(id)
    this.back()
  }

  //daftar Dokter
  dokterData(){
    this.patients
    viewList.showDokter(this.data)
    this.back()
  }

  //cari dokter
  cariDokter(name){
    viewList.findDokter(name)
    this.back()
  }

  //tambah pasien
  tambahPasien(data){
    if(data !== undefined){
      this.patients.push(data)
    } else {
      rl.question('\ Menu Tambah Pasien :\
        \n Masukkan: [ID],[Name],[Keluhan],[Buat: Username],[Buat: Password]\
        \n Contoh: 7,Cinta,Sakit Hati,sama,Yono \n',(input) =>{
        let dataBaru = input.split(',');

        let a = new Patient(this.patients.length+1,dataBaru[1],dataBaru[2],dataBaru[3],dataBaru[4])

        this.patients.push(a)

        this.clear()
        console.log(`\nData pasien baru berhasil ditambahkan!\
          \nNama:${dataBaru[1]}\
          \nKeluhan:${dataBaru[2]}\
          \nUsername:${dataBaru[3]}\
          \nPassword:${dataBaru[4]}`)
        ModelTodoList.addPasien(this.patients)
        this.back()
      })
    }
  }

  //hapuspasien
  hapusPasien(id){
    for(var i = 0; i < this.patients.length; i++) {
      if(this.patients[i].id == id){
        console.log(`Success Delete '${this.patients[i].id} ${this.patients[i].nama}' from your List`);
        this.patients.splice(i, 1)
      }
    }
    ModelTodoList.deletePasien(this.patients)
    this.pasienData()
  }

  //login pasien --just pasient
  loginPasien(){
    this.clear()
    rl.question('Masukan Username : ', input => {
      this.patients.forEach(d => {
        if(input === d.user){
          this.user = d //harus push data u/ cek useritu passnya apa
          return this.passwordUser()
        }
      })
      return this.loginPegawai()
    })
  }

  //lihat pasien
  cariPegawai(id){
    viewList.findPegawai(id)
    this.back()
  }

  //tambah pegawai
  tambahPegawai(dataEmployee){
    if(dataEmployee !== undefined){
      this.data.push(dataEmployee)
    } else {
      rl.question('\ Tambah Pegawai :\
        \n Masukkan: [ID],[Name],[Positon],[Buat: Username],[Buat: Password]\
        \n Contoh: 7,Cinta,Dokter,sampai,esoksaja \n',(input) =>{
        let dataBaru = input.split(',');

        let b = new Employee(this.data.length+1,dataBaru[1],dataBaru[2],dataBaru[3],dataBaru[4])

        this.data.push(b)

        this.clear()
        console.log(`\nData Pegawai Baru sudah ditambahkan!\
          \nNama:${dataBaru[1]}\
          \nPosisi:${dataBaru[2]}\
          \nUsername:${dataBaru[3]}\
          \nPassword:${dataBaru[4]}`)
        ModelTodoList.addPegawai(this.data)
        this.back()
      })
    }
  }

  hapusPegawai(id){
    for(var i = 0; i < this.data.length; i++) {
      if(this.data[i].id == id){
        console.log(`Success Delete '${this.data[i].id} ${this.data[i].nama}' from your List`);
        this.data.splice(i, 1)
      }
    }
    ModelTodoList.deletePegawai(this.data)
    this.readData()
  }

}

class Patient {
  constructor(id, nama, diagnosa, user, password) {
    this.id = id
    this.nama = nama
    this.position = "Pasien"
    this.diagnosa = diagnosa
    this.user = user
    this.password = password
  }
}

class Employee {
  constructor(id, nama, position, user, password) {
    this.id = id
    this.nama = nama
    this.position = position
    this.user = username
    this.password = password
  }
}


let hospital = new Hospital('HARAPAN JIWA','Jl. Ni Bootcamp Dengan Have Fun\
\n          Pondok Indah\
\n          Jakarta Selatan')
console.log(hospital.startPlay());
//hospital.tambahPasien(new Patient('Tono','Meriang','tono','tono12'))
//console.log(hospital.readData());
//console.log(hospital.menuUser());

// let hospital = Hospital.startPlay('HARAPAN JIWA','Jl. Ni Bootcamp Dengan Have Fun\
// \n          Pondok Indah\
// \n          Jakarta Selatan')
