const mongoose = require("mongoose");

const prefixSchema = new mongoose.Schema({
    prefix: {
        type: String
    },
    guildId: String
});

const prefixModel = module.exports = mongoose.model("prefixes", prefixSchema)