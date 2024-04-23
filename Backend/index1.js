const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "leavemanagementsystem"
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/principallogin/", (req, res) => {
  const { email, password } = req.query;
  const sqlSelect = "SELECT * FROM principal WHERE email= ? AND password= ?";
  db.query(sqlSelect, [email, password], (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.get("/api/hodlogin/", (req, res) => {
  const { email, password } = req.query;
  const sqlSelect = "SELECT * FROM hod WHERE email= ? AND password= ?";
  db.query(sqlSelect, [email, password], (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.get("/api/stafflogin/", (req, res) => {
  const { email, password } = req.query;
  const sqlSelect = "SELECT * FROM staff WHERE email= ? AND password= ?";
  db.query(sqlSelect, [email, password], (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.post("/api/addhod", (req, res) => {
  const { name, email, password, address, mobile, department } = req.body;
  console.log(req.body);
  const sqlInsert =
    "INSERT INTO hod (name, email,password,address,mobile,department) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [name, email, password, address, mobile, department],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/api/addstaff", (req, res) => {
  const {
    name,
    email,
    password,
    address,
    mobile,
    department,
    subject,
    totalleave
  } = req.body;
  console.log(req.body);
  const sqlInsert =
    "INSERT INTO staff (name, email,password,address,mobile,department,subject,total_leave) VALUES (?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [name, email, password, address, mobile, department, subject, totalleave],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.get("/api/hodlist/", (req, res) => {
  const sqlSelect = "SELECT * FROM hod";
  db.query(sqlSelect, [], (err, result) => {
    res.send(result);
    // console.log(result);
  });
});

app.get("/api/stafflist/", (req, res) => {
  const sqlSelect = "SELECT * FROM staff";
  db.query(sqlSelect, [], (err, result) => {
    res.send(result);
    // console.log(result);
  });
});

app.delete("/api/deletehod/", (req, res) => {
  const { id } = req.query;
  console.log(id);
  const sqlSelect = "DELETE FROM hod WHERE hod_id=?";
  db.query(sqlSelect, [id], (err, result) => {
    res.json({ status: 200 });
    console.log(result);
  });
});

app.delete("/api/deletestaff/", (req, res) => {
  const { id } = req.query;
  console.log(id);
  const sqlSelect = "DELETE FROM staff WHERE staff_id=?";
  db.query(sqlSelect, [id], (err, result) => {
    res.json({ status: 200 });
    console.log(result);
  });
});

app.put(`/api/edithod/`, (req, res) => {
  const { name, password, address, mobile, department, id } = req.body;
  console.log(name, password, address, mobile);
  const sqlSelect =
    "UPDATE hod SET name = ?,password=?,address=?,mobile=?,department=? WHERE hod_id = ?";
  db.query(
    sqlSelect,
    [name, password, address, mobile, department, id],
    (err, result) => {
      res.json({ status: 200 });
    }
  );
});

app.put(`/api/editstaff/`, (req, res) => {
  const { name, password, address, mobile, department, subject, id } = req.body;
  console.log(name, password, address, mobile);
  const sqlSelect =
    "UPDATE staff SET name = ?,password=?,address=?,mobile=?,department=?,subject=? WHERE staff_id = ?";
  db.query(
    sqlSelect,
    [name, password, address, mobile, department, subject, id],
    (err, result) => {
      res.json({ status: 200 });
      //console.log(result);
    }
  );
});

app.put(`/api/editprincipalprofile/`, (req, res) => {
  const { name, email, password, address, mobile, id } = req.body;
  console.log("principal data => ", req.body);
  const sqlSelect =
    "UPDATE principal SET name = ?,email=?,password=?,address=?,mobile=? WHERE principal_id = ?";
  db.query(
    sqlSelect,
    [name, email, password, address, mobile, id],
    (err, result) => {
      res.json({ status: 200, message: "Profile Updated Successfully" });
      //console.log(result);
    }
  );
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
