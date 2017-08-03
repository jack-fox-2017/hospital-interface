// const fs = require('fs')
// const data = fs.readFileSync('./data.json', 'utf-8')
// const dataJson = JSON.parse(data)

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
    this.session = {}
  }

  login() {
    console.log("Selamat Datang!");
    rl.question('USERNAME: ', (username) => {
      if (this.cekUsername(username) >= 0) {
        let index = this.cekUsername(username)
        this.cekPassword(index)
      }
      else {
        console.log('Username tidak ada!');
        return this.login()
      }
    })
  }

  cekUsername(username) {
    for (let i=0; i<this.employees.length; i++) {
      if (username == this.employees[i].username) {
        return i
      }
    }
  }

  cekPassword(index) {
    rl.question('PASSWORD: ', (password) => {
      if (this.employees[index].password == password) {
        this.session.name = this.employees[index].name
        this.session.role = this.employees[index].position
        console.log(`Selamat Datang ${this.session.name}. Level akses Anda adalah ${this.session.role}`);

        if (this.session.role == 'dokter') {
          this.menuDokter()
        }
        else if (this.session.role == 'administrator') {
          this.menuAdmin()
        }
        else if (this.session.role == 'office boy') {
          this.menuOb()
        }
        else if (this.session.role == 'receptionist') {
          this.menuRec()
        }
      }
      else {
        console.log('Password salah!');
        return this.cekPassword(index)
      }
    })
  }

  menuDokter() {
    console.log('[1] List Patients');
    console.log('[2] Detail Patient');
    console.log('[3] Logout');

    rl.question('Options: ', (input) => {
      if (input == 1) {
        console.log(this.patients);
        this.menuDokter()
      }
      else if (input == 2) {
        this.detailPatient()
      }
      else if (input == 3) {
        this.login()
        this.session = {}
      }
    })
  }

  menuAdmin() {
    console.log('[1] List Employee');
    console.log('[2] Add Employee');
    console.log('[3] Delete Employee');
    console.log('[4] Logout');

    rl.question('Options: ', (input) => {
      if (input == 1) {
        console.log(this.employees);
        this.menuAdmin()
      }
      else if (input == 2) {
        this.addEmployee()
      }
      else if (input == 3) {
        //
      }
      else if (input == 4) {
        this.login()
        this.session = {}
      }
    })
  }

  menuOb() {
    console.log('[1] Logout');

    rl.question('Options: ', (input) => {
      if (input == 1) {
        this.login()
        this.session = {}
      }
    })
  }

  menuRec() {
    console.log('[1] List Patients');
    console.log('[2] Detail Patient');
    console.log('[3] Add Patient');
    console.log('[4] Delete Patient');
    console.log('[5] Logout');

    rl.question('Options: ', input => {
      if (input == 1) {
        //
      }
      else if (input == 2) {
        //
      }
      else if (input == 3) {
        //
      }
      else if (input == 4) {
        //
      }
      else if (input == 5) {
        //
      }
    })
  }

  detailPatient() {
    console.log(this.patients);
    rl.question('Masukan ID Patient: ', (id) => {
      console.log(this.patients[id-1]);
      this.menuDokter()
    })
  }

  // addEmployee() {
  //   console.log(this.employees);
  //   rl.question('Name: ', name => {
  //     rl.question('Position: ', pos => {
  //       rl.question('Username: ', username => {
  //         rl.question('Password: ', password => {
  //           let obj = {
  //             name: name,
  //             position: pos,
  //             username: username,
  //             password: password
  //           }
  //           this.employees.push(obj)
  //         })
  //       })
  //     })
  //   })
  //   console.log('Data berhasil ditambahkan.');
  //   console.log(this.employees);
  //   this.menuAdmin()
  // }


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

let employee1 = new Employee('Dayat', 'dokter', 'dokter', 'dokter')
let employee2 = new Employee('Anto', 'administrator', 'admin', 'admin')
let employee3 = new Employee('Teja', 'office boy', 'ob', 'ob')
let employee4 = new Employee('Arif', 'receptionist', 'rec', 'rec')

let patient1 = new Patient(1, 'Ahmad', 'Sakit kepala')
let patient2 = new Patient(2, 'Jo', 'Leher bengkak')
let patient3 = new Patient(3, 'Ganang', 'DBD')
let patient4 = new Patient(4, 'Budi', 'Malaria')

let arrEmployee = [employee1,employee2,employee3,employee4]
let arrPatient = [patient1,patient2,patient3,patient4]

let hospital1 = new Hospital('Mistic Hospital', 'Jakarta Selatan', arrEmployee, arrPatient)

hospital1.login()

// console.log(arrEmployee);
// console.log(hospital1);
// console.log(employee1);
// console.log(patient1);

//
// rl.question('Username: ', (username) => {
//   // TODO: Log the answer in a database
//   // console.log(`Thank you for your valuable feedback: ${answer}`);
//
//
//   rl.close();
// });
