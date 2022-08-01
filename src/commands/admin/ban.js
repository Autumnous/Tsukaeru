module.exports = {
  name: "ban",
  desc: "Bans a member.",
  execute(client, message, args) {
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.reply("You don't have the permission to ban people!");
    const targetUser = message.mentions.users.first().id;
    const target = message.guild.members.cache.get(targetUser);
    if (!target) return message.reply("You have to mention a user to ban!");

    let banReason = args.slice(args[0].length).join(" ");

    try {
      target.ban();
      message.reply(
        `Banned ${target.user.tag} for ${
          banReason ? banReason.toLowerCase() : "unknown reasons"
        }!`
      );
    } catch (err) {
      console.log(err);
      message.reply("There was an error!");
    }
  },
};
