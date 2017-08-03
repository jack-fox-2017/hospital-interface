const Model = require('./model.js');
const View = require('./view.js');
// add library readline
const readline = require('readline');
const Table = require('cli-table');

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
  }

  start() {
    let dataRS = Model.dataRS()
    View.clear()
    View.welcome(dataRS)
    this.login(dataRS)
  }

  login(dataRS){
    let dataPegawai = Model.dataPegawai('./dataPegawai.json')
    //console.log(dataPegawai);
    View.line()
    rl.question(`Masukkan user id: `,(user) =>{
      let search = dataPegawai.filter(x=>{ if(x[`user`]==user)return x})
        if(search.length > 0){
          this.password(search[0])
        } else {
          View.clear()
          View.welcome(dataRS)
          View.line()
          View.wrongID()
          this.login(dataRS)
        }
    })
  }

  password(dataUser){
    rl.question(`Masukkan password: `,(password) =>{
      let passwordId = dataUser[`password`]
        if (passwordId === password) {
          this.menu(dataUser);
        } else {
          View.line()
          View.wrongPass()
          this.password(dataUser)
        }
    })
  }

  menu(data){
    let position = data[`position`];
    View.clear()
    View.welcomMenu(data);
    switch (position) {
      case `OB`:{
        View.menuOB()
        this.inputMenu(data,position)
      }break;
      case `RESEPSIONIS`:{
        View.menuResepsionis()
        this.inputMenu(data,position)
      }break;
      case `ADMIN`:{
        View.menuAdmin()
        this.inputMenu(data,position)
      }break;
      case `PERAWAT`:{
        View.menuPerawat()
        this.inputMenu(data,position)
      }break;
      case `DOKTER`:{
        View.menuDokter()
        this.inputMenu(data,position)
      }break;
      default:{
        View.wrongPosition()
        this.logout()
      }
    }
  }

  inputMenu(dataUser,position){
    rl.question(`Pilih menu: `,(pilihanMenu) =>{
      switch (position) {
        case `OB`:{
          switch (pilihanMenu) {
            case `1`:{this.logout()} break;
            default:{this.menu(data)}
          }}break;
        case `ADMIN`:{
        switch (pilihanMenu) {
          case `1`:{this.logout()} break;
          case `2`:{this.tambahPasien(dataUser)} break;
          case `3`:{this.daftarPasien(dataUser)} break;
          case `4`:{this.cariPasien(dataUser)} break;
          case `5`:{this.ubahPasien(dataUser,status)} break;
          case `6`:{this.ubahPasien(dataUser)} break;
          case `7`:{this.tambahPegawai(dataUser)} break;
          case `8`:{this.ubahPegawai(dataUser)} break;
          case `9`:{this.daftarPegawai(dataUser)} break;
          default:{this.menu(dataUser)}
        }}break;
        case `RESEPSIONIS`:{
        switch (pilihanMenu) {
          case `1`:{this.logout()} break;
          case `2`:{this.tambahPasien(dataUser)} break;
          case `3`:{this.daftarPasien(dataUser)} break;
          case `4`:{this.cariPasien(dataUser)} break;
          default:{this.menu(dataUser)}
        }}break;
        case `PERAWAT`:{
        switch (pilihanMenu) {
          case `1`:{this.logout()} break;
          case `3`:{this.daftarPasien(dataUser)} break;
          case `4`:{this.cariPasien(dataUser)} break;
          default:{this.menu(dataUser)}
        }}break;
        case `DOKTER`:{
        switch (pilihanMenu) {
          case `1`:{this.logout()} break;
          case `3`:{this.daftarPasien(dataUser)} break;
          case `4`:{this.cariPasien(dataUser)} break;
          case `5`:{this.ubahPasien(dataUser,status)} break;
          default:{this.menu(dataUser)}
        }}break;
        default: {
        }
      }
    })
  }

  logout(){
    View.clear()
    View.bye()
    rl.close()
  }

  daftarPasien(dataUser,idUser){
    let dataPasien = Model.dataPasien()
    let property = Object.keys(dataPasien[0])
    let arr = []
    let table = this.table()
    //Push header table
    table.push(property)
    if (idUser) {
      for (var i = 0; i < dataPasien.length; i++) {
        if (idUser === dataPasien[i].id) {
          table.push([dataPasien[i].id,
            dataPasien[i].nama,
            dataPasien[i].diagnosa,
            dataPasien[i].status])
        }
      }
    } else {
      for (var i = 0; i < dataPasien.length; i++) {
        table.push([dataPasien[i].id,
          dataPasien[i].nama,
          dataPasien[i].diagnosa,
          dataPasien[i].status])
      }
    }

    View.daftarPasien(table)
    this.backToMenu(dataUser)
  }

  addPasien(idNew,namaNew,diagnosaNew){
    let data = Model.dataPasien()
    let newPasien = {
      id: idNew,
      nama: namaNew,
      diagnosa: namaNew,
      status: "perawatan"
    }
    data.push(newPasien)
    Model.writeData(data)
  }

  hapusPasien(dataUser,pasien){
    let arr = []
    let dataPasien = Model.dataPasien()
    for (var i = 0; i < dataPasien.length; i++) {
      if (pasien[`id`] !== dataPasien[i].id) {
        arr.push(dataPasien[i])
      }
    }
    Model.writeData(arr)
    View.clear()
    View.successHapusPasien(pasien)
    this.backToMenu(dataUser)
  }

  ubahPasien(dataUser,status){
    let dataPasien = Model.dataPasien()
    //console.log(dataUser);
    View.line()
    rl.question(`Masukkan id pasien: `,(id) =>{
      let search = dataPasien.filter(x=>{ if(x[`id`]==id)return x})
        if(search.length > 0){
          //console.log(search);
          this.hapusPasien(dataUser,search[0])
        } else {
          View.line()
          View.wrongID()
          this.ubahPasien(dataUser)
        }
    })
  }

  cariPasien(dataUser){
    let dataPasien = Model.dataPasien()
    //console.log(dataPegawai);
    View.line()
    rl.question(`Masukkan id pasien: `,(id) =>{
      let search = dataPasien.filter(x=>{ if(x[`id`]==id)return x})
        if(search.length > 0){
          this.daftarPasien(dataUser,search[0]['id'])
        } else {
          //View.clear()
          View.line()
          View.wrongID()
          this.cariPasien(dataUser)
        }
    })
  }

  tambahPasien(dataUser){
    rl.question(`Masukkan id pasien: `,(id) =>{
        if (id) {
          rl.question(`Masukkan nama: `,(nama) =>{
            if (nama) {
              rl.question(`Masukkan diagnosa: `,(diagnosa) =>{
                if (diagnosa) {
                  View.line()
                  View.successAddPasien()
                  this.addPasien(id,nama,diagnosa)
                  this.backToMenu(dataUser)
                } else {
                  View.line()
                  tambahPasien(dataUser)
                }
              })
            } else {
              View.line()
              tambahPasien(dataUser)
            }
          })
        } else {
          View.line()
          this.tambahPasien(dataUser)
        }
    })
  }

  addPegawai(obj){
    let data = Model.dataPegawai()
    let newPegawai = {
      id: obj[`id`],
      user: obj[`user`],
      password: obj[`password`],
      nama: obj[`nama`],
      status: obj[`status`]
    }
    data.push(newPegawai)
    Model.writeDataPegawai(data)
  }

  hapusPegawai(dataUser,pegawai){
    let arr = []
    let data = Model.dataPegawai()
    for (var i = 0; i < data.length; i++) {
      if (pegawai[`id`] !== data[i].id) {
        arr.push(data[i])
      }
    }
    Model.writeDataPegawai(arr)
    View.clear()
    View.successHapusPegawai(pegawai)
    this.backToMenu(dataUser)
  }

  ubahPegawai(dataUser){
    let dataPegawai = Model.dataPegawai()
    View.line()
    rl.question(`Masukkan id pegawai: `,(id) =>{
      let search = dataPegawai.filter(x=>{ if(x[`id`]==id)return x})
        if(search.length > 0){
          //console.log(search);
          this.hapusPegawai(dataUser,search[0])
        } else {
          View.line()
          View.wrongID()
          this.ubahPegawai(dataUser)
        }
    })
  }

  daftarPegawai(dataUser,idUser){
    let data = Model.dataPegawai()
    let property = Object.keys(data[0])
    let arr = []
    let table = this.table()
    // push header
    table.push(property)
    if (idUser) {
      for (var i = 0; i < data.length; i++) {
        if (idUser === data[i].id) {
          table.push([data[i].id,
            data[i].user,
            data[i].password,
            data[i].nama,
            data[i].position
          ])
        }
      }
    } else {
      for (var i = 0; i < data.length; i++) {
        table.push([data[i].id,
          data[i].user,
          data[i].password,
          data[i].nama,
          data[i].position
          ])
      }
    }

    //console.log(table);
    View.daftarPegawai(table)
    this.backToMenu(dataUser)
  }

  tambahPegawai(dataUser){
    View.clear()
    View.daftarPosisi()
      rl.question(`Pilih posisi: `,(posisiAdd) =>{
        switch (posisiAdd) {
          case `1`:{posisiAdd = 'ADMIN'} break;
          case `2`:{posisiAdd = 'RESEPSIONIS'} break;
          case `3`:{posisiAdd = 'PERAWAT'} break;
          case `4`:{posisiAdd = 'DOKTER'} break;
          default:{
            this.tambahPegawai(dataUser)
            View.wrongPosisi()
          }
        }

        rl.question(`Masukkan id pegawai: `,(idAdd) =>{
            if (idAdd) {
              rl.question(`Masukkan nama: `,(namaAdd) =>{
                if (namaAdd) {
                  rl.question(`Masukkan password: `,(passwordAdd) =>{
                    if (passwordAdd) {
                      View.clear()
                      View.line()
                        var obj = {
                          id: idAdd,
                          user: namaAdd,
                          password: passwordAdd,
                          nama: namaAdd,
                          status: posisiAdd
                        }
                      this.addPegawai(obj)
                      View.successAddPasien()
                      this.backToMenu(dataUser)
                    } else {
                      View.line()
                      tambahPegawai(dataUser)
                    }
                  })
                } else {
                  View.line()
                  tambahPegawai(dataUser)
                }
              })
            } else {
              View.line()
              this.tambahPegawai(dataUser)
            }
        })
      })
  }

  backToMenu(dataUser){
    View.line()
    rl.question(`Y: balik ke menu utama /  N: Logout | Pilihan=`,(str) =>{
      switch (str) {
        case `N`:{this.logout()}break;
        case `Y`:{this.menu(dataUser)}break;
        default:{}

      }
    })
  }

  table(){
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });

      return table
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



let hospital = new Hospital();

hospital.start()
//hospital.addPasien('a','b','c')
// let data =
//   {
//     user: `kis`,
//     password: `123`,
//     nama: `kis`,
//     position: `RESEPSIONIS`
//
//   }
// //hospital.menu(data)
// hospital.daftarPasien(data)
