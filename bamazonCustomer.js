var mysql = require("mysql");
const ctable = require("console.table");
var inquirer = require("inquirer");

// Connection variables.
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

// Connect to the Database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
    start();

    // Close Connection
    // connection.end();
});

function start() {
    // Display the product contents.
    connection.query("select * from products", function (error, results, fields) {
        if (error) throw error;
        console.table(results);
        updatePrice();
    });    
}

function updatePrice(){
    inquirer.prompt([{
        name: "getProductId",
        type: "input",
        message: "Enter Product Id: "
    },
    {
        name: "getQuantity",
        type: "input",
        message: "Enter Quantity: "
    }
    ]).then(function(answer){
        var productId = answer.getProductId;
        console.log("Product key entered : " + productId);

        var quantity = answer.getQuantity;
        console.log("Quantity entered : " + quantity);

        // Check if the product id is present in the table.
        var query = "select stock_quantity,  price from products where item_id = " + productId ;
        connection.query(query, function (error, results, fields){
            if(error)
                throw error;

            if(results.length == 0){
                console.log("Invalid Product id");
            } else if(results[0].stock_quantity == 0 || results[0].stock_quantity < quantity){
                console.log("Insufficient Quantity!")
            } else{
                var price = results[0].price;
                var updateQuery = "update products set stock_quantity = stock_quantity - ? where item_id = ? ";
                connection.query(updateQuery, [quantity, productId], function(error, updResults, updFields){
                    if(error)
                        throw error;
                });

                console.log("Order Successful!");
                console.log("Please Pay: " + (quantity * price));
            }
            connection.end();
        });
    });
}