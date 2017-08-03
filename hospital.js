const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Hospital {
  constructor(name, phone, location, employees, patients) {
    this.name = name
    this.phone = phone
    this.employees = employees
    this.patients = patients
    this.location = location
  }

  login() {
    rl.question('input your username? ', (user) => {
      if (user == this.employees.name) {
        rl.question('input your password? ', (password) => {
          if (password == this.employees.password) {
            console.log(`Login Succes: ${user}`);
            this.menu();
          }
        })
      }
    });
  }

  menu() {
    console.log('====================================');
    console.log(`Selamat Datang di Rumah Sakit ${this.name}\n${this.location}\n${this.phone}`);
    console.log('====================================');
    console.log('=============== MENU ===============');

  }

  listMenuEmployee() {
    rl.on('line', (line) => {
  console.log(`Received: ${line}`);
});
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


let employee = new Employee('Dhani', 'Dokter', 'dia', 'dia')
let rumahSakit = new Hospital('Bersama', '021 998 444', 'Jakarta', employee, 2)
console.log(rumahSakit.employees);
rumahSakit.login()
// rumahSakit.menu()
