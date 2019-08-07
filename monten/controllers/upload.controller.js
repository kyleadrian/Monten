const Transaction = require("../models/transactionsModel");
const User = require("../models/users");
const fs = require("fs");
const csv = require("fast-csv");

module.exports = {
  upload
};

async function upload(req, res, next) {
  const file = req.file;
  const fileStream = fs.createReadStream(file.path);
  const stream = csv.parse({
    headers: [
      "date",
      "description",
      "originalDescription",
      "amount",
      "transactionType",
      "category",
      "accountName",
      "labels",
      "notes"
    ],
    renameHeaders: true,
    ignoreEmpty: true
  });

  const owner = req.user.id;

  fileStream.pipe(
    stream
      .on("data", async data => {
        // Staging (mapping) the data

        const transactionObject = {
          date: data.date,
          merchant: data.description.toLowerCase(),
          description: data.originalDescription.toLowerCase(),
          amount: data.amount,
          transactionType: data.transactionType,
          category: data.category,
          accountName: data.accountName,
          owner
        };

        const transaction = new Transaction(transactionObject);

        try {
          await transaction.save();
        } catch (err) {
          res.status(422).send(err);
        }
      })
      .on("error", error => {
        res.status(422).send(error);
      })
      .on("end", rowCount => {
        res.send({ message: `Succesfully added ${rowCount} new transactions` });
      })
  );
}
