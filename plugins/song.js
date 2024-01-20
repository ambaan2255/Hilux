const { 
  cmd, 
  commands, 
  isPublic 
} = require("../lib/plugins.js");
const { 
  existsSync, 
  mkdirSync, 
  writeFileSync,
  readFileSync,
  createWriteStream
} = require('fs');
const fetch = require('node-fetch')
const yts = require("yt-search")
const ytdl = require("youtubedl-core");
const NodeID3 = require('node-id3')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const axios = require("axios")
const {
  AddMp3Meta
} = require("../lib/functions.js");

/*cmd({
on: "text",
fromMe: isPublic,
},
async({m , client , args})=>{
	
    if (!m.quoted) return;
if(m.quoted.sender === '919207759062@s.whatsapp.net'){
for (let i = 1; i < 11; i++) {
      if (i == m.text) {  // Corrected the condition here
        const lines = m.quoted.text.split('\n');
        const selectedNumber = lines[i-1].split('.')[1].trim();  // Corrected index and split
        m.reply(selectedNumber);
      }
    
    }
 }
    })*/
    
cmd(
    {
        name: "yt",
        fromMe: isPublic,
        category: "downloader",
        desc: "To download yt vid/aud"
    },
async ({

        m, client, args

    }) => {

    if (!args) return m.reply("_Enter Query !_")
   let mes = await client.sendMessage(m.jid, { text : `_Searching..._`}, {quoted : m })
    let datai = `_Youtube Downloader_\n\n`
    let search = await yts(`${args}`)
    let hdata = search.all
 
    for (let i=1; i<11; i++){
        datai += `_${i} .${hdata[i].title}_\n`
    }
   return client.sendMessage(m.jid, { text : `${datai}` , edit : mes.key })
      }
    )

        
cmd(
    {
        name: "song",
        fromMe: isPublic,
        category: "downloader",
        desc: "To download song"
    },
    async ({
        m, client, args
    }) => {
      
        if (!args) return m.reply("_Enter Query !_")
      let mes = await client.sendMessage(m.jid, { text : `_Searching..._` } , { quoted : m })
   const res = await axios.get(`https://api-viper.onrender.com/api/song?name=${args}`)
    let response = await res.data
    let coverBuffer = await (await fetch(`${response.data.thumbnail}`)).buffer()
    /*m.reply(`{
    status: true,
    creator: "Viper-X",
    data: {
      title: ${response.data.title},
      videoId: ${response.data.videoId},
      url: ${response.data.url},
      downloadUrl: ${'https://api-viper-x.koyeb.app/api/song/download?id=' + response.data.videoId},
      thumbnail: ${response.data.thumbnail},
      channel: {
        name: ${response.data.channel.name},
        url: ${response.data.channel.url}
        }
        }
        }`)*/
     client.sendMessage(m.jid, { text : `_Downloading : ${response.data.title}_` , edit : mes.key })
   const songbuff = await (await fetch(`${response.data.downloadUrl}`)).buffer()
   const song = await AddMp3Meta(songbuff , coverBuffer , { title : response.data.title , artist : response.data.channel.name } )
     /* const tags = {
          title: "args",
          artist: "Vɪᴘᴇʀ-X0",
          APIC: coverBuffer,
          TRCK: "27"
      }
      const success = NodeID3.write(tags, Buffer.from(songBuffer))
      await sleep(2000)
       // const taggedSongBuffer = Buffer.from(writer.arrayBuffer)
  await writeFileSync('./song.mp3', success)
      await sleep(3000)
           let mediai = readFileSync('./song.mp3')   
      //let med = Buffer.from(success) */
    return await client.sendMessage(m.jid , {audio : song ,  mimetype : 'audio/mpeg'} , { quoted : m })
      
    })
