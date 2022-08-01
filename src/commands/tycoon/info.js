const placeModel = require("../../models/restaurant");
const prefixModel = require("../../models/prefix");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "info",
    aliases: ["stats", "place", "bal", "b"],
    desc: "See the information about your restaurant!",
    async execute(client, message, args) {
        let prefix;
        let data = await placeModel.findOne({
            userId: message.author.id
        });

        let data2 = await prefixModel.findOne({
            guildId: message.guild.id
        });

        if(data2) {
            prefix = data2.prefix
        } else {
            prefix = "t!"
        }

        if(data) {
            let income = data.income ? data.income.toLocaleString() : 0
            let sales = data.sales ? data.sales.toLocaleString() : 0
            let balance = data.balance ? data.balance.toLocaleString() : 0

            let infoEmbed = new MessageEmbed()
            .setColor("ff99ff")
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle("🍔 Restaurant Info!")
            .addFields(
                { name: "Name", value: `*${data.name}*` },
                { name: "Location", value: `📍 *${data.location}*` },
                { name: "Balance", value: `💷 *£${balance}*` },
                { name: "Income", value: `*💷 £${income}/hr*`},
                { name: "Total Sales", value: `📈 ${sales}`},
                { name: "Menu", value: Object.values(data.menu).toString().split(",").join("\n") }
            )

            message.channel.send({ embeds: [infoEmbed] })
        } else {
            message.channel.send(`You don't have a restaurant yet! Make one with the ${prefix}start command!`)
        }
    }
}