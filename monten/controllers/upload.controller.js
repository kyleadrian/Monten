const Transaction = require("../models/transactionsModel");
const fs = require("fs");
const csv = require("fast-csv");

module.exports = {
  upload
};

function upload(req, res, next) {
  const file = req.file;
  const fileStream = fs.createReadStream(file.path);
  const stream = csv.parse({ headers: true });
  const transactions = [];

  fileStream.pipe(
    stream
      .on("data", data => {
        transactions.push(data);
      })
      .on("error", error => {
        console.log(error);
      })
      .on("end", () => {
        res.send(transactions);
      })
  );
}
