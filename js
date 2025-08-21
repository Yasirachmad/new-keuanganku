let daftarTransaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

// render transaksi ke layar
function renderTransaksi() {
  const list = document.getElementById("daftarTransaksi");
  const saldoEl = document.getElementById("saldo");
  list.innerHTML = "";
  let saldo = 0;

  daftarTransaksi.forEach((t, index) => {
    const li = document.createElement("li");
    li.classList.add(t.tipe);
    li.innerHTML = `
      ${t.deskripsi} - Rp ${t.jumlah.toLocaleString()} 
      <button onclick="hapusTransaksi(${index})">x</button>
    `;
    list.appendChild(li);

    if (t.tipe === "pemasukan") {
      saldo += t.jumlah;
    } else {
      saldo -= t.jumlah;
    }
  });

  saldoEl.textContent = saldo.toLocaleString();
}

// tambah transaksi
document.getElementById("formTransaksi").addEventListener("submit", function(e) {
  e.preventDefault();
  const deskripsi = document.getElementById("deskripsi").value;
  const jumlah = parseInt(document.getElementById("jumlah").value);
  const tipe = document.getElementById("tipe").value;

  daftarTransaksi.push({ deskripsi, jumlah, tipe });

  localStorage.setItem("transaksi", JSON.stringify(daftarTransaksi));
  renderTransaksi();
  this.reset();
});

// hapus transaksi
function hapusTransaksi(index) {
  daftarTransaksi.splice(index, 1);
  localStorage.setItem("transaksi", JSON.stringify(daftarTransaksi));
  renderTransaksi();
}

// render awal
renderTransaksi();
