const placeModel = require("../../models/restaurant");
const prefixModel = require("../../models/prefix");
const recently = new Set();
const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: "work",
    aliases: ["w"],
    desc: "Work for some money!",
    async execute(client, message, args) {
        const data = await placeModel.findOne({
            userId: message.author.id
        })

        let prefix;

        const data2 = await prefixModel.findOne({
            guildId: message.guild.id
        });

        if (data2) {
            prefix = data2.prefix
        } else {
            prefix = "t!"
        }

        if (data) {
            if (recently.has(message.author.id)) {
                return message.reply(":x: You have already worked in the past 10 minutes. Please wait!")
            };

            let item1 = Object.values(data.menu)[0]
            let item2 = Object.values(data.menu)[1]
            let item3 = Object.values(data.menu)[2]

            let sales = data.sales != 0 ? data.sales : 1

            let sold = Math.round(Math.floor(Math.random() * 2)) + Math.round(Math.random() * sales)
            let sold2 = Math.round(Math.floor(Math.random() * 2)) + Math.round(Math.random() * sales)
            let sold3 = Math.round(Math.floor(Math.random() * 2)) + Math.round(Math.random() * sales)
            let totalSales = sold + sold2 + sold3

            let profit1 = sold
            let profit2 = Math.round(sold2 * 1.5)
            let profit3 = Math.round(sold3 * 1.75)
            let totalProfit = profit1 + profit2 + profit3

            let embed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Sales! 📈")
                .setDescription(`${data.name} has sold:\n\n${item1} x${sold}\n${item2} x${sold2}\n${item3} x${sold3}\n\nEarning £${profit1 + profit2 + profit3}`)
                .setTimestamp()

            message.channel.send({
                embeds: [embed]
            })

            await placeModel.findOneAndRemove({
                userId: message.author.id
            })

            const newData = new placeModel({
                userId: message.author.id,
                name: data.name,
                location: data.location,
                income: data.income,
                balance: parseInt(data.balance) + parseInt(totalProfit),
                sales: parseInt(data.sales) + parseInt(totalSales),
                menu: {
                    item1: Object.values(data.menu)[0],
                    item2: Object.values(data.menu)[1],
                    item3: Object.values(data.menu)[2]
                }
            })

            newData.save();

            recently.add(message.author.id)
            setTimeout(() => {
                recently.delete(message.author.id)
            }, 600000)
        } else {
            message.channel.send(`You don't have a restaurant yet! Make one with the ${prefix}start command!`)
        }
    }
}