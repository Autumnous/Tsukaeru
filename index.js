// Setup
const {
  Client,
  Collection
} = require("discord.js");
const client = new Client({
  intents: 131071
});
const fs = require("fs");
let prefixModel = require("./src/models/prefix");
let placeModel = require("./src/models/restaurant");

const asciiTable = require("ascii-table");
const table = new asciiTable();

require("dotenv").config();

// Database Connection
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database! 🍃");
  });

// Client Stuff
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./src/commands");

// Command Handler
const commandFolders = fs.readdirSync("./src/commands");

for (let folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./src/commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (let file of commandFiles) {
    const command = require(`./src/commands/${folder}/${file}`);
    let aliases;

    try {
      client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach((alias) => {
          client.aliases.set(alias, command);
        });
        aliases = command.aliases.toString().split(",").join(", ");
      }

      table
        .setHeading("Command Name", "Path", "Aliases", "Description")
        .addRow(
          command.name,
          `${folder}/${file}`,
          command.aliases ? aliases : "No aliases.",
          command.desc ? command.desc : "No description."
        );
    } catch (err) {
      console.log(err);
    }
  }
}

// Events
client.on("ready", () => {
  console.log(`${client.user.username} is now online! 🟢`);
  console.log(table.toString());
});

client.on("messageCreate", async (message) => {
  let prefix;

  const data = await prefixModel.findOne({
    GuildID: message.guild.id,
  });

  if (data) {
    prefix = data.prefix;
  } else if (!data) {
    prefix = "t!";
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  setInterval(async () => {
    let data2 = await placeModel.findOne({
      userId: message.author.id
    });

    await placeModel.findOneAndRemove({
      userId: message.author.id
    })

    let newData = new placeModel({
      userId: message.author.id,
      name: data2.name,
      location: data2.location,
      income: data2.income,
      balance: parseInt(data2.balance) + parseInt(data2.income),
      sales: data2.sales,
      menu: {
        item1: Object.values(data.menu)[0],
        item2: Object.values(data.menu)[1],
        item3: Object.values(data.menu)[2]
      }
    })

  }, 3600000)

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command) && !client.aliases.has(command)) return;

  if (client.commands.has(command)) {
    try {
      client.commands.get(command).execute(client, message, args);
    } catch (err) {
      console.log(err);
      message.reply(
        "Yikes, I seem to have encountered an error! Sorry about that. 😅"
      );
    }
  } else if (client.aliases.has(command)) {
    try {
      client.aliases.get(command).execute(client, message, args);
    } catch (err) {
      console.log(err);
      message.reply(
        "Yikes, I seem to have encountered an error! Sorry about that. 😅"
      );
    }
  }
});

// Login
client.login(process.env.TOKEN);