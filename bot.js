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

case 'bot':
senpai.sendMessage(from, 'Hola,felicidades, has logrado enviar un mensaje mediante un servidor externo😚', text, {quoted: mek, sendEphemeral: true})
break
case 'hola':
senpai.sendMessage(from, 'Hola, ¿como estás?', text, {quoted: mek, sendEphemeral: true})
break
case 'bien':
senpai.sendMessage(from, 'Oh, me alegro :D', text, {quoted: mek, sendEphemeral: true})
break
case 'gracias':
senpai.sendMessage(from, 'De nada para servirte 🙇', text, {quoted: mek, sendEphemeral: true})
break
case prefix+ 'attp':
						if (args.length < 1) return reply(`donde esta el texto?,esto sirve para crear sticker en movimiento con letra\n> *ejemplo* : *${prefix}attp* _Soypijudo_`)
						attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
						senpai.sendMessage(from, attp2, MessageType.sticker, {quoted: mek, sendEphemeral: true})
						break
case 'sticker': 
    case 'stiker':
    case 'sg':
    case 's':
            if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await senpai.downloadAndSaveMediaMessage(encmedia)
            const packname10 = `⌈ 𝗦𝗹𝗼𝘄𝗲𝗿𝗕𝗼𝘁 ⌋`
const author10 = args.join('⌈ 𝗦𝗹𝗼𝘄𝗲𝗿𝗕𝗼𝘁 ⌋')
                ran = '666.webp'
                await ffmpeg(`./${media}`)
                .input(media)
                .on('start', function (cmd) {
                     console.log(`Started : ${cmd}`)
                })
                .on('error', function (err) {
                 console.log(`Error : ${err}`)
                fs.unlinkSync(media)
                reply('error')
                })
                .on('end', function () {
                console.log('Finish')
                senpai.sendMessage(from, fs.readFileSync(ran), MessageType.sticker, {quoted: mek})
                 fs.unlinkSync(media)
                fs.unlinkSync(ran)
                })
                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                .toFormat('webp')
                .save(ran)
                } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
                const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                const media = await senpai.downloadAndSaveMediaMessage(encmedia)
                const packname10 = `⌈ 𝗦𝗹𝗼𝘄𝗲𝗿𝗕𝗼𝘁 ⌋'`
const author10 = args.join('⌈ 𝗦𝗹𝗼𝘄𝗲𝗿𝗕𝗼𝘁 ⌋')
            ran = '999.webp'
            reply(mess.wait)
            await ffmpeg(`./${media}`)
            .inputFormat(media.split('.')[1])
            .on('start', function (cmd) {
            console.log(`Started : ${cmd}`)
            })
            .on('error', function (err) {
            console.log(`Error : ${err}`)
            fs.unlinkSync(media)
            tipe = media.endsWith('.mp4') ? 'video' : 'gif'
            reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`)
            })
            .on('end', function () {
            console.log('Finish')
            senpai.sendMessage(from, fs.readFileSync(ran), MessageType.sticker, {quoted: mek, sendEphemeral: true})
            fs.unlinkSync(media)
            fs.unlinkSync(ran)
                })
                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                .toFormat('webp')
                .save(ran)
            } else {
                reply(`Responde a una imagen o vídeo, asegúrate que dure menos de 10seg,si es imágen quedara en sticker normal, y si es un vídeo quedará en sticker de movimiento,!si un vídeo que no se pasé de 10segundos!`)
            }
            break

}

} catch (e) {
        
console.log(e)}
        
})      
}
iniciar ()
.catch (err => console.log("unexpected error: " + err))
