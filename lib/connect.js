const { WAConnection } = require("@adiwajshing/baileys")
const { color, bgcolor } = require('./color')
const chalk = require('chalk')
const fs = require("fs")

const client = new WAConnection()
exports.client = client

exports.connect = async() => {
    client.version = [2, 2143, 3]
    console.log(chalk.whiteBright('╭─── [ LOG ]'))
    let auth = './session.json'
    client.logger.level = 'warn'
    client.on("qr", () => {
        console.log(`[ ! ] Escanea el código QR!!!!!`)
    })
    fs.existsSync(auth) && client.loadAuthInfo(auth)
    client.on('connecting', () => {
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ INFO ]"), chalk.whiteBright("Conectando..."))
    })
    client.on('open', () => {
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ INFO ]"), chalk.whiteBright("WA Version : " + client.user.phone.wa_version))
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ INFO ]"), chalk.whiteBright("OS Version : " + client.user.phone.os_version))
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ INFO ]"), chalk.whiteBright("Device : " + client.user.phone.device_manufacturer))
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ INFO ]"), chalk.whiteBright("Model : " + client.user.phone.device_model))
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ INFO ]"), chalk.whiteBright("OS Build Number : " + client.user.phone.os_build_number))
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ INFO ]"), chalk.whiteBright('Welcome My Senpai'))
        const authInfo = client.base64EncodedAuthInfo()
        fs.writeFileSync(auth, JSON.stringify(authInfo, null, '\t'))
    })
    await client.connect({ timeoutMs: 30 * 1000 })
    return client
}