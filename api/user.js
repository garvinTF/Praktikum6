const md5 = require("md5");
module.exports = function (app, db) {
  app.get("/user", (req, res) => {
    let sql = "select * from user";

    db.query(sql, (error, result) => {
      let response = null;
      if (error) {
        response = {
          message: error.message,
        };
      } else {
        response = {
          count: result.length,
          user: result,
        };
      }
      res.json(response);
    });
  });

  app.get("/user/:id", (req, res) => {
    let data = {
      id_user: req.params.id,
    };

    let sql = "select * from user where ?";

    db.query(sql, data, (error, result) => {
      let response = null;
      if (error) {
        response = {
          message: error.message,
        };
      } else {
        response = {
          count: result.length,
          user: result,
        };
      }
      res.json(response);
    });
  });

  app.post("/user", (req, res) => {
    const { nama_user, username, password } = req.body;
    let data = { nama_user, username, password: md5(password) };

    let sql = "insert into user set ?";

    db.query(sql, data, (error, result) => {
      let response = null;
      if (error) {
        response = {
          message: error.message,
        };
      } else {
        response = {
          message: result.affectedRows + " Data Inserted!",
        };
      }
      res.json(response);
    });
  });

  app.put("/user", (req, res) => {
    let data = [
      {
        nama_user: req.body.nama_user,
        username: req.body.username,
        password: req.body.password,
      },
      {
        id_user: req.body.id_user,
      },
    ];

    let sql = "update user set ? where ?";

    db.query(sql, data, (error, result) => {
      let response = null;
      if (error) {
        response = {
          message: error.message,
        };
      } else {
        response = {
          message: result.affectedRows + " Data Updated!",
        };
      }
      res.json(response);
    });
  });

  app.delete("/user/:id", (req, res) => {
    let data = {
      id_user: req.params.id_user,
    };

    let sql = "delete from user where ?";

    db.query(sql, data, (error, result) => {
      let response = null;
      if (error) {
        response = {
          message: error.message,
        };
      } else {
        response = {
          message: result.affectedRows + " Data Deleted!",
        };
      }
      res.json(response);
    });
  });

  app.post("/user/auth", (req, res) => {
    const data = ({ username, password } = req.body);
    const sql = `select * from user where username = \'${username}\' AND password = \'${md5(password)}\'`;
    db.query(sql, data, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  });
};
