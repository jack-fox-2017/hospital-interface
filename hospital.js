const fs = require('fs')

class Hospital { //rumah sakit
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }

  static Admin(){
    console.log('===============================================\nWelcome, mimin.    Your access leverl is: ADMIN\n===============================================\nWhat would you like do?\nOptions\n');
    console.log('[1] list_patient\n[2] Add_record\n[3] Remove_record\n\n[4] Log_Out');
    rl.question('\nInput pilihan Anda :', (answerPilihan) => {
      if(answerPilihan == '1'){

      }
      else if(answerPilihan == '2'){

      }
      else if (answerPilihan == '3') {

      }
      else if (answerPilihan == '4') {

      }
      else{

      }
    });
  }

  static Dokter(){
    console.log('===============================================\nWelcome, mimin.    Your access leverl is: DOKTER\n===============================================\nWhat would you like do?\nOptions\n');
    console.log('[1] list_patient\n\n[2] Log_Out');
    rl.question('\nInput pilihan Anda :', (answerPilihan) => {
      if(answerPilihan == '1'){

      }
      else if(answerPilihan == '2'){

      }
      else{

      }
    });
  }

  static Ob(){
    console.log('===============================================\nWelcome, mimin.    Your access leverl is: OFFICE BOY\n===============================================\nWhat would you like do?\nOptions\n');
    console.log('Anda tidak memiliki akses apapun\n\n[1] Log_Out');
    rl.question('\nInput pilihan Anda :', (answerPilihan) => {
      if(answerPilihan == '1'){

      }
      else{

      }
    });
  }

  static Receptionist(){
    console.log('===============================================\nWelcome, mimin.    Your access leverl is: RECEPTIONIST\n===============================================\nWhat would you like do?\nOptions\n');
    console.log('[1] View_records\n\n[2] Log_Out');
    rl.question('\nInput pilihan Anda :', (answerPilihan) => {
      if(answerPilihan == '1'){

      }
      else if(answerPilihan == '2'){

      }
      else{

      }
    });
  }


}

class Patient { //pasien
  constructor() {

  }
  static Aman(){
    let tampung = []
    for (let i = 0; i<dataStr.length; i++){
      tampung.push(` ${dataStr[i].id}. ${dataStr[i].name}, ${dataStr[i].diagnosa}`)
   }
   return tampung.join('\n')
  }
}

class Employee { //pegawai
  constructor(/*name, position, username, password*/) {
    // this.name = name
    // this.position = position
    // this.username = username
    // this.password = password
  }

}
let data = fs.readFileSync("./data_pasien.json","utf8")
let dataStr = JSON.parse(data)

console.log(Patient.Aman());

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('          Wellcome to Mistic Hospita         \n===============================================');

rl.question('Please Enter Your Username ', (answerUsername) => {
  if(answerUsername == 'OB'){
    rl.question('Please Enter Your Password ', (answerPassword) => {
      if(answerPassword == '123'){
        Hospital.Ob();
      }
      else {
        console.log('Maaf Password Salah');
        rl.close()
      }
    });

  }

  else if(answerUsername == 'Receptionist'){
    rl.question('Please Enter Your Password ', (answerPassword) => {
      if(answerPassword == '123'){
        Hospital.Receptionist();
      }
      else {
        console.log('Maaf Password Salah');
        rl.close()
      }
    });
  }

  else if(answerUsername == 'Admin'){
    rl.question('Please Enter Your Password ', (answerPassword) => {
      if(answerPassword == '123'){
        Hospital.Admin()
      }
      else {
        console.log('Maaf Password Salah');
        rl.close()
      }
    });
  }

  else if(answerUsername == 'Dokter'){
    rl.question('Please Enter Your Password ', (answerPassword) => {
      if(answerPassword == '123'){
        Hospital.Dokter();
      }
      else {
        console.log('Maaf Password Salah');
        rl.close()
      }
    });
  }

  else{
    console.log('Maaf Username Salah');
    rl.close()
  }
});
