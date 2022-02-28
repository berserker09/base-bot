const { WAConnection } = require("@adiwajshing/baileys")
const chalk = require('chalk')
const fs = require("fs")
const exec = require('child_process')
const {color,bgcolor} = require('./color')

const client = new WAConnection()
exports.client = client

exports.connect = async() => {
    client.version = [2, 2143, 3]
    console.log(chalk.keyword("magenta")("> [   INICIANDO   ] <"))
    let auth = './connecting.json'
    client.logger.level = 'warn'
    client.on("qr", () => {
    console.log('⏳', color('Escanea el código qr', 'yellow'))
    })
    fs.existsSync(auth) && client.loadAuthInfo(auth)
    client.on('connecting', () => {
    console.log(chalk.keyword("yellow")("Conectando....."))
    })
    client.on('open', () => {
    console.log(chalk.keyword("yellow")('Conectado con éxito'))
console.log('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀')
console.log('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀')
console.log(chalk.keyword("red")("> ["), chalk.keyword("yellow")('INFORMACIÓN DEL DISPOSITIVO'), chalk.keyword("red")("] <"))
console.log('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀')
console.log(chalk.keyword("aqua")("├"), chalk.keyword("yellow")("[ INFO ]"), chalk.keyword("red")("WA Version :"), chalk.whiteBright(client.user.phone.wa_version))
console.log(chalk.keyword("aqua")("├"), chalk.keyword("yellow")("[ INFO ]"), chalk.keyword("red")("OS Version :"), chalk.whiteBright(client.user.phone.os_version))
console.log(chalk.keyword("aqua")("├"), chalk.keyword("yellow")("[ INFO ]"), chalk.keyword("red")("Device :"), chalk.whiteBright(client.user.phone.device_manufacturer))
console.log(chalk.keyword("aqua")("├"), chalk.keyword("yellow")("[ INFO ]"), chalk.keyword("red")("Model :"), chalk.whiteBright(client.user.phone.device_model))
console.log(chalk.keyword("aqua")("├"), chalk.keyword("yellow")("[ INFO ]"), chalk.keyword("red")("OS Build Number :"), chalk.whiteBright(client.user.phone.os_build_number))
console.log('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀')
console.log('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀')
console.log(chalk.keyword("aqua")("Amm..."), chalk.keyword("magenta")('Welcome My Senpai >///<'))
const authInfo = client.base64EncodedAuthInfo()
fs.writeFileSync(auth, JSON.stringify(authInfo, null, '\t'))
})
    await client.connect({ timeoutMs: 30 * 1000 })
    return client
}