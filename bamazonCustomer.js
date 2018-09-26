var sql = require("mysql");
var inquirer = require("inquirer");

var connection = sql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "bootcamp",
    database: "bamazon"
});


connection.connect(function (err) {
    if (err) throw err;

    startApp();
});

function startApp() {
    var query = connection.query("SELECT * from products", function(err, results) {
        if (err) throw err;
        // console.log(results);
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " | " + results[i].product_name + " | " + " | in " + results[i].department_name + " category | $" + results[i].price + " | Only "+ results[i].stock_quantity + " left in stock"
            + "\n-------------------------------------------");
            connection.end();
            inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function() {
                        var saleItemsArray = [];
                        for (var i = 0; i < results.length; i++) {
                            saleItemsArray.push(results[i].product_name + ": $" + results[i].price);
                        }
                        return saleItemsArray;
                    },
                    message: "Please select an item to purchase"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                }
            ]).then(function(answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].stock_quantity < answer.quantity) {
                        console.log("The quantity requested exceeds out current inventory/stock quantity of "+ results[i].stock_quantity);

                    }
                    else 
                    {
                        var totalCost = answer.quantity * results[i].price;
                        console.log("Your total is $" + totalCost);
                    }
                }
            })


        }
        // connection.end();
    }
    )
}