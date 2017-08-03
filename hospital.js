const Table = require('cli-table')
const chalk = require('chalk')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}).on('close', () => {
  console.log(`\nGoodbye!`);
})

const Model = require('./model')

const employeesData = './employeeUser.json'
const patientsData = './patients.json'
const sessionData = './session.json'

const br = chalk.cyan('====================================================\n')
const fontColor = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  white: '\x1b[37m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',

  refresh: '%s\x1b[0m'
}

class Hospital {
  constructor(name, location, employees, patients, session) {
    this.name = name
    this.location = location
    this.employees = employees
    this.patients = patients

    this.session = session || null
    this.menuList = [
      {name: 'List Employees', access: ['Admin'], param: '', id: 1},
      {name: 'Add Employee', access: ['Admin'], param: '', id: 2},
      {name: 'Remove Employee', access: ['Admin'], param: '<employee_id>', id: 3},

      {name: 'List Patients', access: ['Admin', 'Dokter'], param: '', id: 4},
      {name: 'Add Patient', access: ['Admin', 'Dokter'], param: '', id: 5},
      {name: 'Remove Patient', access: ['Admin', 'Dokter'], param: '<patent_id>', id: 6},

      {name: 'View Records', access: ['Admin', 'Dokter'], param: '<patient_id>', id: 7},
      {name: 'Add Record', access: ['Admin', 'Dokter'], param: '<patient_id>', id: 8},
      {name: 'Remove Record', access: ['Admin', 'Dokter'], param: '<patent_id> <record_id>', id: 9},

      {name: 'Nyapu', access: ['Office Boy'], param: '', id: 10},

      {name: 'Logout', access: ['Admin', 'Dokter', 'Office Boy'], param: '', id: 11},
      {name: 'Exit', access: ['Admin', 'Dokter', 'Office Boy'], param: '', id: 12}
    ]
  }

  start() {
    this.clear()
    if (this.session != null) {
      this.menu()
    }
    else
      this.welcome()
  }
  welcome() {
    this.clear()
    console.log(`${br}Welcome to ${this.name} Hospital\n${br}`);
    console.log(`What would you like to do?`);
    console.log('[1] Login\n[2] Exit\n');
    console.log('Choose your option: ');

    rl.question('', input => {
      if (input == 1) {
        this.login()
      } else if (input == 2) {
        this.exit()
      } else {
        console.log('Invalid option');
        this.welcome()
      }
    })


  }
  login() {
    this.clear()
    console.log(`${br}Login\n${br}`);
    let username = () => {
      rl.question(`Enter your username: `, input => {
        if(input != '') {
          let usernameFound = this.employees.filter(item => {return item.username == input})
          if (usernameFound.length > 0)
            password(usernameFound[0])
          else {
            console.log(chalk.red(`Username not found!`));
            username()
          }
        } else
          this.welcome()
      })
    }

    let password = (user) => {
      rl.question(`Enter your password: `, input => {
        if(input != '') {
          if (user.password == input){
            this.session = user

            Model.saveSession(sessionData, [this.session])

            this.menu()
          }
          else {
            console.log(chalk.red(`Password didn't match!`));
            password(user)
          }
        } else
          this.welcome()
      })
    }

    username()
  }
  logout() {
    this.session = null
    Model.saveData(sessionData, [])
    this.welcome()
  }
  exit() {
    this.clear()
    if (this.session != null) {
      console.log(fontColor.yellow + fontColor.refresh, `Warning! Your session information will be saved or logout first! y/n`);
      rl.question('', input => {
        if (input == 'y') {
          rl.close()
        } else if (input == 'n') {
          this.menu()
        } else {
          console.log('Invalid option');
          this.exit()
        }
      })
    } else {
      rl.close()
    }
  }
  menu() {
    this.clear()
    console.log(`${br}Hello, ${chalk.cyan(this.session.name)}. Your access level is: ${chalk.cyan(this.session.position)}\n${br}`);
    console.log(`What would you like to do?`);

    let menuList = this.menuList.filter(item => {return item.access.indexOf(this.session.position) >= 0})

    menuList.forEach((item, index) => {
      console.log(`[${index + 1}] ${item.name} ${chalk.gray('=>')}`, chalk.cyan(`${index + 1} ${item.param}`));
    })
    console.log('\nInput your option: ');

    rl.question('', input => {
      input = input.split(' ').map(item => {return item.trim()})
      let menuId = menuList[input[0] - 1].id
      switch (menuId) {
        case 1: this.listEmployees(); break;
        case 2: this.addEmployee(); break;
        case 3: this.removeEmployee(input[1]); break;

        case 4: this.listPatients(); break;
        case 5: this.addPatient(); break;
        case 6: this.removePatient(input[1]); break;

        case 7: this.viewRecords(input[1]); break;
        case 8: this.addRecord(input[1]); break;
        case 9: this.removeRecord(input[1], input[2]); break;

        case 10: this.nyapu(); break;

        case 11: this.logout(); break;
        case 12: this.exit(); break;
      }
    })
  }
  clear() {
    console.log('\u001B[2J\u001B[0;0f')
  }
  back() {
    rl.question(chalk.green('Press enter to go back to menu\n'), input => {
      this.menu()
    })
  }

  listEmployees() {
    this.clear()
    let table = new Table({
      head: ['NO', 'ID', 'NAME', 'POSITION'],
      colWidth: [100, 100, 200, 200]
    })

    this.employees.forEach((item, index) => {
      table.push([index + 1, item.id, item.name, item.position])
    })
    console.log(`${br}Employee List\n${br}`);
    console.log(table.toString());
    this.back()
  }
  addEmployee() {
    this.clear()
    console.log(`${br}Add Employee\n${br}`);
    rl.question('Input: <name>, <position>, <username>, <password>\n', input => {
      let data = input.split(',')
      let employee = new Employee(Model.getData(employeesData, true), data[0].trim(), data[1].trim(), data[2].trim(), data[3].trim())
      this.employees.push(employee)

      Model.saveData(employeesData, this.employees)

      console.log(chalk.cyan('New employee added!'));
      this.back()
    })
  }
  removeEmployee(id) {
    if (id == undefined) {
      console.log(chalk.red(`Please insert param(s)`));
      return this.back()
    }
    let toDelete = this.employees.filter(item => {return item.id == id})
    if (toDelete.length <= 0) {
      console.log(`Can't find employee with id: ${id}`);
      this.back()
    } else {
      this.clear()
      this.employees = this.employees.filter(item => {return item.id != id})
      Model.saveData(employeesData, this.employees)
      console.log(`${toDelete[0].name} data deleted!`);
      this.back()
    }
  }

  listPatients() {
    this.clear()
    let table = new Table({
      head: ['NO', 'ID', 'NAME', 'RECORD'],
      colWidth: [100, 100, 200, 200]
    })

    this.patients.forEach((item, index) => {
      let records = item.records.map(item => {return item.name}).join(', ')
      table.push([index + 1, item.id, item.name, records])
    })
    console.log(`${br}Patient List\n${br}`);
    console.log(table.toString());
    this.back()
  }
  addPatient() {
    this.clear()
    console.log(`${br}Add Pasien\n${br}`);
    rl.question(`Input: <name>, <record>\n`, input => {
      let data = input.split(',')
      let record = {
        id: 1,
        name: data[1].trim()
      }
      let patient = new Patient(Model.getData(patientsData, true), data[0].trim(), [record])
      this.patients.push(patient)

      Model.saveData(patientsData, this.patients)

      console.log(chalk.cyan('New patient added!'));
      this.back()
    })
  }
  removePatient(id) {
    if (id == undefined) {
      console.log(chalk.red(`Please insert param(s)`));
      return this.back()
    }
    let toDelete = this.patients.filter(item => {return item.id == id})
    if (toDelete.length <= 0) {
      console.log(`Can't find employee with id: ${id}`);
      this.back()
    } else {
      this.clear()
      this.patients = this.patients.filter(item => {return item.id != id})
      Model.saveData(patientsData, this.patients)
      console.log(`Patient ${toDelete[0].name} deleted!`);
      this.back()
    }
  }

  viewRecords(id) {
    this.clear()
    if (id == undefined) {
      console.log(chalk.red(`Please insert param(s)`));
      return this.back()
    }

    let toView = this.patients.filter(item => {return item.id == id})
    if (toView.length <= 0) {
      console.log(`Can't find patient with id: ${id}`);
      this.back()
    } else {
      let table = new Table({
        head: ['NO', 'ID', 'RECORD NAME'],
        colWidth: [100, 100, 200]
      })

      toView[0].records.forEach((item, index) => {
        table.push([index + 1, item.id, item.name])
      })
      console.log(`${br}Record List of ${toView[0].name}\n${br}`);
      console.log(table.toString());
      this.back()
    }
  }
  addRecord(id) {
    this.clear()
    if (id == undefined) {
      console.log(chalk.red(`Please insert param(s)`));
      return this.back()
    }
    let toAdd = this.patients.filter(item => {return item.id == id})
    if (toAdd.length <= 0) {
      console.log(`Can't find patient with id: ${id}`);
      this.back()
    } else {
      console.log(`${br}Add Patient Record\n${br}`);
      rl.question(`Enter new record name: `, input => {
        let patientIndex;
        this.patients.forEach((item, index) => {
          if (item.id == id)
            patientIndex = index
        })

        let record = {
          id: this.patients[patientIndex].records.length + 1,
          name: input
        }

        this.patients[patientIndex].records.push(record)

        Model.saveData(patientsData, this.patients)

        console.log(chalk.cyan(`New record added to ${toAdd[0].name}!`));
        this.back()
      })
    }
  }
  removeRecord(id, recordId) {
    this.clear()
    if (id == undefined) {
      console.log(chalk.red(`Please insert param(s)`));
      return this.back()
    }
    let patientToDelete = this.patients.filter(item => {return item.id == id})
    if (patientToDelete.length <= 0) {
      console.log(`Can't find patient with id: ${id}`);
      this.back()
    } else {
      if (recordId == undefined) {
        console.log(chalk.red(`Please insert param(s)`));
        return this.back()
      }
      let toDelete = patientToDelete[0].records.filter(item => {return item.id == recordId})
      if (toDelete.length <= 0) {
        console.log(`Can't find record with id: ${id}`);
        this.back()
      } else {
        this.clear()
        let patientIndex;
        this.patients.forEach((item, index) => {
          if (item.id == id)
            patientIndex = index
        })
        this.patients[patientIndex].records = this.patients[patientIndex].records.filter(item => {return item.id != id})
        Model.saveData(patientsData, this.patients)
        console.log(`Record ${toDelete[0].name} deleted from ${patientToDelete[0].name}!`);
        this.back()
      }
    }
  }

  nyapu() {
    this.clear()
    console.log(chalk.green(`*lagi nyapu`));
    this.back()
  }
}

class Patient {
  constructor(id, name, records) {
    this.id = id
    this.name = name
    this.records = records
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

let employees = Model.getData(employeesData).map(item => {return new Employee(item.id, item.name, item.position, item.username, item.password)})
let patients = Model.getData(patientsData).map(item => {return new Patient(item.id, item.name, item.records)})
let session = Model.getSession(sessionData)
let hospital = new Hospital('Sakitpedia', 'Jl. Jalan', employees, patients, session[0])

hospital.start()
