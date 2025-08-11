const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Session Setup
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie:  { maxAge: 1000 * 60 * 60 * 24 } // 1 day
// }))
//DB config
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hr_management_system",
});

//DB connection
db.connect((err) => {
  if (err) {
    return console.log("Error connecting to the database: ", err);
  }
  console.log("Connected to the database");
});

//API-0: Add staff
app.post("/api/staff", async (req, res) => {
  const {
    FirstName,
    LastName,
    Gender,
    DOB,
    Email,
    Phone,
    Department,
    HireDate,
    Salary,
    Status,
    Address,
    post
  } = req.body;

  const values = [
    post,
    FirstName,
    LastName,
    Gender,
    DOB,
    Email,
    Phone,
    Department,
    HireDate,
    Salary,
    Status,
    Address,
  ];

  const sql = `INSERT INTO staff(PostID,FirstName,LastName,Gender,DOB,Email,Phone,Department,HireDate,Salary,Status,Address) 
    VALUES( ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      
      res
        .status(500)
        .json({ message: "Error executing query: ", error: err.message });
    } else {
      res.status(200).json({ message: "Data Inserted successfully: ", result });
    }
  });
});

app.get("/post", (req,res) =>{
  const sql = "SELECT * FROM post";
  db.query(sql, (err, result ) =>{
    if (err) {
      return res.status(500).json({ message: "Error Fetching Posts", error: err.message})
    }
    res.status(200).json({ message: "Post Fetched successfully", result})
  })
})

//API-1: Get all staff
app.get("/api/getstaff", (req, res) => {
  const sql = "SELECT * FROM staff";
  db.query(sql, (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Error executing query: ", error: err.message });
    } else {
      res.status(200).json({ message: "Data fetched successfully", result });
    }
  });
});

//API-2: Get specific staff by ID
app.get("/api/getstaff/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM staff WHERE EmployeeID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching staff", error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: `No staff exist with ${id} ID` });
    }
    res.status(200).json({ message: "Fetching staff successfully", result });
  });
});

//API-2: Update staff by ID
app.put("/api/updatestaff/:id", (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  console.log("Req Body Data", req.body);

  console.log("Update Data", updateData);

  const sql = `UPDATE staff SET PostID = ?, FirstName = ?, LastName= ?, Gender= ?,
        DOB= ?, Email= ?, Phone= ?, Department= ?, HireDate= ?, Salary= ?, Status= ?, Address= ? WHERE EmployeeID = ?`;
  const values = [
    updateData.post,
    updateData.FirstName,
    updateData.LastName,
    updateData.Gender,
    updateData.DOB,
    updateData.Email,
    updateData.Phone,
    updateData.Department,
    updateData.HireDate,
    updateData.Salary,
    updateData.Status,
    updateData.Address,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error Updating User", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `No staff with ID ${id} to found update` });
    }

    res
      .status(200)
      .json({ message: `Staff with ID: ${id} Updated Successfully` });
  });
});

//-----------------------------my Update--------
app.put("/update/:id", (req, res) => {
  const { id } = req.params;

  const data = req.body;

  const sql =
    "UPDATE  staff  SET FirstName = ?, LastName = ?, Gender = ?, DOB = ?, Email = ?, Phone = ?, Department = ?, HireDate = ?, Salary = ?, Status = ?, Address = ? WHERE EmployeeID = ?";
  const values = [
    data.FirstName,
    data.LastName,
    data.Gender,
    data.DOB,
    data.Email,
    data.Phone,
    data.Department,
    data.HireDate,
    data.Salary,
    data.Status,
      data.Address,
    id
  ];


    db.query(sql, values, (err, result) => {
        if (err) {
            console.log("Error updating staff",err.message );
            
            return res.status(500).json({ message: "Error updating staff", error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No staff found with ID ${id}` });
        }

        res.status(200).json({ message: "updated succesfully!!"})

    });
});



app.delete('/deletedata/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM staff WHERE EmployeeID=?"
    db.query(sql, [id], (err, result) => {
    if (err) {
        res.status(500).json({
            message: "Error Deleting Data...."
        })

        res.status(200).json({ message: "Data deleted!...."})
    }
})    
    
})

//API-3: Delete staff by ID
app.delete("/api/deletestaff/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM staff WHERE EmployeeID = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error Deleting User", error: err.message });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `No staff with ID ${id} to Delete` });
    }

    res
      .status(200)
      .json({ message: `Staf with ID: ${id} Deleted succusfully` });
  });
});

// app.post('/signup', async (req, res) => {
//     const { username, password, EmployeeID } = req.body;

//     if (!username || !password || !EmployeeID) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
//         if (existing.length > 0) {
//             return res.status(400).json({ message: "Username already exists" });
//         }

//         await db.query('INSERT INTO users (Username, Password, EmployeeID) VALUES(?,?,?)', [username, hashedPassword, EmployeeID]);

//         res.status(200).json({ message: "User created successfully" });
//     } catch (error) {
//         res.status(500).json({ message: 'Sign up failled!'})
//     }

// })

app.post("/signup", async (req, res) => {
  const { username, password, EmployeeID } = req.body;

  if (!username || !password || !EmployeeID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error Check  User: ", error: err.message });
      }
      if (result.length > 0) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (Username, Password, EmployeeID) VALUES(?,?,?)",
        [username, hashedPassword, EmployeeID],
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error inserting user: ", error: err.message });
          }
          if (result) {
            return res
              .status(200)
              .json({ message: "User created successfully" });
          }
        }
      );
    }
  );
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res
      .status(400)
      .json({ message: "Password or Username is Missing!" });
  }

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Invalid Username or password" });
      }

      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.Password);

      if (isMatch) {
        req.session.user = {
          id: user.UserID,
          username: user.Username,
        };
        res.status(200).json({ message: "Logged in Succesfully" });
      } else {
        res.status(404).json({ message: "Invalid username or password" });
      }
    }
  );
});

app.get("/me", (req, res) => {
  if (req.session.user) {
    res.json({
      user: req.session.user,
      sessionID: req.sessionID,
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ message: "Error Logout" });
    }
    res.status(200).json({ message: "Logout Successfully" });
  });
});
app.listen(2000, () => console.log("Server is running on port 2000"));

// {
// "EmployeeID": 3,
//     "PostID": 2,
//     "FirstName": "Eric",
//     "LastName": "Gasana",
//     "Gender": "Male",
//     "DOB": 1998-03 - 2,
//         "Email": "eric@gmail.com",
//         "Phone":07891232,
//         "Department": "Surgery",
//         "HireDate": 2023,
//         "Salary": "2K",
//         "Status": "Active",
//             "Address":"123 Main street"
// }

// {
//     "username": "samuel",
//     "password": "123"
// }

// { "username":"Sam", "password":"123", "EmployeeID":1 }
