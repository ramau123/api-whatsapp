import { createBot, createFlow, MemoryDB, createProvider, addKeyword} from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('hola').addAnswer('Hola! Como te va?')
const flowInformacion = addKeyword('informacion').addAnswer('Nosotros somos Grupo Medec Salud y estamos interesados en saber como te sentis con tu cobertura medica :)')

/**
 * 
 */

const main = async () => {

    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const body = req.body
        const number = body.number
        const message = body.message
        const mediaUrl = body.mediaUrl

        await bot.sendMessage(number , message, {media: mediaUrl })

        res.end('esto es del server de polka ')
    }))

    await createBot({
        flow: createFlow([flowBienvenida, flowInformacion]),
        database: new MemoryDB(),
        provider
    })
    
}

main()