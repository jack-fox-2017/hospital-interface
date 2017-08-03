class ViewHospital{
  static header(hospital){
    //console.log(hospital);
    console.log('\x1Bc');
    console.log('---------------------------------------');
    console.log('Selamat Datang di '+hospital[0].name);
    console.log('---------------------------------------');
    console.log('Lokasi Rumah Sakit : '+hospital[0].location);
    console.log('Jumlah karyawan RS beserta dokter saat ini: '+hospital[0].employees.length+' orang');
    console.log('Jumlah pasien RS saat ini: '+hospital[0].patients.length+' orang');
    console.log('---------------------------------------');
  }
  static user(name, position){
    console.log('\n---------------------------------------');
    console.log('Selamat datang, '+name+'. ['+position+']');
    console.log('---------------------------------------');
  }

  static menu(numOfOps){
    console.log('\n-----MENU PERINTAH-----');
    if(numOfOps == 8){
      console.log('- list_karyawan');
      console.log('- add_karyawan');
      console.log('- rm_karyawan <karyawan_id>');
    }
    if(numOfOps >= 5){
      console.log('- list_pasien');
      console.log('- add_pasien');
      console.log('- rm_pasien <pasien_id>');
      console.log('- view_record <pasien_id>');
      console.log('- add_record <pasien_id>');
      console.log('- rm_record <pasien_id> <diagnosa_id>');
    }
    console.log('- logout');
    console.log('- exit');
    console.log('---------------------\n');
  }
  static list(data, auth){
    console.log('\x1Bc');
    console.log('---------------------------------------');
    for(let i=0; i<data.length; i++){
      if(auth == 'karyawan'){
          console.log(+i+1+'. '+data[i].name+' ['+data[i].position+']');
      }else if(auth == 'pasien'){
        console.log(i+1+'. '+data[i].name+' [No.Id : '+data[i].id+']');
      }else{
        console.log(i+1+'. '+data[i]);
      }
    }
    console.log('---------------------------------------');
  }
  static info(inf){
    console.log('\x1Bc');
    console.log('---------------------------------------');
    console.log(inf);
    console.log('---------------------------------------');
  }
}

module.exports = ViewHospital;
