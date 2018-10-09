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
                    name: "Menu",
                    type: "list",
                    choices: ["View all inventory", "View Low Inventory", "Add to current inventory", "Add new product to inventory"],                                              //choices
                    message: "Please select an action to take at this time"
                }
                
            ]).then(switch (answer) {
                case "View all inventory":
                viewAllInventory();
                break;

                case "View Low Inventory":
                viewLowInventory();
                break;

                case "Add to current inventory":
                manageInventory();
                break;

                case "Add new product to inventory":
                addNewProduct();
                break;
            }

            function viewAllInventory () {
                for (var i = 0; i < results.length; i++) {
                    console.log(results[i].item_id + " | " + results[i].product_name + " | " + " | in " + results[i].department_name + " category | $" + results[i].price + " | Only "+ results[i].stock_quantity + " left in stock"
                         + "\n-------------------------------------------");
                }
            }

            function viewLowInventory() {
                connection.query("Select product_id, product_name, stock_quantity from products where stock_quantity <=5", function(error,results) {
                    if (error) throw error;
                    for (var i = 0; i < results.length; i++) {
                        console.log(results[i].item_id + " | " + results[i].product_name + " | " 
                                    + " | Only "+ results[i].stock_quantity + " left in stock"
                                    + "\n-------------------------------------------");
                } 

            })
            }

            function manageInventory() {
                inquirer
                .prompt([
                    {
                        name: "inventoryItem",
                        type: "list",
                        choices: ["View all inventory", "View Low Inventory", "Add to current inventory", "Add new product to inventory"],                                              //choices
                        message: "Please select product name to update"
                    },
                    {
                        name: "inventoryQuantity",
                        type: "input",
                        // choices: ["View all inventory", "View Low Inventory", "Add to current inventory", "Add new product to inventory"],                                              //choices
                        message: "How many are we adding"
                    }

                ]).then(function(answer) {

                    connection.query("Update products set stock_quantity = ? where product_name= ?",
                            [
                                {
                                    product_name: inventoryItem

                                },
                                {
                                    stock_quantity: results[i].stock_quantity + answer.itemQuantity

                                }
                            ], function(error,results) {
                                if (error) throw error;
                //                 for (var i = 0; i < results.length; i++) {
                //                     console.log(results[i].item_id + " | " + results[i].product_name + " | " 
                //                                 + " | Only "+ results[i].stock_quantity + " left in stock"
                //                                 + "\n-------------------------------------------");
                // } 

            })
        })
            }


            
            {

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