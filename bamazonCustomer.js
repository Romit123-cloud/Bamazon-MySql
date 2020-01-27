var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",

  port: 3300,

  user: "root",

  password: "root",
	database: 'Bamazon_db'
});

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a legitimate number.';
	}
}

function promptUserPurchase() {

	//Prompt the user to choose item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you are purchasing.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How much/many of the item do you want to buy?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
		
		var item = input.item_id;
		var quantity = input.quantity;

	
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('Invalid Item-ID. Please select a valid Item-ID.');
				displayInventory();

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {
					console.log('Yay! The product you want is in stock! Placing order now!');

					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed with us! Your total comes out to $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough of the product you have requested, your order cannot be placed.');
					console.log('Please change your order or contact us for further help.');
                    displayInventory();
				}
			}
		})
	})
}

function displayInventory() {
    
    queryStr = 'SELECT * FROM products';

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Current Inventory: ');

		var str = '';
		for (var i = 0; i < data.length; i++) {
			str = '';
			str += 'Item ID: ' + data[i].item_id;
			str += 'Product Name: ' + data[i].product_name;
			str += 'Department: ' + data[i].department_name;
			str += 'Price: $' + data[i].price;

			console.log(str);
		}

	  	promptUserPurchase();
	})
}


function runBamazon() {

	displayInventory();
}

runBamazon();





