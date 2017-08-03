"use strict"

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
    this.pasien = new Patient()
  }

  login () {
    console.log(`---------Wellcome to My ${this.name}-------`);
    console.log(`-------------------------------------------`);
      rl.question('Please enter your username: ', (user) => {
        if(user == this.employees.name){
          rl.question('Please enter your password: ', (pass) => {
            if(pass == this.employees.password){
              console.log(`welcome ${this.employees.name} your akses ${this.employees.password}`);
              this.viewMenu(this.employees.position)
            }
          });
        }
      });
  }

  //bikin method untuk view menu, parameternya role
  viewMenu(role) {
    console.log(`hai ${role}`);
    if(role == 'admin'){
      console.log("1.Logout");
      console.log("2.List Pasien");
      console.log("3.Detail Pasien [ID pasien]");
      console.log("4.Tambah Pasien");
      console.log("5.Hapus Data [ID pasien]");
      console.log("6.Tambah Data Karyawan");
      console.log('7.List Karyawan');
      console.log('8.Hapus Karyawan');
    } else if ( role == 'Doktor'){
      console.log('1. List Pasien');
      console.log('2. Detail Pasien [ID pasien]');
      console.log('3. Tambah Pasien');
      console.log('4. Hapus data Pasien [ID pasien]');
      console.log('5. Logout');
    } else if ( role == 'Office Boy'){
      console.log("1.Logout");
    }
    rl.setPrompt("Please input your choice: ")
    rl.prompt();
    rl.on('line', (input) => {

      if( input == 1){
        console.log("berhasil");
      }
    })
  }

  trying(){
    this.pasien.coba()
  }

  //bikin lagi method untuk readline biasa menerima inputan menu

}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  coba(){
    return "tes"
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  tambahPegawai() {

  }

}




let resti = new Employee("dia","Doktor","dia","dia")
let Rumah_Sakit = new Hospital("RS","Bandung",resti,"pasien")
let ari = new Patient(1,'ari','sakit perut')

Rumah_Sakit.login();
// console.log(Rumah_Sakit.trying());
// console.log(ari.coba());
