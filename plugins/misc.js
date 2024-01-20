const {
    cmd,
    commands,
    isPublic
} = require("../lib/plugins.js");
const { performance } = require('perf_hooks')
const font = require("@viper-x/fancytext");

cmd(
    {
        name: "jid",
        fromMe: isPublic,
    },
    async ({
        m, client, args
    }) => {
m.reply(`_${m.jid}_`)
    })

cmd(
    {
        name: "runtime",
        fromMe: isPublic,
        category: "misc",
        desc: "To check bot runtime"
    },
    async ({
        m, client 
    }) => {
        return m.reply(`_Runtime : ${await m.runtime()}_`)
    });


cmd(
    {
        name: "ping",
        fromMe: isPublic,
        category: "misc",
        desc: "To check ping"
    },
    async ({
        m, client 
    }) => {
        
        const start = new Date().getTime();
    
  let pong = await client.sendMessage(m.jid , { text : "_Checking Ping..._" } , { quoted : m })
  const end = new Date().getTime();

  await client.sendMessage(m.jid, { text : `_Latency : ${end - start} ms_` , edit : pong.key })
    /*
      const start = new Date().getTime();
    
  let pong = await client.sendMessage(m.jid , { text : "_Checking Ping..._" } , { quoted : m })
  const end = new Date().getTime();
        const start1 = new Date().getTime();
  await client.sendMessage(m.jid, { text : `_Latency : ${end - start} ms_` , edit : pong.key })
    
        const end1 = new Date().getTime();
       const start2 = new Date().getTime();
  await client.sendMessage(m.jid, { text : `_Latency : ${end1 - start1} ms_` , edit : pong.key })
        const end2 = new Date().getTime();
        const start3 = new Date().getTime();
 
  await client.sendMessage(m.jid, { text : `_Latency : ${end2 - start2} ms_` , edit : pong.key })
        const end3 = new Date().getTime();
        const start4 = new Date().getTime();
  await client.sendMessage(m.jid, { text : `_Latency : ${end3 - start3} ms_` , edit : pong.key })
        const end4 = new Date().getTime();
        const start5 = new Date().getTime();
  await client.sendMessage(m.jid, { text : `_Latency : ${end4 - start4} ms_` , edit : pong.key })
        const end5 = new Date().getTime();
  await client.sendMessage(m.jid, { text : `_Latency : ${end5 - start5} ms_` , edit : pong.key })
     */ 
    });
