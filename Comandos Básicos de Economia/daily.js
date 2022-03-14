const Discord = require('discord.js');
const humanizeDuration = require('humanize-duration');
const db = require('megadb');
let eco = new db.crearDB(`economia`);

module.exports = {
	name: "daily",
	alias: ["diario"],

async execute (client, message, args){

    if (!eco.tiene(`${message.author.id}`)) {
        eco.establecer(`${message.author.id}`, { dinero: 0, banco: 0, work_cooldown: 0 });
    }

    let cld = await eco.obtener(`${message.author.id}.daily_cooldown`)

    if (cld > Date.now()) {
        const cd = humanizeDuration(cld - Date.now(), { language: 'es', conjunction: ' y ', serialComma: false, round: true})
        //${cd}
        const CE = new Discord.MessageEmbed()
         .setTitle(`Error! debes esperar ${cd} para volver a usar este comando!`)
        .setColor("RED")
          
        return message.reply({ embeds: [CE] });
      }
      
      function numeroRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
  
      let nuevodinero = '1000'
      let dinero = await eco.obtener(`${message.author.id}.dinero`);
      //${trabajo} ${nuevodinero}
      const embed = new Discord.MessageEmbed()
      .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
      .setDescription(`**Reclamaste tu recompesa diaria! Conseguiste ${nuevodinero} 🪙**`)
        .setColor("GREEN")
       
        //.setFooter('﹢ʚ↷Luiz bot')
  
      message.reply({ embeds: [embed] })
      eco.sumar(`${message.author.id}.dinero`, nuevodinero)
      eco.establecer(`${message.author.id}.daily_cooldown`, Date.now() + 8.64e+7)

  }
	
}