const 
    { 
        WAConnection,
        Mimetype,
        MessageType,
         } = require('@adiwajshing/baileys');
//==================================\\
const fs = require('fs');
const prefix = '.'

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
senpai.on('chat-update', async (mek) => {
try {	  
if (!mek.hasNewMessage) return
if (!mek.messages) return
if (mek.key && mek.key.remoteJid == 'status@broadcast') return

mek = mek.messages.all()[0]
if (!mek.message) return
global.blocked
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
const from = mek.key.remoteJid
const type = Object.keys(mek.message)[0]        
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const typeQuoted = Object.keys(quoted)[0]
const content = JSON.stringify(mek.message)
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const body = mek.message.conversation || mek.message[type].caption || mek.message[type].text || ""
chats = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
budy = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''

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
const sender = mek.key.fromMe ? senpai.user.jid : isGroup ? mek.participant : mek.key.remoteJid
const senderNumber = sender.split("@")[0]
const isMe = senderNumber == botNumber
const conts = mek.key.fromMe ? senpai.user.jid : senpai.contacts[sender] || { notify: jid.replace(/@.+/, '') }
const pushname = mek.key.fromMe ? senpai.user.name : conts.notify || conts.vname || conts.name || '-'

switch (command) {

case 'pack':
const imagen = fs.readFileSync('./media/pack.jpeg')
senpai.sendMessage(from, imagen, MessageType.image)
break 
case 'pussy':
const imagen = fs.readFileSync('./media/pussy.jpeg')
senpai.sendMessage(from, imagen, MessageType.image)
break 
case 'hentai':
const video = fs.readFileSync('./media/hentai.mp4')
senpai.sendMessage(from, video, MessageType.video, {quoted mek, mimetype: 'video/mp4', caption: '*Disfruta 😈🔥*', duration: 66666666, sendEpemeral: true})
break 
case 'loli':
const audio = fs.readFileSync('./media/onichan.mp3')
senpai.sendMessage(from, audio, MessageType.audio, {quoted mek, mimetype: 'audio/mp3', duration: -6666666})
senpai.sendMessage(from, audio, MessageType.audio, {quoted mek, mimetype: 'audio/mp3', duration: -6666666, ptt: true sendEpemeral: true})
break 
case 'bot':
senpai.sendMessage(from, '*Hola,felicidades, has logrado enviar un mensaje mediante un servidor externo?*', text, {quoted: mek, sendEphemeral: true})
break
case 'hola':
senpai.sendMessage(from, '*Hola, ¿Como estás?*', text, {quoted: mek, sendEphemeral: true})
break
case 'bien':
senpai.sendMessage(from, '*oh me alegro, yo súper*', text, {quoted: mek, sendEphemeral: true})
break
case 'gracias':
senpai.sendMessage(from, '*de nada, para servirte 🙇*', text, {quoted: mek, sendEphemeral: true})
break
case ':b':
senpai.sendMessage(from, '*:D*', text, {quoted: mek, sendEphemeral: true})
break
case 'menu':
senpai.sendMessage(from, '*Hola, esto es solo una base de bot, pronto estara completo :D*', text, {quoted: mek, sendEphemeral: true})
break
}

} catch (e) {
        
console.log(e)}
        
})      
}
iniciar ()
.catch (err => console.log("unexpected error: " + err))