class View {
  static welcome(object){
    console.log(`---------------------------------------`);
    console.log(` Selamat Datang Di Sistem Scratch `);
    console.log(` ${object[`nama`]} `);
    console.log(` ${object[`alamat`]} `);
    console.log(`-------------------------------------- `);
  }

  static wrongID(){
    console.log((`ID yang kamu masukkan salah!!`));
  }

  static wrongPass(){
    console.log(`Password yang kamu masukkan salah`);
  }

  static wrongMenu(){
    console.log(`Menu yang anda masukkan tidak sesuai!!`);
  }

  static wrongPosisi(){
    console.log(`Posisi yang anda masukkan tidak sesuai!!`);
  }

  static successAddPasien(){
    console.log(`Pasien Berhasil di input`);
  }

  static successHapusPasien(data){
    console.log(`Pasien ${data[`nama`]} Berhasil di delete`);
  }

  static successHapusPegawai(data){
    console.log(`Pegawai ${data[`nama`]} Berhasil di delete`);
  }

  static wrongPosisi(){
    console.log(``);
    console.log(`Posisi yang dimasukkan tidak terdaftar`);
  }

  static line(){
    console.log(`________________________________________ `);
  }

  static clear(){
    console.log("\x1B[2J")
  }
  static welcomMenu(data){
    console.log(`________________________________________`);
    console.log(`SELAMAT DATANG ${data[`nama`]}`);
    console.log(`POSISI: ${data[`position`]}`);
    console.log(`________________________________________`);
  }

  static bye(){
    console.log(``);
    console.log(``);
    console.log(`__Terimakasih telah menggunakan sistem__`);
  }

  static menuOB(){
    console.log(`1. [LOGOUT]`);
  }

  static menuResepsionis(){
    console.log(`1. [LOGOUT]`);
    console.log(`2. [TAMBAH PASIEN]`);
    console.log(`3. [CEK DAFTAR PASIEN]`);
    console.log(`4. [CARI PASIEN]`);
  }

  static menuPerawat(){
    console.log(`1. [LOGOUT]`);
    console.log(`3. [CEK DAFTAR PASIEN]`);
    console.log(`4. [CARI PASIEN]`);
    console.log(`5. [UBAH STATUS PASIEN]`);
  }

  static menuDokter(){
    console.log(`1. [LOGOUT]`);
    console.log(`3. [CEK DAFTAR PASIEN]`);
    console.log(`4. [CARI PASIEN]`);
    console.log(`5. [UBAH STATUS PASIEN]`);
  }

  static menuAdmin(){
    console.log(`1. [LOGOUT]`);
    console.log(`2. [TAMBAH PASIEN]`);
    console.log(`3. [CEK DAFTAR PASIEN]`);
    console.log(`4. [CARI PASIEN]`);
    console.log(`5. [UBAH STATUS PASIEN]`);
    console.log(`6. [HAPUS PASIEN]`);
    console.log(`7. [TAMBAH PEGAWAI]`);
    console.log(`8. [HAPUS PEGAWAI]`);
    console.log(`9. [CEK DAFTAR PEGAWAI]`);
  }

  static daftarPasien(table){
    console.log(`________________________________________`);
    console.log(`DAFTAR PASIEN`);
    console.log(table.toString());
    console.log(`________________________________________`);
  }

  static daftarPegawai(table){
    console.log(`________________________________________`);
    console.log(`DAFTAR PEGAWAI`);
    console.log(table.toString());
    console.log(`________________________________________`);
  }

  static daftarPosisi(){
    console.log(`1. [ADMIN]`);
    console.log(`2. [RESEPSIONIS]`);
    console.log(`3. [PERAWAT]`);
    console.log(`4. [DOKTER]`);
    console.log(`5. [OB]`);
  }
}

module.exports = View;
