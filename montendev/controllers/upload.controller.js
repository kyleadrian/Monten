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

  fileStream.pipe(
    stream
      .on("data", async data => {
        // Staging (mapping) the data

        const transactionObject = {
          date: data.date,
          merchant: data.description.toUpperCase(),
          description: data.originalDescription.toUpperCase(),
          amount: Number(data.amount) * 100,
          transactionType: data.transactionType,
          category: data.category,
          subCategory: data.category,
          accountName: data.accountName,
          owner: req.user.id
        };

        switch (transactionObject.category) {
          case "Rental Car & Taxi":
          case "Public Transportation":
            transactionObject.category = "Transport";
            break;
          case "Restaurants":
          case "Food & Dining":
          case "Fast Food":
            break;
          case "Alcohol & Bars":
            transactionObject.category = "Alcohol & Bars";
            break;
          case "Groceries":
            transactionObject.category = "Groceries";
            break;
          case "Gym":
            transactionObject.category = "Gym";
            break;
          case "Mortgage & Rent":
            transactionObject.category = "Rent";
            break;
          case "Uncategorized":
            transactionObject.category = "Uncategorized";
            break;
          case "Laundry":
            transactionObject.category = "Laundry/Dry Cleaning";
            break;
          case "Charity":
            transactionObject.category = "Charity";
            break;
          case "Income":
          case "Paycheck":
          case "Interest Income":
          case "Fees & Charges":
          case "ATM Fee":
          case "Transfer":
          case "Service Fee":
          case "Bank Fee":
          case "Finance Charge":
          case "Transfer for Cash Spending":
          case "Credit Card Payment":
            transactionObject.category = "Non Spending";
            break;
          default:
            transactionObject.category = "Discretionary";
        }

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
        res.send({
          success: true,
          message: `Succesfully added ${rowCount} new transactions`
        });
      })
  );
}
