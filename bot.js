const { 
    WAConnection,
    MessageType,
    Presence, 
    MessageOptions,
    Mimetype,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    GroupSettingChange,
    ChatModification,
    waChatKey,
    WA_DEFAULT_EPHEMERAL,
    mentionedJid,
    prepareMessageFromContent, 
    Browsers,
    processTime
    } = require("@adiwajshing/baileys")
//
const fs = require('fs');
const prefix = '.'
const { color } = require("./lib/color");
const {  getBuffer, h2k,  generateMessageID, getGroupAdmins,getRandom, banner,  start,  info, success, close,} = require("./lib/functions");
//
async function iniciar () { 
	const senpai = new WAConnection()
        senpai.logger.level = 'warn'
        senpai.version = [2, 2143, 3]
	console.log('>', color('INFO','blue'),'Escanea el código ( qr ) a continuación...')
	senpai.on('qr', () => {
	console.log(color('[','white'), color('!','red'), color(']','white'), color(' Escanea el código qr'))
	})

	fs.existsSync('./session.json') && senpai.loadAuthInfo('./session.json')
	senpai.on('connecting', () => {
	console.log(color('> INFO ', 'white'), color('Conectando...'))
	})
	senpai.on('open', () => {
	console.log(color('> INFO ', 'white'), color('Conectado'))
	})
		await senpai.connect({timeoutMs: 30*1000})
  fs.writeFileSync('./session.json', JSON.stringify(senpai.base64EncodedAuthInfo(), null, '\t'))
  
senpai.on('chat-update', async (onichan) => {
try {	  
if (!onichan.hasNewMessage) return
if (!onichan.messages) return
if (onichan.key && onichan.key.remoteJid == 'status@broadcast') return

onichan = onichan.messages.all()[0]
if (!onichan.message) return
global.blocked
onichan.message = (Object.keys(onichan.message)[0] === 'ephemeralMessage') ? onichan.message.ephemeralMessage.message : onichan.message
const from = onichan.key.remoteJid
const type = Object.keys(onichan.message)[0]        
const quoted = type == 'extendedTextMessage' && onichan.message.extendedTextMessage.contextInfo != null ? onichan.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const typeQuoted = Object.keys(quoted)[0]
const content = JSON.stringify(onichan.message)
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const body = onichan.message.conversation || onichan.message[type].caption || onichan.message[type].text || ""
chats = (type === 'conversation') ? onichan.message.conversation : (type === 'extendedTextMessage') ? onichan.message.extendedTextMessage.text : ''
budy = (type === 'conversation' && onichan.message.conversation.startsWith(prefix)) ? onichan.message.conversation : (type == 'imageMessage') && onichan.message.imageMessage.caption.startsWith(prefix) ? onichan.message.imageMessage.caption : (type == 'videoMessage') && onichan.message.videoMessage.caption.startsWith(prefix) ? onichan.message.videoMessage.caption : (type == 'extendedTextMessage') && onichan.message.extendedTextMessage.text.startsWith(prefix) ? onichan.message.extendedTextMessage.text : ''

const reply = (teks) => {	
          senpai.sendMessage(from, teks, text, {sendEphemeral: true, quoted: onichan})
          }
        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
                    }

if (prefix != "") {
if (!body.startsWith(prefix)) {
cmd = false
comm = ""
} else {
cmd = true
comm = body.slice(1).trim().split(" ").shift().toLowerCase()
}
} else {
cmd = false
comm = body.trim().split(" ").shift().toLowerCase()
}
        
const command = comm

const arg = chats.slice(command.length + 2, chats.length)
const args = budy.trim().split(/ +/).slice(1)
const isCmd = budy.startsWith(prefix)
const q = args.join(' ')
const soyYo = senpai.user.jid
const botNumber = senpai.user.jid.split("@")[0]
const ownerNumber = ['522213261679@s.whatsapp.net']
const isGroup = from.endsWith('@g.us')
const sender = onichan.key.fromMe ? senpai.user.jid : isGroup ? onichan.participant : onichan.key.remoteJid
const senderNumber = sender.split("@")[0]
const isMe = senderNumber == botNumber
const conts = onichan.key.fromMe ? senpai.user.jid : senpai.contacts[sender] || { notify: jid.replace(/@.+/, '') }
const pushname = onichan.key.fromMe ? senpai.user.name : conts.notify || conts.vname || conts.name || '-'

switch (command) {

case 'bot':
senpai.sendMessage(from, '*Hola,felicidades, has logrado enviar un mensaje mediante un servidor externo?*', text, {quoted: onichan, sendEphemeral: true})
break
case 'hola':
senpai.sendMessage(from, '*Hola, ¿Como estás?*', text, {quoted: onichan, sendEphemeral: true})
break
case 'bien':
senpai.sendMessage(from, '*oh me alegro, yo súper*', text, {quoted: onichan, sendEphemeral: true})
break
case 'gracias':
senpai.sendMessage(from, '*de nada, para servirte 🙇*', text, {quoted: onichan, sendEphemeral: true})
break
case ':b':
senpai.sendMessage(from, '*:D*', text, {quoted: onichan, sendEphemeral: true})
break
case 'menu':
senpai.sendMessage(from, '*Hola, esto es solo una base de bot, pronto estara completo :D*', text, {quoted: onichan, sendEphemeral: true})
break
}

} catch (e) {
        
console.log(e)}
        
})      
}
iniciar ()
.catch (err => console.log("unexpected error: " + err))