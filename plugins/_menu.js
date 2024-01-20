const {
    cmd,
    commands,
    isPublic
} = require("../lib/plugins.js");
const plugins = require("../lib/plugins.js");
const {
    OWNER_NAME,
    BOT_NAME,
    HANDLERS
} = require("../config.js");
const font = require("@viper-x/fancytext");
const fs = require("fs");
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

cmd(
    {
        name: "menu",
        category: "misc",
        fromMe: isPublic,
        desc: "Show All commands"
    },
    async ({
        client, m, args
    }) => {
      try {
      /*  if (HANDLERS === "^")
          var presix = ''
        else
          var presix = m.prefix*/
        if (args) {  
            for (let i of plugins.commands) {
                if (i.name.test(args)) { 
                  return m.reply(`*command : ${args.trim()}*\n*description : ${i.desc.toLowerCase()}*`);
                }
            }
        return m.reply(font.tiny("_oops command not found_"))
        } else {
            let [date,
                time] = new Date()
            .toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata"
            })
            .split(",");
            /* let menu = `╭──── ⋅⋅ ─── ✩ ─── ⋅⋅ ────╮
 | • Prefix : ${m.prefix}
 | •  Date : ${date}
 | •  Time : ${time}
 | •  Commands : ${commands.length}
╰──── ⋅⋅ ─── ✩ ─── ⋅⋅ ────╯${readMore}\n`;*/
          /*let menu = `╔═════════════════╗
                *𝛻𝛪𝛲𝛯𝑅-𝛸*\n╚═════════════════╝
╔═════════════════╗
╠» Prefix : ${m.prefix}
╠» Uptime : ${await m.uptime()}
╠» Date : ${date}
╠» Time : ${time}
╠» Commands : ${commands.length}
╚═════════════════╝ \n${readMore}\n`*/
        /*  let menu = `
   _Prefix : ${m.prefix}_
   _Uptime : ${await m.uptime()}_
   _Commands : ${commands.length}_\n${readMore}`*/
            let menu = `\n   WhatsApp Bot\n\n${readMore}`
            let cmnd = [];
            let cmd;
            let type = [];
            commands.map((command, num) => {
              
                if (command.name) {
                    cmd = command.name
                    .toString()
                    .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
                }

              if (command.dontAddCommandList || cmd === undefined) return;
                   
                if (!command.dontAddCommandList && cmd !== undefined) {
                    let category;
                    if (!command.category) {
                        category = "misc";
                    } else {
                        category = command.category.toLowerCase();
                    }
                    cmnd.push({
                        cmd, category: category
                    });
                    if (!type.includes(category)) type.push(category);
                }
            });
            cmnd.sort();
            type.sort().forEach((cmmd) => {
                // menu+= `╔═════════════════╗\n╠═ ⪼ [ ${cmmd} ]\n╠═════════════════╝\n╠═════════════════╗\n`
                menu+= `\n 🍁 *${cmmd}*\n\n`
                let comad = cmnd.filter(({
                    category
                }) => category == cmmd)
                comad.sort()
                comad.forEach(({
                    cmd
                }, num) => {
                   menu += `  ➪ ${cmd.trim()}\n`
                 //  menu += `_${cmd.trim()}_\n`
                });
             //  menu += `╚.✾.════════════.✾.╝\n`
            });
           // menu += ``

            // let text = align(txt, centerAlign);
        /*return await client.sendMessage(m.jid , { text : `${menu}` , contextInfo: { externalAdReply: { title: font.tiny(`Hey there  ${m.pushName}`), sourceUrl: "ʜᴇᴍ", mediaUrl: "https://instagram.com/_viper.x0_", mediaType: 1, showAdAttribution: false, renderLargerThumbnail: true, thumbnailUrl: "https://i.imgur.io/3T1zSxj_d.webp?maxwidth=640&shape=thumb&fidelity=medium" }} }, {quoted: m })*/
          m.send(m.jid , font.tiny(menu))
        }
      } catch (e) {
        m.error(`hey : ${e}`)
      }
    }
);
