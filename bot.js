//Modulos NPM
const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone")
const speed = require('performance-now')
const request = require('request');
const { spawn, exec, execSync } = require("child_process")
const fs = require("fs")
const axios = require("axios")
const ffmpeg = require('fluent-ffmpeg')
const fetch = require('node-fetch');	
const yts = require( 'yt-search')
const ms = require('parse-ms')
const toMs = require('ms')
const { error } = require("qrcode-terminal")
const util = require('util')
const { getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { color, bgcolor } = require('./lib/color')
const { fetchJson, getBase64, kyun, createExif } = require('./lib/fetcher')
const { yta, ytv, igdl, upload } = require('./lib/ytdl')
const { webp2mp4File} = require('./lib/webp2mp4')
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")

//Archivos JSON
const _leveling = JSON.parse(fs.readFileSync('./database/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/level.json'))
const afk = JSON.parse(fs.readFileSync('./database/off.json'))
const ban = JSON.parse(fs.readFileSync('./database/banned.json'))
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/nsfw.json'))
const image = JSON.parse(fs.readFileSync('./database/img.json'))
const setting = JSON.parse(fs.readFileSync('./database/setting.json'))

//wa connet
const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		WA_DEFAULT_EPHEMERAL,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		ChatModification,
		waChatKey,
		mentionedJid,
		processTime,
	} = require("@adiwajshing/baileys")
//=================================================//
prefix = '.'
blocked = []
cmdnf = []
ind = []
banChats = false
promote = setting.promote
numbernye = '0'
demote = setting.demote
leave = setting.leave
//=================================================//
async function starts() {
	const senpai = new WAConnection()
	senpai.version = [2, 2119, 6]
	senpai.logger.level = 'warn'
	console.log(banner.string)
	console.log(color('[ BOT]','aqua'), color("hola xd", "yellow"))
	console.log('>', '[',color('INFO','blue'),']','me chupas un huevo.')
	senpai.on('qr', () => {
	console.log(color('[','white'), color('!','red'), color(']','white'), color(' Escanea El Código QR De Arriba'))
	})

	fs.existsSync('./session.json') && senpai.loadAuthInfo('./session.json')
	senpai.on('connecting', () => {
	console.log(color('> [ INFO ]', 'white'), color('Conectando...'))
	})
	senpai.on('open', () => {
	console.log(color('> [ INFO ]', 'white'), color('Conectado'))
	})
		await senpai.connect({timeoutMs: 30*1000})
  fs.writeFileSync('./session.json', JSON.stringify(senpai.base64EncodedAuthInfo(), null, '\t'))
//Banned Call
senpai.on('CB:action,,call', async json => {
    const callerId = json[2][0][1].from;
    console.log("call dari "+ callerId)
        senpai.sendMessage(callerId, "Sistema De Bloqueo Automático, NO LLAMES POR FAVOR", MessageType.text)
        await sleep(4000)
        await senpai.blockUser(callerId, "add")
})
//Welkom

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
senpai.sendMessage(from, imagen, MessageType.image, {quoted mek, sendEpemeral: true})
break 
case 'pussy':
const imagen = fs.readFileSync('./media/pussy.jpeg')
senpai.sendMessage(from, imagen, MessageType.image, {quoted mek, sendEpemeral: true})
break 
case 'hentai':
const video = fs.readFileSync('./media/hentai.mp4')
senpai.sendMessage(from, video, MessageType.video, {quoted mek, mimetype: 'video/mp4', caption: '*Disfruta 🔥*', duration: 66666666 ,sendEpemeral: true})
break 
case 'loli':
const audio = fs.readFileSync('./media/onichan.mp3')
senpai.sendMessage(from, audio, MessageType.audio, {quoted mek, mimetype: 'audio/mp3', duration: -6666666})
senpai.sendMessage(from, audio, MessageType.audio, {quoted mek, mimetype: 'audio/mp3', duration: -6666666, ptt: true sendEpemeral: true})
break 
case 'menu':
senpai.sendMessage(from, '*Hola, esto es solo una base de bot de auto respuestas después se le añadira el menu*', text, {quoted: mek, sendEphemeral: true})
break
case 'bot':
senpai.sendMessage(from, '*Hola,felicidades, has logrado enviar un mensaje mediante un servidor externo😚*', text, {quoted: mek, sendEphemeral: true})
break
case 'hola':
senpai.sendMessage(from, '*Hola, ¿como estás?', text, {quoted: mek, sendEphemeral: true})
break
case 'bien':
senpai.sendMessage(from, '*Oh, me alegro :D, yo súper!!*', text, {quoted: mek, sendEphemeral: true})
break
case 'gracias':
senpai.sendMessage(from, '*De nada para servirte 🙇*', text, {quoted: mek, sendEphemeral: true})
break
case 'onichan':
senpai.sendMessage(from, '*🔥 Senpai 🔥*', text, {quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"documentMessage": { "title": "🔥 Papi 🔥", 'jpegThumbnail': fs.readFileSync('./media/thumb.jpeg')}}
}})
break
case 'xd':
case 'xD':
case 'XD':
senpai.sendMessage(from, '*XD?, xd que es follame?*', text, {quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"documentMessage": { "title": "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥", 'jpegThumbnail': fs.readFileSync('./media/thumb.jpeg')}}
}})
break

}

} catch (e) {
        
console.log(e)}
        
})      
}
iniciar ()
.catch (err => console.log("unexpected error: " + err))