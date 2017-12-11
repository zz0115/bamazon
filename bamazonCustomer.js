var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'bamazon_DB'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  readProducts();
  // connection.end();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + ") " + res[i].product_name + ". Price: $" + res[i].price);
    }
    start();
    // connection.end();
  });
}

function start() {
  inquirer.prompt([{
    name: "product",
    type: "rawlist",
    message: "Please choose the ID of the product you want to buy...",
    choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  },
  {
    name: "quantity",
    type: "input",
    message: "How many units of the product would you like to buy?",
  }]).then(function(answer){
    connection.query("SELECT stock_quantity FROM products WHERE item_id=" + answer.product,function(err,res){
      if (err) throw err;
      console.log(res[0].stock_quantity);
      if(answer.quantity<=res[0].stock_quantity){
        //updating quantities in database
        console.log("Updating quantities for the selected product...\n");
        var query = connection.query("UPDATE products SET ? WHERE ?",[
          {
            stock_quantity: res[0].stock_quantity-answer.quantity
          },
          {
            item_id: answer.product
          }
        ], function(err,res){
          console.log("The selected products updated!\n");
        })
        console.log(query.sql);
        //calculating total cost
        var price = connection.query("SELECT price FROM products WHERE item_id="+answer.product,function(error,response){
          if(error) throw error;
          console.log(response);
          var totalPrice = answer.quantity * response[0].price;
          console.log("Your total cost is: $"+totalPrice);
        });
      } else{
        console.log("Insufficient Quantity!");
        return;
      }
    })
    // connection.end();
  })

  // connection.end();
}


// connection.end();
//need to figure out where to put the connection.end()