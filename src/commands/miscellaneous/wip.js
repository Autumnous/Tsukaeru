const { nextUpdate } = require("../../json/config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "wip",
    aliases: ["nextupdate", "next-update"],
    desc: "Shows the next update's features!",
    async execute(client, message, args) {
        const { features, date, version } = nextUpdate;
        let featureList = Object.values(features).toString().split(",").join("\n");

        const embed = new MessageEmbed()
        .setColor("GOLD")
        .setTitle(`Features coming in v${version} include:`)
        .setDescription(featureList)
        .addField("__Release Date__", date)

        await message.channel.send({ embeds: [embed] })
    }
}