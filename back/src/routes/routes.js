const express = require("express");
const BttToken = require("../models/Btt_token");
const Users = require("../models/User");
const userHandlers = require("../controllers/userController");
const router = express.Router();

// Get all conversions per day
router.get("/btt-prices", async (req, res) => {
	const bttprices = await BttToken.find()
	res.send(bttprices)
})

// Get all users and their assets
router.get("/users", async (req, res) => {
	const users = await Users.find()
	res.send(users)
})

router.route('/auth/register')
    .post(userHandlers.register);

router.route('/auth/sign_in')
    .post(userHandlers.sign_in);

module.exports = router;