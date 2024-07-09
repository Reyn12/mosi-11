document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("lcgForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const z0LCG = 10122007;
      const aLCG = parseInt(document.getElementById("aLCG").value);
      const c = parseInt(document.getElementById("c").value);
      const mLCG = parseInt(document.getElementById("mLCG").value);
      const lambdaLCG = 0.94;

      const z0Multi = 10122007;
      const aMulti = parseInt(document.getElementById("aMulti").value);
      const mMulti = parseInt(document.getElementById("mMulti").value);
      const lambdaMulti = 2.94;

      const numberOfRows = 100;
      const data = [];
      let ziLCG = z0LCG;
      let ziMulti = z0Multi;

      //   function getRandom(min, max) {
      //     return Math.random() * (max - min) + min;
      //   }

      for (let i = 0; i < numberOfRows; i++) {
        const no = i + 1;

        // LCG Eksponensial (A)
        ziLCG = (aLCG * ziLCG + c) % mLCG;
        const uiLCG = ziLCG / mLCG;

        // Multiplicative Eksponensial (B)
        ziMulti = (aMulti * ziMulti) % mMulti;
        const uiMulti = ziMulti / mMulti;

        // Menghitung waktuAntaraKedatanganTelepon menggunakan rumus (-1 / lambda) * ln(Ui) dimana Ui diambil dari Kolom A dan lambda 0.94
        const waktuAntaraKedatanganTelepon = (-1 / lambdaLCG) * Math.log(uiLCG);

        // Menghitung lamaPenyiapanGalon menggunakan rumus (-1 / lambda) * ln(Ui) dimana Ui diambil dari Kolom B dan lambda 2.94
        const lamaPenyiapanGalon = (-1 / lambdaMulti) * Math.log(uiMulti);

        // Perhitungan
        const waktuAntarKedatangan = uiLCG;
        const lamaPenerimaanPesanan = uiMulti;
        const kumulatifKedatanganPelanggan =
          i === 0
            ? waktuAntaraKedatanganTelepon
            : parseFloat(data[i - 1][4]) + waktuAntaraKedatanganTelepon;
        const formattedKumulatifKedatanganPelanggan =
          kumulatifKedatanganPelanggan.toFixed(2); // Menyimpan 2 angka dibelakang koma
        const lamaPenerimaanTelepon = 7;
        const waktuSelesaiDilayani =
          kumulatifKedatanganPelanggan +
          lamaPenerimaanTelepon +
          lamaPenyiapanGalon;
        const waktuMenungguKonsumen =
          i === 0
            ? 0
            : Math.max(
                0,
                parseFloat(data[i - 1][7]) - kumulatifKedatanganPelanggan
              );
        const waktuMenganggurPelayan =
          i === 0
            ? kumulatifKedatanganPelanggan
            : Math.max(
                0,
                kumulatifKedatanganPelanggan - parseFloat(data[i - 1][7])
              );

        data.push([
          no,
          waktuAntarKedatangan.toFixed(3),
          lamaPenerimaanPesanan.toFixed(3),
          waktuAntaraKedatanganTelepon.toFixed(2),
          formattedKumulatifKedatanganPelanggan, // Menyimpan 2 angka dibelakang koma
          lamaPenerimaanTelepon,
          lamaPenyiapanGalon.toFixed(2),
          waktuSelesaiDilayani.toFixed(2),
          waktuMenungguKonsumen.toFixed(2),
          waktuMenganggurPelayan.toFixed(2),
        ]);
      }

      const tbody = document.querySelector("#simulationTable tbody");
      tbody.innerHTML = ""; // Menghapus Simulasi Sebelumnya

      data.forEach((row) => {
        const tr = document.createElement("tr");
        row.forEach((cell) => {
          const td = document.createElement("td");
          td.textContent = cell;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    });
});
