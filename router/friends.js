const express = require('express');

const router = express.Router();

let friends = {
	"johnsmith@gamil.com": {
		firstName: "John",
		lastName: "Doe",
		DOB: "22-12-1990",
	},
	"annasmith@gamil.com": {
		firstName: "Anna",
		lastName: "smith",
		DOB: "02-07-1983",
	},
	"peterjones@gamil.com": {
		firstName: "Peter",
		lastName: "Jones",
		DOB: "21-03-1989",
	},
};

// GET request: Retrieve all friends
router.get("/", (req, res) => {
	res.send(JSON.stringify(friends, null, 4)); // Lab example, but would just send back JSON list
	// Could it do const friendlist = req.params and then req.send(friends[name])?
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
	// Get the email param from the request URL and send the corresponding friend's deets
	const email = req.params.email;
	res.send(friends[email]);
});

// POST request: Add a new friend
router.post("/", (req, res) => {
	// Check if email is provided in the request body
	if (req.body.email) {
		// Create or update friend's deets based on provided email
		friends[req.body.email] = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			DOB: req.body.DOB,
		};
	}
		
	// Send response indicating user addition
	res.send("The user" + (' ') + (req.body.firstName) + " Has been added.");
});

// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
	// Extract email param from req URL
	const email = req.params.email;
	let friend = friends[email]; // Retrieve friend object associated with email

	if (friend) { // Check if friend exists
		let firstName = req.body.firstName;
		let lastName = req.body.lastName;
		let DOB = req.body.DOB;

		// Update first name if provided in request body
		if (firstName) {
			friend["firstName"] = firstName;
		}

		// Update last name if provided in req body
		if (lastName) {
			friend["lastName"] = lastName;
		}

		// Update DOB if provided in req body
		if (DOB) {
			friend["DOB"] = DOB;
		}

		friends[email] = friend; // Update friend details in 'friends' object
		res.send(`Friend with the email ${email} updated.`);
	} else {
		// Respond if friend with specified email isn't found
		res.send("Can't find that friend.");
	}
});

// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
	// Extract the email param from the request URL
	const email = req.params.email;

	if (email) {
		delete friends[email];
	}
	
	res.send(`Friend with the email ${email} has been deleted.`);
});

module.exports=router;
