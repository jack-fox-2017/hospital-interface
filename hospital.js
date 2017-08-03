const fs = require('fs')
// const data_hospital = fs.readFileSync('/Hospital.json'
var Table = require('cli-table')

let hospital = fs.readFileSync('./hospital.json','utf-8') // type nya string
let data_hospital = JSON.parse(hospital);
let employee = fs.readFileSync('./employee.json','utf-8') // type nya string
let data_employee= JSON.parse(employee);
let patient = fs.readFileSync('./patient.json','utf-8') // type nya string
let data_patient= JSON.parse(patient);
// console.log(data_patient[0].record[0]);

var accessLevel = [
  {role: 'admin',access: [1,2,3,4,5,6,7,8]},
  {role: 'doctor', access: [1,2,3,4,5,6]},
  {role: 'receptionist', access: [1,2,3,4]},
  {role: 'officeboy', access: [1]}
];

// readline
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
    this.user = 0;
    this.role =0;
  }

  static startHere(){
    rl.question('Welcome to Mistic Hospital \n--------------------------\nLOG IN\nPlease enter your username: ', (username) => {
      rl.question('Your password: ', (password) => {
        if (this.checkLogin(username, password) == true) {
          this.loginAsEmployee();
        } else {
          this.startHere();
        }
      });
    });
  }

  static checkLogin(user, pass){
    var key = 0;
    for (let i=0; i<data_employee.length; i++) {
      if (data_employee[i].username == user) {
        key = i;
        if (data_employee[key].password == pass) {
          this.user = key;
          this.role = data_employee[key].position;
          return true;
        }
      }
    }
    return false;
  }
  // static clearer() {
  //   console.log('\u001B[2J\u001B[0;0f');
  // }
  static back(){
    rl.question('Please enter if you want to go back :)', (input) => {
      if (input != null) {
        this.loginAsEmployee();
      }
    });
  }
  static patientList(){
    // console.log('\u001B[2J\u001B[0;0f');
    console.log(`PATIENT LIST`);
    var table = new Table({
      head: ['ID', 'NAME']
    })
    for (let i=0; i<data_patient.length; i++) {
      table.push([`${data_patient[i].id}`,`${data_patient[i].name}`]);
    }
    console.log(table.toString());
    this.back();
  }

  static showPatient(n){
    // this.clearer();
    var theOne = 0;
    for (let i=0; i<data_patient.length; i++) {
     if (data_patient[i].id == n) {
       theOne = i;
     }
    }
    console.log(`PATIENT`);
    console.log(`ID: ${data_patient[theOne].id}\nNama: ${data_patient[theOne].name}`);
    console.log(`PATIENT'S RECORDS`);
    var table2 = new Table({
      head: ['ID', 'NAME']
    })
    for (let i=0; i<data_patient[theOne].record.length; i++) {
      table2.push([`${data_patient[theOne].record[i].record_id}`,`${data_patient[theOne].record[i].record_name}`]);
    }
    console.log(table2.toString());
    this.back();
  }

  static employeeList(){
    // this.clearer();
    console.log(`EMPLOYEE LIST`);
    var table3 = new Table({
      head: ['ID', 'NAME', 'POSITION']
    })
    for (let i=0; i<data_employee.length; i++) {
      table3.push([`${data_employee[i].id}`,`${data_employee[i].name}`,`${data_employee[i].position}`]);
    }
    console.log(table3.toString());
    this.back();
  }

  static addPatient(id,nama,recordId,recordName){
    // console.log('the id record'+recordId);
    // console.log('the record name'+recordName);
    // this.clearer();
    var obj = {}
    obj['id'] = id;
    obj['name'] = nama;
    obj['record'] = [];
    var objRecord = {};
    objRecord['record_id'] = recordId;
    objRecord['record_name'] = recordName;
    obj.record.push(objRecord);
    data_patient.push(obj);
    fs.writeFileSync('patient.json',JSON.stringify(data_patient, null, 2));
    this.back();
  }

  static deletePatient(n){
    // this.clearer();
    let newList = [];
    for (let i=0; i<data_patient.length; i++) {
      if (data_patient[i].id != n) {
        newList.push(data_patient[i]);
      }
    }
    fs.writeFileSync('patient.json',JSON.stringify(newList, null, 2));
    this.back();
  }

  static addEmployee(id,nama,position,username,password){
    // this.clearer();
    var obj = {}
    obj['id'] = id;
    obj['name'] = nama;
    obj['position'] = position;
    obj['username'] = username;
    obj['password'] = password;
    data_employee.push(obj);
    fs.writeFileSync('employee.json',JSON.stringify(data_employee, null, 2));
    this.back();
  }

  static deleteEmployee(nama){
    // this.clearer();
    let newList = [];
    for (let i=0; i<data_employee.length; i++) {
      if (data_employee[i].name != nama) {
        newList.push(data_employee[i]);
      }
    }
    fs.writeFileSync('employee.json',JSON.stringify(newList, null, 2));
    this.back();
  }

  static loginAsEmployee(){
    var answer = 0;
        if (this.role == 'admin') {
          answer = 1;
        }
        else if (this.role == 'doctor') {
          answer = 2;
        }
        else if (this.role == 'receptionist') {
          answer = 3;
        }
        else if (this.role == 'officeboy') {
          answer = 4;
        }
    this.menu(answer);
  }

  static menu(answer){
    console.log('========================================================================');
    console.log(`Hii ${data_employee[this.user].name}, you sign in as ${this.role.toUpperCase()}`);
    console.log('========================================================================');
    switch (answer) {
      case 1: console.log('MAIN MENU\n 1.] Logout\n 2.] Daftar Pasien\n 3.] Lihat Rekam Medis <ID Pasien>\n 4.] Daftar Pekerja\n 5.] Tambah Pasien\n 6.] Hapus Data Pasien <ID Pasien>\n 7.] Tambah Data Pekerja\n 8.] Hapus Data Pekerja <nama_pekerja>');
        break;
      case 2: console.log('MAIN MENU\n 1.] Logout\n 2.] Daftar Pasien\n 3.] Lihat Rekam Medis <ID Pasien>\n 4.] Daftar Pekerja\n 5.] Tambah Pasien\n 6.] Hapus Data Pasien <ID Pasien>');
        break;
      case 3: console.log('MAIN MENU\n 1.] Logout\n 2.] Daftar Pasien\n 3.] Lihat Rekam Medis <ID Pasien>\n 4.] Daftar Pekerja');
        break;
      case 4: console.log('MAIN MENU\n 1.] Logout');
        break;
      default:
    }
    this.command();
  }

  static command(){
    rl.question('Choose your selection: ', (ans) => {
      for (let i=0; i<accessLevel.length; i++) {
        if (accessLevel[i].role == this.role) {
          var onee = i;
        }
      }
        if (accessLevel[onee].access.length >= ans) {
              switch (ans) {
                case '1': this.startHere();
                  break;
                case '2': this.patientList();
                  break;
                case '3':
                  rl.question('Type Patient ID : ', (id) => {
                      console.log('the one'+id);
                        this.showPatient(id);
                  });
                  break;
                case '4':this.employeeList();
                  break;
                case '5':
                console.log('ADD NEW PATIENT INFO');
                  rl.question('Id: ', (id) => {
                    rl.question('Name: ', (nama) => {
                      rl.question('Record id: ', (recordId) => {
                        rl.question('Record name : ', (recordName) => {
                            this.addPatient(id,nama,recordId,recordName);
                        });
                      });
                    });
                  });
                break;
                case '6':
                rl.question('Type Patient ID that want to be deleted below\nId: ', (id) => {
                      this.deletePatient(id);
                });
                  break;
                case '7':
                console.log('ADD NEW EMPLOYEE INFO');
                  rl.question('Id: ', (id) => {
                    rl.question('Name: ', (nama) => {
                      rl.question('Position: ', (position) => {
                        rl.question('Username : ', (username) => {
                          rl.question('Password : ', (password) => {
                            this.addEmployee(id,nama,position,username,password);
                          });
                        });
                      });
                    });
                  });
                break;
                case '8':
                rl.question('Type Employee name that want to be deleted below\nName: ', (nama) => {
                      this.deleteEmployee(nama);
                });
                  break;
                default:
              };
            // });
          } else {console.log('You do not have access');
        this.loginAsEmployee();}
            // this.back();
          // console.log('You do not have access');
          // this.back();
    })
  };

};

class Patient {
  constructor(id, name, record) {
    this.id = id
    this.name = name
    this.record = record
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

Hospital.startHere();
