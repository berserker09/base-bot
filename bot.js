//Files json
const welkom = JSON.parse(fs.readFileSync('./lib/welkom.json'))
const antilink = JSON.parse(fs.readFileSync('./lib/antilink.json'))

//Wa connet
const { WAConnection, MessageType } = require('@adiwajshing/baileys');
const fs = require('fs');
const prefix = '.'

async function iniciar () { 
        const senpai = new WAConnection()
        senpai.logger.level = 'warn'
        senpai.version = [2, 2143, 3]
        senpai.on('qr', () => {
        })
        fs.existsSync('./session.json') && senpai.loadAuthInfo('./session.json')
        senpai.on('connecting', () => {
        console.log('Conectando')
        })
        senpai.on('open', () => {
        console.log('Conectado exitosamente :D')
        })
        await senpai.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session', JSON.stringify(senpai.base64EncodedAuthInfo(), null, '\t'))
 //Banned Call
senpai.on('CB:action,,call', async json => {
    const callerId = json[2][0][1].from;
    console.log("llamada de"+ callerId)
        senpai.sendMessage(callerId, "Sistema de auto bloqueo por llamadas, no llamadas porfavor", MessageType.text)
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
			teks =  `Hola🙋🏻‍♂️ @${num.split('@')[0]} Bienvenid@ a ${mdata.subject}\nRecuerda seguir las reglas\n\nDescripcion\n${mdata.desc} `
			let buff = await getBuffer(ppimg)
		        senpai.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
			num = anu.participants[0]
			try {
			ppimg = await senpai.getProfilePicture(`${num.split('@')[0]}@c.us`)
			} catch {
			ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
			}
			teks = `*Adiós 🙋🏻‍♂️ @${num.split('@')[0]} estaremos  mejor sin ti 😹*\n\n*por favor no vuelvas rata🐀🐀*`
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
			
			teks = `*ERES EL NUEVO ADMIN 😎*
			
\`\`\`Nombre :\`\`\` ${pushname}

\`\`\`Numero :\`\`\` ${num.replace('@s.whatsapp.net', '')}

\`\`\`Dato : AHORITA\`\`\`

\`\`\`Grupo :\`\`\` ${mdata.subject}`
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
			teks = `*YA NO ERES ADMIN 🥺*
			
\`\`\`Nombre :\`\`\` ${pushname}

\`\`\`Numero :\`\`\` ${num.replace('@s.whatsapp.net', '')}

\`\`\`Dato : AHORITA\`\`\`

\`\`\`Grupo :\`\`\` ${mdata.subject}`
			senpai.sendMessage(mdata.id, teks, MessageType.text, {contextInfo: {mentionedJid: [num]}, quoted: { "key": { "participant": `${numbernye}`, "remoteJid": `Ktl`, "fromMe": false, "id": "B391837A58338BA8186C47E51FFDFD4A" }, "message": { "documentMessage": { "jpegThumbnail": buff, "mimetype": "application/octet-stream", "title": `DEMOTE`, "fileLength": "36", "pageCount": 0, "fileName": `_Welcome_` }}, "messageTimestamp": "1614069378", "status": "PENDING"}})
		}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
})

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

case 'bot':
client.sendMessage(from, 'Hola,felicidades, has logrado enviar un mensaje mediante un servidor externo😚', text, {quoted : mek, sendEphemeral: true})
break
                
}

} catch (e) {
        
console.log(e)}
        
})      
}
iniciar ()
.catch (err => console.log("unexpected error: " + err))
