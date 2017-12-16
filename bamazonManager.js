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
    start();
});

function start() {
    inquirer.prompt({
        name: "choice",
        type: "rawlist",
        message: "Please select what you want to do...",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (answer) {
        console.log(answer.choice);
        switch (answer.choice) {
            case "View Products for Sale":
                viewProductsForSale();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
        }
    })
}

        function viewProductsForSale() {
            connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].item_id + ") " + res[i].product_name + ". Price: $" + res[i].price + ", Quantity: " + res[i].stock_quantity);
                }
                
            })
            // connection.end();
        }

        function viewLowInventory() {
            connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity<5", function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].item_id + ") " + res[i].product_name + ". Price: $" + res[i].price + ", Quantity: " + res[i].stock_quantity);
                }
            })
        }

        function addToInventory() {
            inquirer.prompt([{
                name: "addInv",
                type: "rawlist",
                message: "Please select an item you want to add inventory to:",
                choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
            },
            {
                name: "quantity",
                type: "number",
                message: "Please enter the quantity you want to add:"
            }]).then(function (answer) {
                // console.log(answer.addInv);
                connection.query("SELECT stock_quantity FROM products WHERE item_id=" + answer.addInv, function (err, res) {
                    if (err) throw err;
                    console.log(answer.addInv);
                    console.log(res[0].stock_quantity);
                    console.log("console log types");
                    console.log(typeof(res[0].stock_quantity));
                    console.log(typeof(parseInt(answer.quantity)));
                    connection.query("UPDATE products SET ? WHERE ?", [
                        {
                            stock_quantity: res[0].stock_quantity + parseInt(answer.quantity)
                        },
                        {
                            item_id: answer.addInv
                        }], 
                        function (err, res) {
                            if (err) throw err;
                            // console.log(res[0].stock_quantity);
                           
                            console.log("The selected products updated!\n");
                        })
                })
            })
        }
        // need to work on adding more properties to the new item 
        function addNewProduct() {
            inquirer.prompt([{
                name: "productName",
                type: "input",
                message: "Please provide the name of the product you want to add:"
                },
                {
                name: "departmentName",
                type: "input",
                message: "Please provide the name of the department the new item belongs to:"
                },
                {
                name: "price",
                type: "input",
                message: "Please provide the price of the new product:"
                },
                {
                name: "stockQuantity",
                type: "input",
                message: "Please provide the stock quantity of the new product:"
                }]
            ).then(function (input) {
                connection.query("INSERT INTO products SET ?",
                    {
                        product_name: input.productName,
                        department_name: input.departmentName,
                        price: parseInt(input.price),
                        stock_quantity: parseInt(input.stockQuantity)
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log("New item has been added!");
                    })
            })
        }
   