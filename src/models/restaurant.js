const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    userId: String,
    name: String,
    location: String,
    income: String,
    balance: String,
    sales: String,
    menu: {
        item1: String,
        item2: String,
        item3: String
    },
    upgrades: {
        upgrade1: String,
        upgrade2: String,
        upgrade3: String,
        upgrade4: String,
        upgrade5: String,
        upgrade6: String,
        upgrade7: String,
        upgrade8: String,
        upgrade9: String,
        upgrade10: String
    }
})

const placeModel = module.exports = mongoose.model("restaurants", placeSchema)