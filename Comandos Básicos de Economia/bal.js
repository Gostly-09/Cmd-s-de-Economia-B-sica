const db = require('megadb');
const dsc = require('discord.js');

module.exports = {
  name: 'bal',
  alias: ['balance', 'dinero'],
  async execute(Client, message, args) {
   // if([`519634005226815492`].some(a => a.includes(message.author.id)) == false) return message.reply('<:aviso:925769011822727209>| Esto no esta aun disponible!');
    let eco = new db.crearDB(`economia`);
    
    let asd = args[0] || '1111111111111111111111111111111111111111111111' 

    let usuario = message.mentions.users.first() || Client.users.cache.find(x => x.username.toLowerCase() === asd.toLowerCase() || x.tag.toLowerCase() === asd.toLowerCase() || x.id === asd) || message.author;

    let dinero = await eco.obtener(`${usuario.id}.dinero`) || 0;
    let banco = await eco.obtener(`${usuario.id}.banco`) || 0;
   // let total = await eco.obtener(`${usuario.id}.total`) || 0;

    const emb = new dsc.MessageEmbed()
     .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
     .addField('Dinero :', `**${dinero}**`)
     .addField(`Banco :`, `**${banco}**`)
     //.addField(`🍞|Total:`, `${total}`)
     .setColor("BLUE")
    message.reply({ embeds: [emb] })
  }
}