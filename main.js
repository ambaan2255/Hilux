const { 
  makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  Browsers,
  getAggregateVotesInPollMessage,
  makeInMemoryStore,
  makeCacheableSignalKeyStore
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const path = require('path');
const fs = require('fs');
const web = require('./server.js');
const MsgHandler = require('./lib/handler.js')
const cron = require('node-cron');
const {
  Client
} = require('./lib/client.js');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const config = require("./config");
const Spinnies = require("spinnies")
const spinnies = new Spinnies({
  spinner: { interval: 200, frames: [" ", "_"], }
})
 




async function Bot() {

    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(
        "./session"
    );

    //////////////////////////////////////

    const connect = makeWASocket({
        auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, P({ level: "fatal" }).child({ level: "fatal" })),
      },
        browser: Browsers.macOS('Desktop'),
        downloadHistory: false,
        syncFullHistory: false,
        logger: P({
            level: "silent"
        }),
        printQRInTerminal: true,
        getMessage: async (key) =>

        (store.loadMessage(key.id) || {}).message || { conversation: null }
    })
	    
	const client = new Client(connect)
	
	const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) })

  store.bind(client.ev);

    setInterval(() => {

      store.writeToFile("./database/store.json");

    }, 30 * 1000);
    
    try { 
 const task = cron.schedule('59 15 * * *', () => {

fs.readdir("./session/", async function(err, files) {
                    if (err) {
                        console.log('Unable to scan directory: ' + err);
                        return console.log('Unable to scan directory: ' + err);
                    }
                    let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
                        item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
                    )
                    console.log(filteredArray.length);
                    let teks = `Detected ${filteredArray.length} junk files\n\n`
                    if (filteredArray.length == 0) return reply(teks)
                    filteredArray.map(function(e, i) {
                        teks += (i + 1) + `. ${e}\n`
                    })
                                            client.sendMessage('919656459062@s.whatsapp.net' , { text :"ᴀᴜᴛᴏ ᴅᴇʟᴇᴛɪɴɢ sᴇssɪᴏɴ..." })

                    await sleep(2000)
                    
                    await filteredArray.forEach(function(file) {
                        fs.unlinkSync(`./session/${file}`)
                    });
                    await sleep(2000)
    client.sendMessage('919656459062@s.whatsapp.net' , { text :"ᴅᴇʟᴇᴛᴇᴅ sᴇssɪᴏɴ ᴛʀᴀsʜ" })
    });
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata'
});       
  
  task.start()
        } catch (e) {
            console.log('Error clearing session')
            }
            
    //////////////////////////////////////


    //////////////////////////////////////

    client.ev.on('connection.update', (update) => {
        const {
            connection
        } = update;
        if (connection === "connecting") {
            console.log("ᴄᴏɴɴᴇᴄᴛɪɴɢ ...");
            console.log("sʏɴᴄɪɴɢ ᴅᴀᴛᴀʙᴀsᴇ...");

  config.DATABASE.sync();
        }
        if (connection === "open") {
            console.log("ᴄᴏɴɴᴇᴄᴛᴇᴅ");
             web("ᴄᴏɴɴᴇᴄᴛᴇᴅ ✅")

         cron.schedule('0 */2 * * *', Bot);
            fs.readdirSync("./plugins").forEach((plugin) => {
                if (path.extname(plugin).toLowerCase() == ".js") {
                    import("./plugins/" + plugin);
                }
            });
            console.log("ᴘʟᴜɢɪɴs ʟᴏᴀᴅᴇᴅ");
          console.log("\n======[  ☞︎︎︎  ʟᴏɢs  ☜︎︎︎   ]======\n")
        }
      
    })

    //////////////////////////////////////


  async function getMessage(key){
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: "wabot"
        }
    }
   /* client.ev.on('messages.update', async msg => {
        console.log(
					JSON.stringify(msg, undefined, 2)
				)
        
        for(const { key, update } of msg) {
			if(update.pollUpdates && key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
				    const pollUpdate = await getAggregateVotesInPollMessage({
							message: pollCreation,
							pollUpdates: update.pollUpdates,
						})
	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	                if (toCmd == undefined) return
                    var prefCmd = toCmd
	                client.appenTextMessage(prefCmd, chatUpdate)
				}
                console.log(update.pollUpdates)
			}
		}
    })*/

    //////////////////////////////////////

    client.ev.on("creds.update", saveCreds);

    //////////////////////////////////////


    //////////////////////////////////////

    client.ev.on('messages.upsert',
       async (message) => { //console.log(message.messages[0].message)
          await MsgHandler(client , message)
        })

    //////////////////////////////////////


} 

Bot()
//web("ᴄᴏɴɴᴇᴄᴛᴇᴅ ✅")
//spinnies.add("spinner-2", { text: " ", color: "cyan" })
process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("Socket connection timeout")) return
if (e.includes("item-not-found")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})

/*setTimeout(() => {
       Bot();
    }, 2000);*/
