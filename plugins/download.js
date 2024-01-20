const {
    cmd,
    commands,
    isPublic
} = require("../lib/plugins.js");
let gis = require("g-i-s");
const axios = require('axios');

cmd(
    {
        name: "insta",
        fromMe: isPublic,
        desc: "Instagram downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {

        if (!args) return await m.reply("_Enter Link_");
        let dl = await client.sendMessage(m.jid, {
            text: "_Downloading..._"
        }, {
            quoted: m
        })
        try {
            const res = await axios.get(`https://api-viper.onrender.com/api/insta?url=${args}`)
            let response = await res.data
            for (let i of response.data) {
                await m.sendMsg(m.jid, i.url, { quoted : m }, i.type)
            }
        } catch (e) {
            client.sendMessage(m.jid, {
                text: `_Error_`, edit: dl.key
            })
        }
    }
);

cmd(
    {
        name: "img",
        fromMe: isPublic,
        desc: "Google Image search",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        try {
            async function gimage(query, amount = 5) {
                let list = [];
                return new Promise((resolve, reject) => {
                    gis(query, async (error, result) => {
                        for (
                            var i = 0;
                            i < (result.length < amount ? result.length: amount);
                            i++
                        ) {
                            list.push(result[i].url);
                            resolve(list);
                        }
                    });
                });
            }
            if (!args) return await m.reply("_Enter Query,Number_");
            let [query,
                amount] = args.split(",");
            let result = await gimage(query, amount);
            await m.reply(
                `_Downloading ${amount || 5} images for ${query}_`
            );
            for (let i of result) {
                await m.sendMsg(m.jid , i, {}, "image")
            }

        } catch (e) {
            console.log(e)
        }
    }
);
