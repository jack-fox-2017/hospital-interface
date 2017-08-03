const ModelHospital = require('./model');
const ViewHospital = require('./view');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name;
    this.employees = employees;
    this.patients = patients;
    this.location = location;
  }

  static run(){
    ModelHospital.getData(dataHospital => {
      let parseData = JSON.parse(dataHospital);
      let hospital = [];
      this._name = parseData[0].name;
      this._employees = parseData[0].employees;
      this._patients = parseData[0].patients;
      this._location = parseData[0].location;
      hospital.push(new Hospital(this._name, this._location, this._employees, this._patients));
      ViewHospital.header(hospital);
      this.readLine(hospital);
    });
  }

  static readLine(hospital){
    let position = 'Guest';
    let uname = 'Tamu';
    rl.question('Username : ', nameAns => {
      rl.question('Password : ', passAns => {
        for(let i=0; i<this._employees.length; i++){
          if(this._employees[i].username == nameAns && this._employees[i].password == passAns){
            uname = this._employees[i].name;
            position = this._employees[i].position;
          }
        }
        ViewHospital.header(hospital);
        if(position != 'Guest'){
          ViewHospital.user(uname, position);
        }
        switch(position){
          case 'Admin':
            ViewHospital.menu(8);
            this.command(8);
            break;
          case 'Dokter':
            ViewHospital.menu(5);
            this.command(5)
            break;
          case 'OfficeBoy':
            ViewHospital.menu(2);
            this.command(2);
            break;
          default:
            this.readLine(hospital);
        }
        //rl.close();
      });
    });
  }

  static command(auth){
    let rec = 'id pasien yang anda cari tidak ditemukan!';
    rl.question('Ketik perintah: ', commAns => {
      let comm = commAns.split(' ');
      let noAuth = 'ERROR!\nLu gadapet akses perintah tsb!';
      switch (comm[0]) {
        case "list_karyawan":
          if(auth != 8){
            ViewHospital.info(noAuth);
          }else{
            ViewHospital.list(this._employees, 'karyawan');
          }
          ViewHospital.menu(auth);
          this.command(auth);
          break;
        case "list_pasien" :
          if(auth >= 5){
            ViewHospital.list(this._patients, 'pasien');
          }else{
            ViewHospital.info(noAuth);
          }
          ViewHospital.menu(auth);
          this.command(auth);
          break;
        case "add_karyawan" :
          if(auth != 8){
            ViewHospital.info(noAuth);
            ViewHospital.menu(auth);
          }else{
            this.add(auth,'karyawan');
          }
          this.command(auth);
          break;
        case "add_pasien" :
          if(auth >= 5){
            this.add(auth,'pasien');
          }else{
            ViewHospital.info(noAuth);
            ViewHospital.menu(auth);
          }this.command(auth);
          break;
        case "view_record" :
          if(auth >= 5){
            for(let i=0; i<this._patients.length; i++){
              if(this._patients[i].id == comm[1]){
                ViewHospital.list(this._patients[i].diagnosis, '');
              }else{
                ViewHospital.info(rec);
              }
            }
          }else{
            ViewHospital.info(noAuth);
          }
          ViewHospital.menu(auth);
          this.command(auth);
          break;
        case "add_record":
          if(auth >= 5){
            let newRecData = [];
            for(let i=0; i<this._patients.length; i++){
              if(this._patients[i].id == comm[1]){
                rl.question('input record baru : ', newRec => {
                  this._patients[i].diagnosis.push(newRec);
                  newRecData.push(new Hospital(this._name, this._location, this._employees, this._patients));
                  ModelHospital.writeData(newRecData);
                  rec = 'record diagnosa telah ditambahkan';
                  ViewHospital.info(rec);
                  ViewHospital.menu(auth);
                  this.command(auth)
                });
              }
            }
          }else{
            ViewHospital.info(noAuth);
            ViewHospital.menu(auth);
            this.command(auth);
          }
          break;
        case "rm_record":
          if(auth >= 5){
            let rmRecData = [];
            for(let i=0; i<this._patients.length; i++){
              if(this._patients[i].id == comm[1]){
                this._patients[i].diagnosis.splice(parseInt(comm[2])-1, 1);
                rmRecData.push(new Hospital(this._name, this._location, this._employees, this._patients));
                ModelHospital.writeData(rmRecData);
                rec = 'record diagnosa telah terhapus!';
                ViewHospital.info(rec);
              }
            }
          }else{
            ViewHospital.info(noAuth);
          }
          ViewHospital.menu(auth);
          this.command(auth);
          break;
        case "rm_karyawan":
          if(auth == 8){
            if(comm[1]-1>=this._employees.length){
              ViewHospital.info('id employees tidak ditemukan');
            }else{
              this.rm(comm[1], 'karyawan');
            }
          }else{
            ViewHospital.info(noAuth);
          }
          ViewHospital.menu(auth);
          this.command(auth);
          break;
        case "rm_pasien":
          if(auth >= 5){
            for(let i=0; i<this._patients.length; i++){
              if(this._patients[i].id == comm[1]){
                this.rm(i, 'pasien');
              }
            }
          }else{
            ViewHospital.info(noAuth);
          }
          ViewHospital.menu(auth);
          this.command(auth);
          break;
        case "logout":
          this.run();
          break;
        case "exit" :
          rl.close();
          break;
        default :
          console.log('\x1Bc');
          ViewHospital.menu(auth);
          this.command(auth);
      }
    });
  }

  static add(auth, pos){
    let newData = [];
    if(pos == 'karyawan'){
      rl.question('Nama karyawan: ', nama => {
        rl.question('Posisi karyawan: ', posisi =>{
          rl.question('Username karyawan: ', uname =>{
            rl.question('Password karyawan: ', pw =>{
              this._employees.push(new Employee(nama, posisi, uname, pw));
              newData.push(new Hospital(this._name, this._location, this._employees, this._patients));
              ModelHospital.writeData(newData);
              ViewHospital.info('Data karyawan baru tersimpan!');
              ViewHospital.menu(auth);
              this.command(auth);
            });
          });
        });
      });
    }
    else{
      rl.question('Id pasien : ', id => {
        rl.question('Nama pasien: ', nama => {
          rl.question('Diagnosis pasien: ', diag =>{
            let arrDiag = [];
            arrDiag.push(diag);
            this._patients.push(new Patient(id, nama, arrDiag));
            newData.push(new Hospital(this._name, this._location, this._employees, this._patients));
            ModelHospital.writeData(newData);
            ViewHospital.info('Data pasien baru tersimpan!');
            ViewHospital.menu(auth);
            this.command(auth);
          });
        });
      });
    }
    this.command(auth);
  }
  static rm(id, auth){
    let newData = [];
    let str = 'pasien';
    if(auth == 'karyawan'){
      this._employees.splice(id-1, 1);
      str = 'karyawan';
    }else{
      this._patients.splice(id, 1);
    }
    newData.push(new Hospital(this._name, this._location, this._employees, this._patients));
    ModelHospital.writeData(newData);
    ViewHospital.info('\nData '+str+' berhasil terhapus!\n');
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
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

Hospital.run();
