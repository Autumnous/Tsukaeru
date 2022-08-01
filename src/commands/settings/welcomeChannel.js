const { emojis } = require("../../json/config");
const welcomeModel = require("../../models/welcomeChannel");

module.exports = {
    name: "welcomechannel",
    aliases: ["welcome", "welcome-channel"],
    desc: "Set the welcome channel!",
    async execute(client, message, args) {
        const newChannel = message.mentions.channels.first();
        if (!message.member.permissions.has("MANAGE_SERVER"))
            return message.reply("You don't have permission to set the welcoming channell!");
        if (!newChannel)
            return message.reply(`You need to mention a channel to set, silly! ${emojis.error}`);

        const data = await welcomeModel.findOne({
            guildId: message.guild.id,
        });

        if (data) {
            await welcomeModel.findOneAndRemove({
                guildId: message.guild.id,
            });

            message.reply(`Set the welcome channel to ***${newChannel}***`);

            let newData = new welcomeModel({
                channelId: newChannel.id,
                guildId: message.guild.id,
            });
            newData.save();
        } else if (!data) {
            message.reply(`Set the welcome channel to ***${newChannel}***`);

            let newData = new welcomeModel({
                channelId: newChannel.id,
                guildId: message.guild.id,
            });
            newData.save();
        }
    }
}