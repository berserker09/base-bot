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
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:Berserker09\n' 
            + 'ORG:Creador De Bots\n' 
            + 'TEL;type=CELL;type=VOICE;waid=522213261679:+52 221 326 1679\n' 
            + 'END:VCARD'
//WhatsApp Conexi¨®n
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
	console.log(color('[','white'), color('!','red'), color(']','white'), color(' Escanea El Codigo QR De Arriba'))
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
        senpai.sendMessage(callerId, "Sistema De Bloqueo Automatico, NO LLAMES POR FAVOR", MessageType.text)
        await sleep(4000)
        await senpai.blockUser(callerId, "add")
})
//Welkom
        senpai.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await senpai.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await senpai.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks  = `Hola @${num.split('@')[0]}👋 Bienvenido\a a ${mdata.subject}\n\nfavor de leer las reglas\ndescripcion\n${mdata.desc}`
				let buff = await getBuffer(ppimg)
				senpai.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await senpai.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `*@${num.split('@')[0]}* ${leave}`
				let buff = await getBuffer(ppimg)
				senpai.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'promote') {
			const mdata = await senpai.groupMetadata(anu.jid)
			num = anu.participants[0]
			try {
					ppimg = await senpai.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
			let buff = await getBuffer(ppimg)
			
			teks = `ð™‰ð™ð™€ð™‘ð™Š ð˜¼ð™†ð™ˆð™„ð™‰
			
\`\`\`Nombre :\`\`\` ${num.replace('@s.whatsapp.net', '')}

\`\`\`Usuario :\`\`\` @${num.split('@')[0]}

\`\`\`Date : NOW\`\`\` 

\`\`\`Grupo :\`\`\` ${mdata.subject}

${promote}`
			senpai.sendMessage(mdata.id, buff, MessageType.image, {caption : teks, contextInfo: {mentionedJid: [num]}, quoted: { "key": { "participant": `${numbernye}`, "remoteJid": `Kntl`, "fromMe": false, "id": "B391837A58338BA8186C47E51FFDFD4A" }, "message": { "documentMessage": { "jpegThumbnail": buff, "mimetype": "application/octet-stream", "title": `PROMOTE`, "fileLength": "36", "pageCount": 0, "fileName": `_Welcome_` }}, "messageTimestamp": "1614069378", "status": "PENDING"}})
		} else if (anu.action == 'demote') {
			num = anu.participants[0]
			const mdata = await senpai.groupMetadata(anu.jid)
			num = anu.participants[0]
			try {
					ppimg = await senpai.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
			let buff = await getBuffer(ppimg)
			teks = `ð™Žð™€ ð™ˆð˜¼ð™ð™Š ð˜¼ ð™ð™‰ ð˜¼ð™†ð™ˆð™„ð™‰
			
\`\`\`Nombre :\`\`\` ${num.replace('@s.whatsapp.net', '')}

\`\`\`Usuario :\`\`\` @${num.split('@')[0]}

\`\`\`Dato : Reciente\`\`\`

\`\`\`Grupo :\`\`\` ${mdata.subject}

${demote}`
			senpai.sendMessage(mdata.id, teks, MessageType.text, {contextInfo: {mentionedJid: [num]}, quoted: { "key": { "participant": `${numbernye}`, "remoteJid": `Ktl`, "fromMe": false, "id": "B391837A58338BA8186C47E51FFDFD4A" }, "message": { "documentMessage": { "jpegThumbnail": buff, "mimetype": "application/octet-stream", "title": `DEMOTE`, "fileLength": "36", "pageCount": 0, "fileName": `_Welcome_` }}, "messageTimestamp": "1614069378", "status": "PENDING"}})
		}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
})
	//Actualizacion De Chat.
senpai.on('chat-update', async (mek) => {
	try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		global.blocked
		mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
        const type = Object.keys(mek.message)[0]
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
        var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.slice(0).trim().split(/ +/).shift().toLowerCase()
        const arg = budy.slice(command.length + 1, budy.length)
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)
		const q = args.join(' ')
		const meNumber = senpai.user.jid.split("@")[0]
		const botNumber = senpai.user.jid
//SETTING
		const isGroup = from.endsWith('@g.us')
		const sender = isGroup ? mek.participant : mek.key.remoteJid
		const senderme = mek.participant
		const isMe = botNumber.includes(senderme)
		const isBanned = ban.includes(sender)
        const isNsfw = isGroup ? nsfw.includes(from) : false
        const isImage = isGroup ? nsfw.includes(from) : false
		const totalchat = await senpai.chats.all()
		const groupMetadata = isGroup ? await senpai.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
        const isWelkom = isGroup ? welkom.includes(from) : false		
        const isAntiLink = isGroup ? antilink.includes(from) : false
        const conts = mek.key.fromMe ? senpai.user.jid : senpai.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? senpai.user.name : conts.notify || conts.vname || conts.name || '-'
       //SETTINGS FUNCIONES

switch (command) {

case prefix+ 'pack':
const imagen = fs.readFileSync('./media/pack.jpeg')
senpai.sendMessage(from, imagen, MessageType.image, {quoted mek, sendEpemeral: true})
break 
case prefix+ 'pussy':
const imagen = fs.readFileSync('./media/pussy.jpeg')
senpai.sendMessage(from, imagen, MessageType.image, {quoted mek, sendEpemeral: true})
break 
case prefix+ 'hentai':
const video = fs.readFileSync('./media/hentai.mp4')
senpai.sendMessage(from, video, MessageType.video, {quoted mek, mimetype: 'video/mp4', caption: '*Disfruta ðŸ”¥*', duration: 66666666 ,sendEpemeral: true})
break 
case prefix+ 'loli':
const audio = fs.readFileSync('./media/onichan.mp3')
senpai.sendMessage(from, audio, MessageType.audio, {quoted mek, mimetype: 'audio/mp3', duration: -6666666})
senpai.sendMessage(from, audio, MessageType.audio, {quoted mek, mimetype: 'audio/mp3', duration: -6666666, ptt: true sendEpemeral: true})
break 
case prefix+ 'menu':
senpai.sendMessage(from, '*Hola, esto es solo una base de bot de auto respuestas despuÃ©s se le aÃ±adira el menu*', text, {quoted: mek, sendEphemeral: true})
break
case prefix+ 'bot':
senpai.sendMessage(from, '*Hola,felicidades, has logrado enviar un mensaje mediante un servidor externoðŸ˜š*', text, {quoted: mek, sendEphemeral: true})
break
case prefix+ 'hola':
senpai.sendMessage(from, '*Hola, Â¿como estÃ¡s?', text, {quoted: mek, sendEphemeral: true})
break
case prefix+ 'bien':
senpai.sendMessage(from, '*Oh, me alegro :D, yo sÃºper!!*', text, {quoted: mek, sendEphemeral: true})
break
case prefix+ 'gracias':
senpai.sendMessage(from, '*De nada para servirte ðŸ™‡*', text, {quoted: mek, sendEphemeral: true})
break
case prefix+ 'onichan':
senpai.sendMessage(from, '*ðŸ”¥ Senpai ðŸ”¥*', text, {quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"documentMessage": { "title": "ðŸ”¥ Papi ðŸ”¥", 'jpegThumbnail': fs.readFileSync('./media/thumb.jpeg')}}
}})
break
case prefix+ 'xd':
case prefix+ 'xD':
case prefix+ 'XD':
senpai.sendMessage(from, '*XD?, xd que es follame?*', text, {quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"documentMessage": { "title": "ðŸ”¥ðŸ”¥ðŸ”¥ðŸ”¥ðŸ”¥ðŸ”¥ðŸ”¥ðŸ”¥ðŸ”¥ðŸ”¥ðŸ”¥", 'jpegThumbnail': fs.readFileSync('./media/thumb.jpeg')}}
}})
break
//ACTIVACI?N
case prefix+ 'welcome':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Para activar est¨¢ funcion coloca *welcome 1')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Ya esta activada!!!')
						welkom.push(from)
						fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
						reply('*¡¸ ? ¡¹La funcion de bienvenida esta habilitada en este grupo*')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
						reply('*¡¸ ? ¡¹La funcion de bienvenida esta deshabilitada en este grupo*')
					} else {
						reply('Escribe el comando 1 para activarlo y 0 para desactivarlo Ejemplo: *.welcome 1"')
					}
					break
case prefix+ 'nsfw':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Digita 1 para activar los NSFW')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('Recursos Activados ?')
						nsfw.push(from)
						fs.writeFileSync('./database/json/nsfw.json', JSON.stringify(nsfw))
						reply('¡¸ ? ¡¹  La funcion NSFW esta habilitado en este grupo')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./database/json/nsfw.json', JSON.stringify(nsfw))
						reply('¡¸ ? ¡¹La funcion NSFW esta deshabilitado en este grupo')
					} else {
						reply('Digite 1 para activarlo, 0 para desactivarlo')
					}
					break	
					
//CONVERSI?N
}

} catch (e) {
        
console.log(e)}
        
})      
}
iniciar ()
.catch (err => console.log("unexpected error: " + err))
