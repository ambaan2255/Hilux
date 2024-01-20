const {
    cmd,
    isPublic
} = require("../lib/plugins.js");

cmd(
    {
        name: "vo",
        fromMe: true,
        category: "tools",
        desc: "Resends the view Once message",
        category: "misc",
    },
    async ({
        m, client 
    }) => {
try {
        if (!m.quoted) {
            return m.reply("_Reply to ViewOnce Message !_");
        }
     if (m.quoted.message.viewOnceMessageV2) {
            let vv = m.quoted.message.viewOnceMessageV2

            if (vv.message.imageMessage) {
                let img = await m.downloadAndSaveMedia(vv.message.imageMessage, "vo", true)

                await client.sendMessage(m.jid, {
                    image: {
                        url: img
                    }, caption: vv.message.imageMessage.caption
                }, {
                    quoted: m
                })
            } else if (vv.message.videoMessage) {

                let video = await m.downloadAndSaveMedia(vv.message.videoMessage, "vo", true)

                await client.sendMessage(m.jid, {
                    video: {
                        url: video
                    }, caption: vv.message.videoMessage.caption
                }, {
                    quoted: m
                })

            }
        } else if (m.quoted.message.viewOnceMessageV2Extension.message.audioMessage) {
              let audio = await m.downloadAndSaveMedia(m.quoted.message.viewOnceMessageV2Extension.message.audioMessage, "vo", true)

                await client.sendMessage(m.jid, {
                    audio: {
                        url: audio
                    }
                }, {
                    quoted: m
                })
     } else {
            m.reply('_Not a ViewOnce Message !_')
        }
} catch {
  m.reply("_Error !_")
}
    })
