const mongoose = require("mongoose");

const welcomeSchema = new mongoose.Schema({
    channelId: {
        type: String
    },
    guildId: String
});

const welcomeModel = module.exports = mongoose.model("welcomeChannels", welcomeSchema)