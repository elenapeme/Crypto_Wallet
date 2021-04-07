const mongoose = require('mongoose');
const User = mongoose.model('user');

// Updates array of objects in the assets of the specific user
exports.addBttToken = (req, res) => {
    const date = new Date();
    const crypto = Math.random();
    const data = {date, quantity_crypto: crypto * req.body.quantity_dollars, quantity_dollars: parseFloat(req.body.quantity_dollars)};
    User.updateOne({ _id: req.params.id }, {$push: {"assets": data}}, (err, doc) =>{ 
        if (err) return res.status(500).send({ error: err }); 

        return res.send("succesfully saved"); 
        
    });    
};