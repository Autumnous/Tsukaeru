module.exports = {
  name: "ping",
  desc: "Find out your latency.",
  async execute(client, message, args) {
    message.channel.send(`Pong! Your latency is ${Date.now() - message.createdTimestamp} ms! 🏓`)
  },
};
