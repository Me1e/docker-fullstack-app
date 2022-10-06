import express from "express";
import bodyParser from "body-parser";
import db from "./db";

const app = express();

app.use(bodyParser.json());

db.pool.query(
  `CREATE TABLE list (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
  )`,
  (err, results) => {
    if (err) console.log(err);
    console.log("results", results);
  }
);

app.use("/api/values", (req, res) => {
  db.pool.query("SELECT * FROM list", (err, results) => {
    if (err) return res.status(500).send(err);
    return res.json(results);
  });
});

app.post("api/value", (req, res) => {
  db.pool.query(
    "INSERT INTO list (value) VALUES (?)",
    [req.body.value],
    (err) => {
      if (err) return res.status(500).send(err);
      return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
