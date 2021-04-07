const express = require("express");
const BttToken = require("../models/Btt_token");
const Users = require("../models/User");
const userHandlers = require("../controllers/userController");
const bttHandlers = require("../controllers/bttController");
const User = require("../models/User");
const router = express.Router();

// Get all conversions per day
router.get('/btt-prices', async (req, res) => {
	const bttprices = await BttToken.find();
	res.send(bttprices)
})

// Get all users and their assets
router.get('/users', async (req, res) => {
	try {
		const users = await Users.find();
		res.send(users)
	} catch {
		res.status(404);
		res.send({ error: "User doesn't exist" });
	}
	
})

router.get('/user/:id', async (req, res) => { 
	try {
		const user = await User.findOne({_id: req.params.id});
		res.send(user);	
	} catch {
		res.status(404);
		res.send({ error: "User doesn't exist" });
	}	
});

router.route('/auth/sign_in')
    .post(userHandlers.sign_in);

router.route('/auth/login_required')
    .post(userHandlers.loginRequired);

router.route('/add_btt/:id')
    .post(bttHandlers.addBttToken);

module.exports = router;