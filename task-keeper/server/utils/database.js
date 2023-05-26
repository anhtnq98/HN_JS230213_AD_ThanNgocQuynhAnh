const mysql = require("mysql");

const connectionMySQL = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "task_keeper",
  password: "12345678",
});

// Tạo kết nói và kiểm tra

connectionMySQL.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Kết nối thành công");
  }
});

// Gửi connection này ra

module.exports = connectionMySQL;
