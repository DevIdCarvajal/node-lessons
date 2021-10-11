const express = require('express');
require('dotenv').config();

const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Main Code Here //
// Generating JWT
app.post("/user/generateToken", (req, res) => {
	console.log("gt")
	// Validate User Here

    //db.users.find({ user: req.body.user, pass: req.body.pass })
        //.then((err, result) => {

            // Then generate JWT Token

            let data = {
                time: Date(),
                userId: 12,
            }

            const token = jwt.sign(data, process.env.JWT_SECRET_KEY);

            res.send(token);
        //})
});

// Verification of JWT
app.get("/user/validateToken", (req, res) => {
	// Tokens are generally passed in header of request
	// Due to security reasons.

	try {
		const token = req.header(process.env.TOKEN_HEADER_KEY);

		const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

		if(verified){
			return res.send("Successfully Verified");
		}else{
			// Access Denied
			return res.status(401).send(error);
		}
	} catch (error) {
		// Access Denied
		return res.status(401).send(error);
	}
});

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});
