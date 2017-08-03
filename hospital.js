const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);
//
//   rl.close();
// });


class Hospital {
  constructor(name, location) {
    this.name = name
    this.location = location
    this.employees = [{id:1, name: 'Adnin', position:'Admin', username:'admin', password:'admin'},
                      {id:2, name: 'Rahid', position:'Dokter', username:'dokter', password:'dokter'},
                      {id:3, name: 'Obito', position:'OB', username:'ob', password:'ob'},]
    this.patients = []
    this.session = {}
  }

  login() {
    console.log("Welcome to RS Sederhana Sehat Selalu");
    rl.question('username: ', (answer) => {
      if(this.checkUsername(answer) >= 0) {
        let index = this.checkUsername(answer)
        return this.validatingPassword(index)
      }
      else {
        console.log('Tidak punya akses');
        return this.login()
      }
    })
    // rl.close()
  }

  checkUsername(username) {
    for (var i = 0; i < this.employees.length; i++) {
      if(username == this.employees[i].username) {
        return i
      }
    }
  }

  // checkPassword(index) {
  //   if(password == this.employees[index].password) {
  //       return true
  //   }
  // }

  validatingPassword(index) {
    rl.question('password: ', (answer) => {
      if(this.employees[index].password == answer) {
        this.session.name = this.employees[index].name
        this.session.position = this.employees[index].position
        console.log('------------Menu List-------------');
        return this.displayMenu(index)
      }
      else {
        console.log('maaf password salah');
        return this.login()
      }
    })
  }

  menuAdmin() {
    console.log(`Options: `);
    console.log(`[1] All List Patients`);
    console.log(`[2] View Patient`);
    console.log(`[3] Add Patient`);
    console.log(`[4] Remove Patient`);
    console.log(`[5] List Employees`);
    console.log(`[6] View Employee`);
    console.log(`[7] Add Employee`);
    console.log(`[8] Remove Employee`);
    console.log(`[9] Log out`);
    rl.question('Pilih menu angka: ', answer => {
      switch(answer) {
        case "1":
          this.listPatients()
        break
        case "3":
          this.addPatient()
        break
        case "5":
          this.listEmployees()
        break
        case "7":
          this.addEmployee()
        break
        case "9":
          this.login()
          this.session = {}
        break
        default:
          this.menuAdmin()
      }
    })
  }

  menuDokter() {
    console.log(`Options: `);
    console.log(`[1] All List Patients`);
    console.log(`[2] View Patient`);
    console.log(`[3] Add Patient`);
    console.log(`[4] Remove Patient`);
    console.log(`[9] Log out`);
    rl.question('Pilih menu angka: ', answer => {
      switch(answer) {
        case "9":
        this.login()
        this.session = {}
        break
        default:
        this.menuDokter()
      }
    })
  }

  menuOB() {
    console.log(`Options: `);
    console.log(`[9] Log out`);
    rl.question('Pilih menu angka: ', answer => {
      switch(answer) {
        case "9":
        this.login()
        this.session = {}
        break
        default:
        this.menuOB()
      }
    })
  }

  displayMenu(position) {
      if(this.session.position === 'Admin') {
        return this.menuAdmin()
      }
      else if(this.session.position === 'Dokter') {
        return this.menuDokter()
      }
      else {
        return this.menuOB()
      }
  }

  listEmployees() {
    console.log(`Daftar Pegawai RS Sederhana Sehat Selalu`);
    console.log(`ID | Nama | Position`);
    console.log(`--------------------`);
    for (var i = 0; i < this.employees.length; i++) {
      console.log(`${this.employees[i].id} | ${this.employees[i].name} | ${this.employees[i].position}`);
    }
    console.log(`--------------------`);
    return this.menuAdmin()
  }

  listPatients() {
    console.log(`Daftar Pasien RS Sederhana Sehat Selalu`);
    console.log(`ID | Nama | Diagnosis`);
    console.log(`--------------------`);
    for (var i = 0; i < this.patients.length; i++) {
      console.log(`${this.patients[i].id} | ${this.patients[i].name} | ${this.patients[i].diagnosis}`);
    }
    console.log(`--------------------`);
    return this.menuAdmin()
  }

  addEmployee() {
    let objEmp = {}
    console.log('---Tambahkan data pegawai---');
    rl.question('Masukan id pegawai: ', id => {
      objEmp.id = id
      rl.question('Masukan nama pegawai: ', name => {
        objEmp.name = name
        rl.question('Masukan posisi pegawai: ', pos => {
          objEmp.diagnosis = pos
          rl.question('Ketik username: ', user => {
            objEmp.username = user
            rl.question('Ketik password: ', pass => {
              objEmp.password = pass
              this.employees.push(objEmp)
              return this.menuAdmin()
            })
          })
        })
      })
    })
  }

  addPatient() {
    let objPat = {}
    console.log('---Tambahkan data pasien---');
    rl.question('Masukan id pasien: ', id => {
      objPat.id = id;
      rl.question('Masukan nama pasien: ', name => {
        objPat.name = name;
        rl.question('Diagnosis penyakit: ', diag => {
          objPat.diagnosis = diag;
          // console.log(objPat);
          this.patients.push(objPat)
          return this.menuAdmin()
        })
      })
    })
  }

  delPatient() {

  }

}//end of Class

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(id, name, position, username, password) {
    this.id = id
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

let pegawai1 = new Employee(1, 'Adnin', 'Admin', 'admin', 'admin')
let pegawai2 = new Employee(2, 'Hidayat', 'Dokter', 'dokter', 'dokter');
let pegawai3 = new Employee(3, 'Obito', 'OB', 'ob', 'ob');
let pasien1 = new Patient(1, 'Budi', 'Flu')
let pasien2 = new Patient(2, 'Ahmad', 'Batuk')
let pasien3 = new Patient(3, 'Rahid', 'Demam')

// let rs = new Hospital('RS Sederhana', 'Jakarta', [pegawai1, pegawai2, pegawai3], [pasien1, pasien2, pasien3])
let rs = new Hospital('RS Sederhana', 'Jakarta')


// console.log(rs);
// console.log(rs.login());
rs.login()
