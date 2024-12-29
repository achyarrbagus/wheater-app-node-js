function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather, showWeatherBaseAll);
  } else {
    alert("Geolocation tidak didukung oleh browser Anda.");
  }
}

// Fungsi untuk menampilkan cuaca berdasarkan lokasi
async function showWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const apiKey = "d276cf050d56c677a1af8f4eef2d8f73"; // Ganti dengan API key Anda dari OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "200") {
      // Menyembunyikan tombol setelah cuaca berhasil diambil
      document.querySelector(".container").style.display = "none";

      //   <h1 id="wheater-city"></h1>;
      const wheaterCity = document.getElementById("wheater-city");

      // Menampilkan tabel cuaca
      const weatherTable = document.getElementById("weather-table");
      weatherTable.style.display = "table";

      wheaterCity.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center;">
        <h3>kode negara: ${data.city.country}</h3>
        <h3>kota:  ${data.city.name}</h3>
        <h3>populasi penduduk: ${data.city.population ? data.city.population + " jiwa" : "Data populasi tidak tersedia"}</h3>
      </div>`;

      for (let i = 0; i < 40; i++) {
        const forecast = data.list[i];
        const time = new Date(forecast.dt * 1000).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

        if (formattedDate === data.list[i].dt_txt.split(" ")[0]) {
          const row = `
                                <tr>
                                    <td>${data.list[i].dt_txt}</td>
                                    <td>${lat}</td>
                                    <td>${lon}</td>
                                    <td>${data.list[i].wind.speed}</td>
                                    <td>${temperature}°C</td>
                                    <td>${description}<img src="${iconUrl}" alt="Cuaca" /></td>
                                </tr>
                            `;

          $("#forecast-body").append(row);
        }
      }
    } else {
      alert("Terjadi kesalahan dalam mendapatkan data cuaca.");
    }
  } catch (error) {
    alert("Terjadi kesalahan, coba lagi nanti!");
  }
}

async function showWeatherBaseAll() {
  const apiKey = "d276cf050d56c677a1af8f4eef2d8f73";
  lat = "-6.3602688";
  lon = "106.7384832";
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "200") {
      // Menyembunyikan tombol setelah cuaca berhasil diambil
      document.querySelector(".container").style.display = "none";

      //   <h1 id="wheater-city"></h1>;
      const wheaterCity = document.getElementById("wheater-city");

      // Menampilkan tabel cuaca
      const weatherTable = document.getElementById("weather-table");
      weatherTable.style.display = "table";

      wheaterCity.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center;">
        <h3>kode negara: ${data.city.country}</h3>
        <h3>kota:  ${data.city.name}</h3>
        <h3>populasi penduduk: ${data.city.population ? data.city.population + " jiwa" : "Data populasi tidak tersedia"}</h3>
      </div>`;

      for (let i = 0; i < 15; i++) {
        const forecast = data.list[i];
        const time = new Date(forecast.dt * 1000).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

        if (formattedDate === data.list[i].dt_txt.split(" ")[0]) {
          const row = `
                                <tr>
                                    <td>${data.list[i].dt_txt}</td>
                                    <td>${lat}</td>
                                    <td>${lon}</td>
                                    <td>${data.list[i].wind.speed}</td>
                                    <td>${temperature}°C</td>
                                    <td>${description}<img src="${iconUrl}" alt="Cuaca" /></td>
                                </tr>
                            `;

          $("#forecast-body").append(row);
        }
      }
    } else {
      alert("Terjadi kesalahan dalam mendapatkan data cuaca.");
    }
  } catch (error) {
    alert("Terjadi kesalahan, coba lagi nanti!");
  }
}

// Fungsi untuk menangani kesalahan jika lokasi tidak ditemukan
function showError(error) {
  console.log(error);
  alert(Error);
}
