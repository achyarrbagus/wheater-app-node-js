const mysql = require("mysql2/promise");

// Simpan koneksi sebagai variabel global
let connection;

// Fungsi untuk mengatur koneksi MySQL
const Mysql = async () => {
  try {
    // Jika koneksi sudah ada, gunakan yang lama
    if (!connection) {
      connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "my_database",
      });
      console.log("Connected to MySQL database.");
    }
    return connection;
  } catch (err) {
    console.error("Error connecting to MySQL:", err.message);
    throw err;
  }
};

// Fungsi untuk menutup koneksi
const closeConnection = async () => {
  if (connection) {
    await connection.end();
    console.log("Connection closed.");
  }
};

// Contoh penggunaan
(async () => {
  const db = await Mysql();

  try {
    const [rows] = await db.query("SELECT * FROM users");
    console.log("Query Results:", rows);
  } catch (err) {
    console.error("Error executing query:", err.message);
  } finally {
    await closeConnection();
  }
})();

// Mengekspor fungsi dan koneksi
module.exports = {
  Mysql,
  closeConnection,
};
