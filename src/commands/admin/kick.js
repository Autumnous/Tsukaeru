module.exports = {
    name: "kick",
    desc: "Kicks a member.",
    execute(client, message, args) {
      if (!message.member.permissions.has("KICK_MEMBERS"))
        return message.reply("You don't have the permission to kick people!");
      const targetUser = message.mentions.users.first().id;
      const target = message.guild.members.cache.get(targetUser);
      if (!target) return message.reply("You have to mention a user to kick!");
  
      try {
        target.kick();
        message.reply(
          `Kicked ${target.user.tag}!`
        );
      } catch (err) {
        console.log(err);
        message.reply("There was an error!");
      }
    },
  };
  