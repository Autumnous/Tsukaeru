const placeModel = require("../../models/restaurant");
const prefixModel = require("../../models/prefix");
const recently = new Set();
const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: "tips",
    aliases: ["t"],
    desc: "Collect tips!",
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
                return message.reply(":x: You have already collected tips in the past 5 minutes. Please wait!")
            };

            let tipAmount = Math.floor((parseInt(data.income)) * ((Math.random() * 10) + 5));

            let embed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Tips! 💰")
                .setDescription(`You collected £${tipAmount} in tips! 💰`)
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
                balance: parseInt(data.balance) + parseInt(tipAmount),
                sales: data.sales,
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
            }, 300000)
        } else {
            message.channel.send(`You don't have a restaurant yet! Make one with the ${prefix}start command!`)
        }
    }
}