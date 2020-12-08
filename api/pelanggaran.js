module.exports = function (app, db) {
  app.get("/pelanggaran", (req, res) => {
    let sql = "select * from pelanggaran";

    db.query(sql, (error, result) => {
      let response = null;
      if (error) {
        response = {
          message: error.message,
        };
      } else {
        response = {
          count: result.length,
          pelanggaran: result,
        };
      }
      res.json(response);
    });
  });

  app.get("/pelanggaran/:id", (req, res) => {
    let data = {
      id_pelanggaran: req.params.id,
    };

    let sql = "select * from pelanggaran where ?";

    db.query(sql, data, (error, result) => {
      let response = null;
      if (error) {
        response = {
          message: error.message,
        };
      } else {
        response = {
          count: result.length,
          pelanggaran: result,
        };
      }
      res.json(response);
    });
  });

  app.post("/pelanggaran", (req, res) => {
    let data = {
      nama_pelanggaran: req.body.nama_pelanggaran,
      poin: req.body.poin,
    };

    let sql = "insert into pelanggaran set ?";

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

  app.put("/pelanggaran", (req, res) => {
    let data = [
      {
        nama_pelanggaran: req.body.nama_pelanggaran,
        poin: req.body.poin,
      },
      {
        id_pelanggaran: req.body.id_pelanggaran,
      },
    ];

    let sql = "update pelanggaran set ? where ?";

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

  app.delete("/pelanggaran/:id", (req, res) => {
    let data = {
      id_pelanggaran: req.params.id_pelanggaran,
    };

    let sql = "delete from pelanggaran where ?";

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
};
