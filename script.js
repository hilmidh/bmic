
function hitungBmi(tinggi, berat){
    let tinggim = tinggi / 100
    let bmi = berat/(tinggim * tinggim)
    return Number(bmi.toFixed(1))
}

function createTable(tableData) {
    var table = document.getElementById('histr');
    var tableBody = document.getElementById('isiTabel');
  
    tableData.forEach(function(rowData) {
      var row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    // document.body.appendChild(table);
  }


// console.log(hitungBmi(150, 60));

function submit(){
    console.log('jalan');
    let date = new Date().toLocaleDateString('en-GB')
    let bulan = date[3] + date[4]
    switch(bulan){
        case '01': bulan = 'Jan'; break;
        case '02': bulan = 'Feb'; break;
        case '03': bulan = 'Mar'; break;
        case '04': bulan = 'Apr'; break;
        case '05': bulan = 'Mei'; break;
        case '06': bulan = 'Jun'; break;
        case '07': bulan = 'Jul'; break;
        case '08': bulan = 'Agu'; break;
        case '09': bulan = 'Sep'; break;
        case '10': bulan = 'Okt'; break;
        case '11': bulan = 'Nov'; break;
        case '12': bulan = 'Des'; break;
    }
    let tanggal = date[0] + date[1]
    let tahun = date[6] + date[7] + date[8] + date[9]
    let tanggalFix = `${tanggal} ${bulan} ${tahun}`

    
    
    let namaa = document.getElementById("nama")
    let height = document.getElementById("tinggi")
    let weight = document.getElementById("bb")

    // localStorage.setItem(namaa.value, height.value)
   

    
    let user = {
        tanggal: [tanggalFix],
        tinggi: [height.value],
        berat: [weight.value],
        bmi: [hitungBmi(height.value, weight.value)]
    }
    let histori 
    // console.log(JSON.parse(localStorage.getItem('bmiHistori')));
     
    if(!JSON.parse(localStorage.getItem('bmiHistori'))){
        histori = {}
        if(histori[namaa.value]){
            histori[namaa.value].tanggal.push(tanggalFix)
            histori[namaa.value].tinggi.push(height.value)
            histori[namaa.value].berat.push(weight.value)
            histori[namaa.value].bmi.push(hitungBmi(height.value, weight.value))
        }
        else{
            histori[namaa.value] = user
        }
    }
    else{
        histori = JSON.parse(localStorage.getItem('bmiHistori'))
        if(histori[namaa.value]){
            histori[namaa.value].tanggal.push(tanggalFix)
            histori[namaa.value].tinggi.push(height.value)
            histori[namaa.value].berat.push(weight.value)
            histori[namaa.value].bmi.push(hitungBmi(height.value, weight.value))
        }
        else{
            histori[namaa.value] = user
        }
    }
    
    localStorage.setItem('bmiHistori', JSON.stringify(histori));
    localStorage.setItem('user', namaa.value)

    weight.value = ''
    window.location ="result.html"
}

if(document.body.id === "result"){
    console.log('Berhasilll');
    let histori = JSON.parse(localStorage.getItem('bmiHistori'))
    let user = localStorage.getItem('user')

    let bmi = histori[user].bmi[histori[user].bmi.length-1]

    document.getElementById('hasil').innerText = `halo ${user} bmi kamu adalah ${bmi}`

    let tableFinal = []

    for(let i in histori[user].berat){
        let tampung = [histori[user].tanggal[i], histori[user].berat[i], histori[user].bmi[i]]

        tableFinal.push(tampung)
    }

    createTable(tableFinal);

    function hapus(){
        delete histori[user]
        console.log(histori);
        
        localStorage.setItem('bmiHistori', JSON.stringify(histori));
        // localStorage.histori = JSON.stringify(histori)

        document.getElementById('isiTabel').innerHTML = ""
        document.getElementById('dataKosong').innerHTML = "Data Histori Kosong"
    }
}



// let cat ={
//     nama: 'Shiro',
//     "warna_bulu": 'putih',
//     umur: 10
// }

// console.log(cat['warna bulu']);



