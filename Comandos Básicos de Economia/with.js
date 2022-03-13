const dsc = require('discord.js');
const db = require('megadb');

module.exports = {
  name: 'with',
  alias: ['withdraw', 'retirar'],
  async execute(Client, message, args) {
    //  if([`519634005226815492`].some(a => a.includes(message.author.id)) == false) return message.reply('<:aviso:925769011822727209>| Esto no esta aun disponible!');
    const eco = new db.crearDB(`economia`);
    const opciones = ['max', 'all', 'todo']

    let dinero = await eco.obtener(`${message.author.id}.banco`);
    let l = args[0] || 'estetextoesusadocomometododefiltracion,sileesestoesuneasteregg';
    
    let dep = l.toLowerCase().replace('-', '').replace('+', '');

    if (dep === 'estetextoesusadocomometododefiltracion,sileesestoesuneasteregg') {

      // Embed rapido
      const emb1 = new dsc.MessageEmbed()
       .setTitle("Pon una cantidad para retirar!")
      .setColor("RED")
        
      return message.reply({ embeds: [emb1] });
    } 
    
    if (dinero < 1) {
      const emb2 = new dsc.MessageEmbed()
      .setTitle("Error al retirar!")
      .addField(`Error :`, `**No cuentas con ese dinero**`)
      .setColor("RED")
      return message.reply({ embeds: [emb2] });
    }
    
    if (opciones.includes(dep)) {
      const emb3 = new dsc.MessageEmbed()
   .setTitle("Dinero retirado!")
        .addField(`Cantidad retirada:`, `**${dep}**`)
      .setColor("GREEN")
        
      message.reply({ embeds: [emb3] })
      eco.sumar(`${message.author.id}.dinero`, dinero)
      eco.establecer(`${message.author.id}.banco`, 0)
    } else if (!isNaN(dep)) {
      if (dep > dinero) {
        const nomoney = new dsc.MessageEmbed()
        .setTitle("Error al retirar!")
        .addField(`Error :`, `**No cuentas con ese dinero**`)
        .setColor("RED")
        return message.reply({ embeds: [nomoney] })
      } else {//<a:reload:926208453016440882> <a:atention:926210382878609478>
        const emb4 = new dsc.MessageEmbed()
        .setTitle("Dinero retirado!")
        .addField(`Cantidad retirada:`, `**${dep}**`)
                 .setColor("GREEN")
        message.reply({ embeds: [emb4] })
        eco.sumar(`${message.author.id}.dinero`, dep)
        eco.establecer(`${message.author.id}.banco`, dinero - dep)
      }
    } else {
      message.reply('**Opciones para depositar : `all`, `cantidad` **')
    }
  }
};