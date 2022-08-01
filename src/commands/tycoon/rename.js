const placeModel = require("../../models/restaurant");

module.exports = {
    name: "rename",
    aliases: ["name"],
    desc: "Renames the restaurant!",
    async execute(client, message, args) {
        const data = placeModel.findOne({
            userId: message.author.id
        });

        if (data) {
            const name = args.join(" ");

            if (name.length > 20) {
                return message.reply("Your restaurant name has to be 20 characters or less!")
            }

            if(!name) {
                return message.reply("You need to enter a name for your restaurant!")
            }

            message.reply("**Renaming restaurant...**")

            await placeModel.findOneAndRemove({
                userId: message.author.id
            });

            let newData = new placeModel({
                userId: message.author.id,
                name: name,
                location: data.location,
                income: data.income,
                balance: data.balance,
                sales: data.sales,
                menu: {
                    item1: data.menu.item1,
                    item2: data.menu.item2,
                    item3: data.menu.item3
                },
                upgrades: {
                    upgrade1: data.menu.upgrade1,
                    upgrade2: data.menu.upgrade2,
                    upgrade3: data.menu.upgrade3,
                    upgrade4: data.menu.upgrade4,
                    upgrade5: data.menu.upgrade5,
                    upgrade6: data.menu.upgrade6,
                    upgrade7: data.menu.upgrade7,
                    upgrade8: data.menu.upgrade8,
                    upgrade9: data.menu.upgrade9,
                    upgrade10: data.menu.upgrade10
                }
            })

            newData.save();
            console.log(newData)
        } else {
            
        }
    }
}