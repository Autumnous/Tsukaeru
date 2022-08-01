const placeModel = require("../../models/restaurant");
const prefixModel = require("../../models/prefix");
const {
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "start",
  aliases: ["found", "create"],
  desc: "Create your restaurant!",
  async execute(client, message, args) {
    let prefix;

    const data = await placeModel.findOne({
      userId: message.author.id
    });

    const data2 = await prefixModel.findOne({
      guildId: message.guild.id
    });

    if (data2) {
      prefix = data2.prefix
    } else {
      prefix = "t!"
    };

    if (data) {
      message.channel.send(`You already have a restaurant named *${data.name}*!`)
    } else {
      let placeInfo = new placeModel({
        userId: message.author.id,
        name: `${message.author.username}'s Restaurant`,
        location: "Neighbourhood",
        income: 50,
        balance: 10000,
        sales: 0,
        menu: {
          item1: "🍔 Hamburger",
          item2: "🌮 Beef Taco",
          item3: "☕ Coffee"
        }
      });
      placeInfo.save()

      const startEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle("🎉 New Restaurant")
        .setDescription(`Congratulations! You have now made a restaurant!\nTo start, you have £10,000, which will let you buy upgrades; hire employees; buy boosts and more! They all help in their separate ways!\n\n**__Upgrades ⬆__**\nUpgrades will give you more money when you work! Depending on which upgrade you get correlates to how much more you will earn.\n*Use ${prefix}upgrades to see available upgrades!*\n\n**__Employees 👩‍🍳__**\nEmployees increase your hourly income! Depending on which employee you hire correlates to how much more income you generate!\n*Use ${prefix}employees to view available employees!*\n\n**__Boosts 📈__**\nBoosts give you a temporary gain in tips, work or hourly income. Depending on which boost you buy correlates to what effect it is and how long it has! You can have up to 5 simultaneous boosts at any time!\n*Use ${prefix}boosts to see available boosts!*\n\n*__Now that you have a brief understanding on what you can spend your money on, let's move onto the menu!__*\nThe menu displays the things your restaurant sells! You start with 3 menu items but you gain more menu slots as you grow your restaurant! You can see the foods to sell, as well as editing the menu, with the .menu command!\n\nWhen you earn £10,000 hourly income, you can have a **🌟Limited Edition Item🌟**\nThis item will be on the menu for a week and will bring in more income (work, hourly and tips)! The income boost will decrease every day until the menu is removed. Make sure to keep this slot filled to gain income faster!\n\nYou have now finished the basics and are ready to become a great restaurant owner. Good luck! 🍔`)
        .setColor("ff99ff")
        .setImage("https://cdn.dribbble.com/users/23537/screenshots/1882213/media/620d684fb07a3b8db8360ce791914490.gif")

      message.channel.send({
        embeds: [startEmbed]
      })
    }
  }
}