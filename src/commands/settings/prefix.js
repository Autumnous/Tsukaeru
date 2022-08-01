const { emojis } = require("../../json/config");
const prefixModel = require("../../models/prefix");

module.exports = {
  name: "prefix",
  desc: "Sets the perfix.",
  aliases: ["setprefix", "pref"],
  async execute(client, message, args) {
    const newPrefix = args[0];
    if (!message.member.permissions.has("MANAGE_SERVER"))
      return message.reply("You don't have permission to set the prefix!");
    if (!newPrefix)
      return message.reply(`You need to type a prefix to set, silly! ${emojis.error}`);
    if (newPrefix.length > 5)
      return message.reply(
        "My prefix can only be 5 characters long. Keep it short and simple!\nExamples: `t?` `t.` `ts.` `ts?` `tsu!`"
      );

    const data = await prefixModel.findOne({
      guildId: message.guild.id,
    });

    if (data) {
      await prefixModel.findOneAndRemove({
        guildId: message.guild.id,
      });

      message.reply(`Set the prefix to ***${newPrefix}***`);

      let newData = new prefixModel({
        prefix: newPrefix,
        guildId: message.guild.id,
      });
      newData.save();
    } else if (!data) {
      message.reply(`Set the prefix to ***${newPrefix}***`);

      let newData = new prefixModel({
        prefix: newPrefix,
        guildId: message.guild.id,
      });
      newData.save();
    }
  }
};
