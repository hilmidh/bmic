
function hitungBmi(tinggi, berat) {
    let tinggim = tinggi / 100
    let bmi = berat / (tinggim * tinggim)
    return Number(bmi.toFixed(1))
}

function createTable(tableData) {
    let table = document.getElementById('histr');
    let tableBody = document.getElementById('isiTabel');

    tableData.forEach(function (rowData) {
        let row = document.createElement('tr');

        rowData.forEach(function (cellData) {
            let cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    // document.body.appendChild(table);
}

function createlist(arr) {
    let ul = document.getElementById('solusi')
    let la = document.getElementById('makanan')

    for (let i = 0; i < arr[0].length; i++) { // iterate through the array
        let li = document.createElement("li"); // create a list item element
        li.textContent = arr[0][i]; // add the array item's value as textContent to the list item element
        ul.appendChild(li); // append the list item element to the unordered list element
    }

    for (let i = 0; i < arr[1].length; i++) { // iterate through the array
        let li = document.createElement("li"); // create a list item element
        li.textContent = arr[1][i]; // add the array item's value as textContent to the list item element
        la.appendChild(li); // append the list item element to the unordered list element
    }
}


// console.log(hitungBmi(150, 60));
function onSubmit() {

}

function submit() {
    console.log('jalan');
    let date = new Date().toLocaleDateString('en-GB')
    let bulan = date[3] + date[4]
    switch (bulan) {
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
    if (!namaa.value || !height.value || !weight.value) {
        alert('Masukkan semua data dengan benar')
    }
    else {
        let user = {
            tanggal: [tanggalFix],
            tinggi: [height.value],
            berat: [weight.value],
            bmi: [hitungBmi(height.value, weight.value)]
        }
        let histori
        // console.log(JSON.parse(localStorage.getItem('bmiHistori')));

        if (!JSON.parse(localStorage.getItem('bmiHistori'))) {
            histori = {}
            if (histori[namaa.value]) {
                histori[namaa.value].tanggal.push(tanggalFix)
                histori[namaa.value].tinggi.push(height.value)
                histori[namaa.value].berat.push(weight.value)
                histori[namaa.value].bmi.push(hitungBmi(height.value, weight.value))
            }
            else {
                histori[namaa.value] = user
            }
        }
        else {
            histori = JSON.parse(localStorage.getItem('bmiHistori'))
            if (histori[namaa.value]) {
                histori[namaa.value].tanggal.push(tanggalFix)
                histori[namaa.value].tinggi.push(height.value)
                histori[namaa.value].berat.push(weight.value)
                histori[namaa.value].bmi.push(hitungBmi(height.value, weight.value))
            }
            else {
                histori[namaa.value] = user
            }
        }

        localStorage.setItem('bmiHistori', JSON.stringify(histori));
        localStorage.setItem('user', namaa.value)

        weight.value = ''
        window.location = "result.html"
    }



}

if (document.body.id === "result") {
    console.log('Berhasilll');
    let histori = JSON.parse(localStorage.getItem('bmiHistori'))
    let user = localStorage.getItem('user')

    let bmi = histori[user].bmi[histori[user].bmi.length - 1]
    let ktg = ''
    if (bmi < 18.5) {
        ktg = 'Kurus'
        document.getElementById('pesan').innerText = "Tambahkan berat badan secara sehat!"
        createlist([['Konsumsi makanan tinggi kalori dan protein (nasi merah, daging tanpa lemak, kacang-kacangan)', 'Tambahkan camilan sehat di antara waktu makan', 'Lakukan latihan kekuatan untuk membangun massa otot', 'Pastikan tidur cukup untuk pemulihan tubuh'], ['Karbohidrat sehat: Nasi merah, kentang, ubi, roti gandum',
            'Protein: Dada ayam, telur, ikan salmon, tahu, tempe',
            'Lemak sehat: Alpukat, kacang almond, minyak zaitun',
            'Camilan sehat: Smoothie buah dengan susu, granola, dark chocolate']])
        document.getElementById('ktgMakanan').innerText = "Makanan tinggi kalori dan protein sehat"
        document.getElementById('kuning').innerText = `${bmi}, Kurus`
    }
    else if (bmi >= 18 && bmi <= 24.9) {
        ktg = 'Berat Ideal'
        document.getElementById('pesan').innerText = "Pertahankan berat badan kamu"
        createlist([["Konsumsi makanan seimbang (karbohidrat kompleks, protein, lemak sehat)", "Tetap aktif dengan olahraga 3-5 kali seminggu", "Jaga pola tidur 7-8 jam per malam", "Kelola stres dengan meditasi atau aktivitas yang disukai"], ['Karbohidrat sehat: Quinoa, oatmeal, pasta gandum',
            'Protein: Daging tanpa lemak, ikan tuna, yoghurt, edamame',
            'Lemak sehat: Biji chia, biji bunga matahari, minyak kelapa',
            'Camilan sehat: Buah segar, yoghurt dengan madu, kacang-kacangan']])
        document.getElementById('ktgMakanan').innerText = "Makanan seimbang"
        document.getElementById('hijau').innerText = `${bmi}, Berat Ideal`
    }
    else if (bmi >= 25 && bmi <= 29.9) {
        ktg = 'Berat Berlebih'
        document.getElementById('pesan').innerText = "Turunkan berat badan secara sehat!"
        createlist([["Kurangi asupan kalori, terutama dari gula dan lemak jenuh", 'Tingkatkan aktivitas fisik (aerobik, jalan kaki, berenang)', 'Perbanyak serat untuk mengurangi rasa lapar', 'Hindari makan berlebihan dengan mengontrol porsi'], ['Karbohidrat sehat: Beras merah, oat, jagung rebus',
            'Protein: Ikan bakar, dada ayam tanpa kulit, kacang merah',
            'Lemak sehat: Minyak zaitun, alpukat, biji rami',
            'Camilan sehat: Salad sayur, popcorn tanpa mentega, buah potong']])
        document.getElementById('ktgMakanan').innerText = "Makanan rendah kalori dan tinggi serat"
        document.getElementById('kuning').innerText = `${bmi}, Berat Berlebih`
    }
    else if (bmi >= 30) {
        ktg = "Obesitas"
        document.getElementById('pesan').innerText = "Turunkan berat badan dengan optimal!"
        createlist([['Fokus pada makanan rendah kalori dan tinggi serat', 'Lakukan olahraga rutin yang disesuaikan dengan kondisi tubuh', 'Kurangi konsumsi makanan olahan dan junk food', 'Konsultasikan dengan ahli gizi atau dokter untuk rencana diet yang sesuai'], ['Karbohidrat sehat: Brokoli, bayam, wortel, kubis',
            'Protein: Tahu kukus, ikan panggang, putih telur, dada ayam rebus',
            'Lemak sehat: Kenari, biji labu, flaxseed',
            'Camilan sehat: Jus hijau tanpa gula, sup bening, kacang-kacangan panggang']])
        document.getElementById('ktgMakanan').innerText = "Makanan rendah kalori dan tinggi nutrisi"
        document.getElementById('merah').innerText = `${bmi}, Obesitas`
    }



    // document.getElementById('hasil').innerText = `halo ${user} bmi kamu adalah ${bmi}`
    document.getElementById('hasilNama').innerHTML = `Halo ${user}! BMI kamu : <span class="value" id="hasilBMI">${bmi}</span>, <span class="status">${ktg}</span>`
    document.getElementById("namaa").innerText = `${user}`
    // document.getElementById('hasilBMI').innerText = bmi 

    let tableFinal = []

    for (let i in histori[user].berat) {
        let tampung = [histori[user].tanggal[i], histori[user].berat[i], histori[user].bmi[i]]

        tableFinal.push(tampung)
    }

    createTable(tableFinal);

    function hapus() {
        let text = "Yakin ingin menghapus?";
        if (confirm(text) == true) {
            delete histori[user]
            console.log(histori);

            localStorage.setItem('bmiHistori', JSON.stringify(histori));
            // localStorage.histori = JSON.stringify(histori)

            document.getElementById('isiTabel').innerHTML = "<td></td><td>Riwayat data perhitungan kosong</td><td></td>"
            // document.getElementById('dataKosong').innerHTML = "Data Histori Kosong"
        } else {
            text = "You canceled!";
        }

    }
}
