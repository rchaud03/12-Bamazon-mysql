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
    var query = connection.query("SELECT * from products where item_id != 1000", function(err, results) {
        if (err) throw err;

            inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function() {
                                var saleItemsArray = [];
                                for (var i = 0; i < results.length; i++) {
                                // saleItemsArray.push(results[i].product_name + " : $" + results[i].price);
                                saleItemsArray.push(results[i].product_name);

                                // saleItemsArray.push(results.product_name + ": $" + results[i].price);

                                }
                        return saleItemsArray;
                    },                                              //choices
                    message: "Please select an item to purchase"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                }
            ]).then(function(answer) {

                var chosenItem;
                var itemPrice;
                var totalCost;
                var itemQuantity;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i].product_name;
                        itemPrice = results[i].price;
                        totalCost = itemPrice * answer.quantity;
                        itemQuantity = results[i].stock_quantity;
                        if (itemQuantity < answer.quantity) {
                            console.log("The quantity selected exceeds our current in stock quantity");
                            connection.end();
                        }
                        else {
                        
                        connection.query("update products set ? where ? ",
                        [
                            {
                                stock_quantity: results[i].stock_quantity - answer.quantity
                            },
                            {
                                product_name: chosenItem
                            }
                        ],
                        function(error) {
                            if (error) throw error;
                            console.log('You selected to purchase ' + chosenItem + " for $" + itemPrice + " each");
                            console.log("Your total is $" + totalCost);
                            connection.end();
                            

                            });

                }   
            }
        }
    }
            )
})
// connection.end();
}