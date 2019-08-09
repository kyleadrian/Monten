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
            transactionObject.category = "Transport";
            break;
          case "Public Transportation":
            transactionObject.category = "Transport";
            break;
          case "Restaurants":
            transactionObject.category = "Food";
            break;
          case "Food & Dining":
            transactionObject.category = "Food";
            break;
          case "Fast Food":
            transactionObject.category = "Food";
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
            transactionObject.category = "Non Spending";
            break;
          case "Paycheck":
            transactionObject.category = "Non Spending";
            break;
          case "Interest Income":
            transactionObject.category = "Non Spending";
            break;
          case "Fees & Charges":
            transactionObject.category = "Non Spending";
            break;
          case "ATM Fee":
            transactionObject.catgegory = "Non Spending";
            break;
          case "Transfer":
            transactionObject.category = "Non Spending";
            break;
          case "Service Fee":
            transactionObject.category = "Non Spending";
            break;
          case "Bank Fee":
            transactionObject.category = "Non Spending";
            break;
          case "Finance Charge":
            transactionObject.category = "Non Spending";
            break;
          case "Transfer for Cash Spending":
            transactionObject.category = "Non Spending";
            break;
          case "Credit Card Payment":
            transactionObject.category = "Non Spending";
            break;
          default:
            transactionObject.category = "Discretionary";
        }
        //Find more elegant way to write the above, using something like the below.
        /*
      const nonSpending = [
        "Income",
        "Paycheck",
        "Interest Income",
        "Fees & Charges",
        "ATM Fee",
        "Transfer",
        "Service Fee",
        "Bank Fee",
        "Finance Charge",
        "Transfer for Cash Spending",
        "Credit Card Payment"
      ];

      nonSpending.forEach(category => {
        if (transactionObject.category === category) {
          transactionObject.category = "Non Spending";
          console.log(transactionObject);
        }
      });
      */

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
