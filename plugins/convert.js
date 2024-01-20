const {
    cmd,
    commands,
    isPublic
} = require("../lib/plugins.js");
const googleTTS = require('google-tts-api');
const FakeYou = require('fakeyou.js');
const fetch = require('node-fetch')
const fy = new FakeYou.Client({
    token: 'TR:p1921zb51ha60mbp4zbqtgyftcnn6',
    usernameOrEmail: 'vbcoc18@gmail.com',
    password: 'barishvb-8'
});
const { toAudio } = require("../lib/functions.js");

cmd(
    {
        name: "sticker",
        fromMe: isPublic,
        desc: "Converts an image to sticker",
        category: "convert",
    },
    async ({
        m, client, args
    }) => {
        if (!m.quoted || !(m.quoted.message.imageMessage || m.quoted.message.videoMessage || m.quoted.message.stickerMessage ))
            return await m.reply("_Reply to photo or video_");
        if (args) {
            let [packname, author] = args.split(",");
        let buff = await m.quoted.download();
        m.sendMsg(m.jid, buff, {
    packname: packname || '', author: author || '' , quoted : m 
}, "sticker")
        } else {
            let buff = await m.quoted.download();
        m.sendMsg(m.jid, buff, {
    packname: '', author: ' ' , quoted : m 
}, "sticker")
        }
    }
    );

cmd(
    {
        name: "mp3",
        fromMe: isPublic,
        desc: "Converts an Video/Voice to Mp3",
        category: "convert",
    },
    async ({
        m, client, args
    }) => {
        if (!m.quoted || !(m.quoted.message.audioMessage || m.quoted.message.videoMessage ))
            return await m.reply("_Reply to voice or video_");
        let buff = await m.quoted.download();
     return m.sendMsg(m.jid , buff , { mimetype: "audio/mpeg" } , "audio")
    }
);

cmd(
    {
        name: "tts",
        fromMe: isPublic,
        category: "converter",
        desc: "text to speech"
    },
    async ({
        m, client, args
    }) => {
        if (!args) {
            m.reply('_Enter Query!_')
        } else {
            let [txt,
                lang] = args.split`:`
            const audio = googleTTS.getAudioUrl(`${txt}`, {
                lang: lang || "en-US",
                slow: false,
                host: "https://translate.google.com",
            })
            client.sendMessage(m.jid, {
                audio: {
                    url: audio,
                },
                mimetype: 'audio/mpeg',
                ptt: true,
                fileName: `${'tts'}.mp3`,
            }, {
                quoted: m,
            })

        }
    });

cmd(
    {
        name: "ftts",
        fromMe: isPublic,
        category: "converter",
        desc: "text to speech"
    },
    async ({
        m, client, args
    }) => {
        await fy.start(); //required
        if (!args) return m.reply('_Enter words!_')
        let [txt,
            lang] = args.split`:`
        m.reply('_Generating audio..._')
        let models = fy.searchModel(lang || "ronaldo");
        if (models.size >= 1) {
            let result = await fy.makeTTS(models.first(), txt);
            console.log(result.audioURL());
            let buff = await (await fetch(result.audioURL())).buffer()
            return await client.sendMessage(m.jid, {
                audio: buff, mimetype: 'audio/mpeg', ptt: true,
            }, {
                quoted: m
            })
        }
    }
)
