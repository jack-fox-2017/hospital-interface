const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
//================================================================class HOSPITAL
class Hospital {
  constructor(name, location, employee, patients) {
    this.name = name
    this.employees = employee
    this.patients = patients
    this.location = location
  }

  dashboard(){
    // console.log('>>',this.employees);
    console.log(`Welcome to ${this.name} ${this.location}`);
    console.log('------------------------------');

    rl.question('Please enter your username : ', (answer) => {
      if (answer == this.employees.username) {
        rl.question('Please enter your password : ', (pass)=>{
          if (pass == this.employees.password) {
            this.cek_Position(this.employees.position);
          }
        })
      } else {
        console.log("Nama anda belum terdaftar disistem ini!");
        rl.close();
      }
});
}

  cek_Position(position){
    if (position == "Dokter") {
      this.employees.menu_Dokter()
    } else if (position == "Admin") {
      this.employees.menu_Admin()
    } else if (position == "Ob") {
      this.employees.menu_Ob()
    } else {
      return cek_Position();
    }
  }

}
//================================================================class Employee

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  //bikin method menu, cek kalo dia dokter mau tampilin menu yang mana
  //bikin method menu khusus Dokter
  menu_Dokter(){
    console.log(' [1] list_patients', '\n',
                '[2] view_record <patient_id>', '\n',
                '[3] add_record <patient_id>', '\n',
                '[4] remove_record <patient_id> <record_id>');

    rl.question('What would you like todo? ', (answer) =>{
      switch (answer) {
        case '1':{
          console.log("1");
          break;
        }

        case '2':{
          console.log("2");
          break;
        }

        case '3':{
          console.log("3");
          break;
        }

        case '4':{
          console.log("4");
          break;
        }

        default:{

        }
      }
    })
  }

  //bikin method menu khusu ob
  menu_Ob(){
    console.log("[1] Ob hanya punnya Logout");
    rl.close()
  }

  //bikin method menu khusus admin
  menu_Admin(){
    console.log('[1] list_employee', '\n',
                '[2] view_record <employee_id>', '\n',
                '[3] add_record <employee_id>', '\n',
                '[4] remove_record <employee_id> <employee_id>');
  }


}

//================================================================class Patient
class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

let employee = new Employee("Dr.Cokro", "Dokter", "cokro", "12345")
// let employee = new Employee("Sihabudin", "Admin", "udin", "123")
// let employee = new Employee("Dede", "Ob", "dede", "123")

let hospital = new Hospital("RSJ Biang Waras", "Sukabumi", employee, "Rudi Wijaya")
// let patient = new Patient("001", "Rudi Wijaya", "Skizofrenia")

hospital.dashboard()
