const express = require('express')
const bodyParser = require('body-parser')

const mysql = require("mysql");
const app = express();
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());




//Establish the database connection

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "quadone_crm"
});

db.getConnection((error)=>{
    if(error){
      console.log(error);
    }else{
      console.log("successfully Connected to DB");
    }
});

//Establish the Port

app.listen(3000, (error)=>{
    if(error){
        console.log("Server connection Failed");
    }else{
        console.log("Server started at Port No. 3000");
    }
});

app.get("", (req, res) => {
  res.send({ status: true, data: "successful" });
});


app.get("/api/admin_tasks/roles", (req, res) => {
  var sql = "SELECT * FROM roles";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.post("/api/admin_tasks/roles/add", (req, res) => {
    let details = {
      role_name: req.body.roleName
    };
    let sql = "INSERT INTO roles SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Role created Failed" });
      } else {
        res.send({ status: true, message: "Role created successfully" });
      }
    });
  });



app.patch("/api/admin_tasks/roles/update/:id", (req, res) => {
    let sql = "UPDATE roles SET role_name = '"+req.body.roleName+"' WHERE roles.id = "+req.params.id;
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Role Updated Failed", data: error });
      } else {
        res.send({ status: true, message: "Role Updated successfully", data: result });
      }
    });
  });

  app.patch("/api/admin_tasks/roles/status/:id", (req, res) => {
    let sql = "UPDATE roles SET role_status = '"+req.body.roleStatus+"' WHERE roles.id = "+req.params.id;
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Role Updated Failed", data: error });
      } else {
        res.send({ status: true, message: "Role Updated successfully", data: result });
      }
    });
  });



// //Create the Records
// server.post("/api/student/add", (req, res) => {
//     let details = {
//       stname: req.body.stname,
//       course: req.body.course,
//       fee: req.body.fee,
//     };
//     let sql = "INSERT INTO student SET ?";
//     db.query(sql, details, (error) => {
//       if (error) {
//         res.send({ status: false, message: "Student created Failed" });
//       } else {
//         res.send({ status: true, message: "Student created successfully" });
//       }
//     });
//   });



// //view the Records

// server.get("/api/student", (req, res) => {
//     var sql = "SELECT * FROM student";
//     db.query(sql, function (error, result) {
//       if (error) {
//         console.log("Error Connecting to DB");
//       } else {
//         res.send({ status: true, data: result });
//       }
//     });
//   });


// //Search the Records

// server.get("/api/student/:id", (req, res) => {
//     var studentid = req.params.id;
//     var sql = "SELECT * FROM student WHERE id=" + studentid;
//     db.query(sql, function (error, result) {
//       if (error) {
//         console.log("Error Connecting to DB");
//       } else {
//         res.send({ status: true, data: result });
//       }
//     });
//   });



// //Update the Records

// server.put("/api/student/update/:id", (req, res) => {
//     let sql =
//       "UPDATE student SET stname='" +
//       req.body.stname +
//       "', course='" +
//       req.body.course +
//       "',fee='" +
//       req.body.fee +
//       "'  WHERE id=" +
//       req.params.id;
  
//     let a = db.query(sql, (error, result) => {
//       if (error) {
//         res.send({ status: false, message: "Student Updated Failed" });
//       } else {
//         res.send({ status: true, message: "Student Updated successfully" });
//       }
//     });
//   });



//   //Delete the Records

//   server.delete("/api/student/delete/:id", (req, res) => {
//     let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
//     let query = db.query(sql, (error) => {
//       if (error) {
//         res.send({ status: false, message: "Student Deleted Failed" });
//       } else {
//         res.send({ status: true, message: "Student Deleted successfully" });
//       }
//     });
//   });