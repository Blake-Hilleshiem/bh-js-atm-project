class Account {
  constructor(balance, transactions) {
    this.balance = balance.toFixed(2);
    this.transactions = transactions;
  }

  viewBalance() {
    console.clear();
    console.log(`Your current balance is $${this.balance}`);
  }

  withdraw(withdrawNumber) {
    this.balance = (Number(this.balance) - Number(withdrawNumber)).toFixed(2);
    this.transactions.push(`         - ${withdrawNumber.toFixed(2)}`);
    console.clear();
    console.log(
      `$${withdrawNumber.toFixed(2)} dispenced. Please take your money. 
      
Your new balance is $${this.balance}`
    );
  }

  deposit(depositNumber) {
    this.balance = (Number(this.balance) + Number(depositNumber)).toFixed(2);
    this.transactions.push(`         + ${depositNumber.toFixed(2)}`);
    console.clear();
    console.log(
      `$${depositNumber.toFixed(2)} deposited. 
      
Your new balance is $${this.balance}`
    );
  }

  printRecipt() {
    console.clear();
    console.log("Thank you for your visit! Here is your recipt:");
    console.log(` ______________________`);
    console.log(` |                     `);
    for (let msg of this.transactions) {
      console.log(` | ${msg} `);
    }
    console.log(" | __________________ ");
    console.log(` |  Balance: $${this.balance} `);
    console.log(` ----------------------`);
  }
}

function inputFormatter(strAmount) {
  let formattedAmount = "";
  if (strAmount.includes(",") == true || strAmount.includes("$") == true) {
    for (let char of strAmount) {
      if (char == "$" || char == ",") {
      } else {
        formattedAmount += char;
      }
    }
  } else {
    formattedAmount = strAmount;
  }

  return Number(formattedAmount);
}

function addOrSubtractFunds(individualAccountObject, addOrSubtract) {
  let back = false;

  if (addOrSubtract == "add") {
    while (back == false) {
      console.clear();
      console.log(`Balance: $${individualAccountObject.balance}`);
      let withdrawAmt = inputFormatter(
        prompt(
          `How much would you like to withdraw? 
  <enter> to cancel`
        )
      );

      if (isNaN(withdrawAmt)) {
        console.clear();
        console.log(
          "-- Error: invalid entry. Please enter amount in the following format, example: 100.00 --"
        );
      } else if (
        withdrawAmt <= individualAccountObject.balance &&
        withdrawAmt != ""
      ) {
        individualAccountObject.withdraw(withdrawAmt);
      } else if (+withdrawAmt > individualAccountObject.balance) {
        console.clear();
        console.log("-- Error: insufficent funds --");
      } else if (withdrawAmt == "") {
        console.clear();
        console.log("-- action cancelled --");
      }

      let inputBack = prompt(`What would you like to do next?

      1.) Make another withdrawl
      2.) Return to main menu
      `);
      if (inputBack == 1) {
      } else {
        back = true;
        console.clear();
      }
    }
  } else if (addOrSubtract == "subtract") {
    while (back == false) {
      console.clear();
      console.log(`Balance: $${individualAccountObject.balance}`);
      let depositAmt = inputFormatter(
        prompt(
          `How much would you like to deposit? 
  <enter> to cancel`
        )
      );
      if (isNaN(depositAmt)) {
        console.clear();
        console.log(
          "-- Error: invalid entry. Please enter amount in the following format, example: 100.00 --"
        );
      } else if (depositAmt != "") {
        individualAccountObject.deposit(depositAmt);
      } else if (depositAmt == "") {
        console.clear();
        console.log("-- action cancelled --");
      }

      let inputBack = prompt(`What would you like to do next?

  1.) Make another deposit
  2.) Return to main menu
  `);
      if (inputBack == 1) {
      } else {
        back = true;
        console.clear();
      }
    }
  }
}

function atmProgram(individualAccountObject) {
  let run = true;
  while (run == true) {
    let nextAction = prompt(`===============================
 Welcome to the JS Virtual ATM
===============================
  What would you like to do?
    1.) See Balance
    2.) Withdraw
    3.) Deposit

  <enter> to quit

  `);

    if (nextAction == 1) {
      individualAccountObject.viewBalance();
    } else if (nextAction == 2) {
      addOrSubtractFunds(individualAccountObject, "add");
    } else if (nextAction == 3) {
      addOrSubtractFunds(individualAccountObject, "subtract");
    } else if (nextAction == "") {
      individualAccountObject.printRecipt();
      run = false;
    }
  }
}

const blakesAccount = new Account(1000, []);
const bobsAccount = new Account(500, []);

atmProgram(bobsAccount);
// atmProgram(blakesAccount);
