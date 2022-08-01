const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
} = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["h", "commands", "cmds", "?"],
    desc: "Shows all available commands!",
    async execute(client, message, args) {
        let embed = new MessageEmbed()
        .setTitle("All commandds!")
        .setDescription("<required parameter> [optional parameter]\n*Do not include the brackets*")
        .setColor("ff99ff")
        .setTimestamp()

        let raw = new MessageActionRow()
    }
}