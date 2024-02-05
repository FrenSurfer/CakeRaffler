console.log("début du programme");

require('dotenv').config();
const token = process.env.TOKEN;
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences
  ]
});



client.on('ready', () => {
  console.log(`Le bot est prêt en tant que ${client.user.tag}`);
});

client.on('messageCreate', message => {
  console.log(`Nouveau message "${message.content}" reçu de ${message.author.username}`);

  if (message.content.startsWith('!raffle ')) {
    const winnersCount = parseInt(message.content.split(' ')[1]);
    if (!winnersCount || winnersCount < 1) {
      console.log("Nombre de gagnants invalide");
      message.reply('Nombre de gagnants invalide');
      return;
    }
    fs.readFile('holders.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      
      const beforesplit = data.split('\n');
      const participants = beforesplit.filter(item => item !== "GgPR2wwTFxguXyTeMmtrhipfv4A8Y3vdPX7RLQNa1zJ3" && item !== "2RVY82MAkkaE28JpA9eqYsX6dC6bLh5aVE8wKRWRyp4U" && item !=="3KhoVLJXbcvEdSMYu7XihT4rajuRVa8euKeCRLfmh9WS");
      const longPart = participants.slice()
      const uniquePart = [];
      for (const element of longPart) {
        let found = false;
        for (let j = 0; j < uniquePart.length; j++) {
          if (element === uniquePart[j]) {
            found = true;
            break;
          }
        }
        if (!found) {
          uniquePart.push(element);
        }
      }
      const winners = [];
      
      while (winners.length < winnersCount && participants.length > 0) {
        const randomIndex = Math.floor(Math.random() * participants.length);
        const winner = participants[randomIndex];
        participants.splice(randomIndex, 1);
        winners.push(winner);

       
      } 
      
      
      console.log("The winner is ", winners, " from " , longPart.length , " Holders");

      message.reply(` \n ${winners.join('\n')}` + "\n - From " + (longPart.length ) + " registered Cakes" + " and " + (uniquePart.length) + " unique Bakers");
      

    });
  }
  if (message.content.startsWith('!rebate ')) {
    const winnersCount = parseInt(message.content.split(' ')[1]);
    if (!winnersCount || winnersCount < 1) {
      console.log("Nombre de gagnants invalide");
      message.reply('Nombre de gagnants invalide');
      return;
    }
    fs.readFile('rebate.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Participants lus depuis le fichier", data);

      const participants = data.split('\n');
      const longPart = participants.slice()
      const winners = [];
      
      while (winners.length < winnersCount && participants.length > 0) {
        const randomIndex = Math.floor(Math.random() * participants.length);
        const winner = participants[randomIndex];
        participants.splice(randomIndex, 1);
        winners.push(winner);

       
      } 
      
      
      console.log("The winner is ", winners, " from " , longPart.length , " Holders");

      message.reply(` \n ${winners.join('\n')}` + " - From " + (longPart.length ) + " registered Cakes" );
      

    });
  }


});

client.login(token).then(() => {
  console.log('Le bot est connecté');
}).catch((error) => {
  console.error("Erreur lors de la connexion du bot", error);
});
