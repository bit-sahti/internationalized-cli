import database from './../database.json'
import { TerminalController } from './terminalControler.js'

const defaultLanguage = 'pt-BR'
const exitCommand = ':q'

const terminalControler = new TerminalController()
terminalControler.initializeTerminal(database, defaultLanguage)

async function mainLoop() {
    try {
        const userData = await terminalControler.question('Enter the data: ')

        if (userData === exitCommand) {
            console.log('Exiting process')

            terminalControler.closeTerminal()

            return
        }

        return mainLoop()
    } catch (error) {
        console.log('Error ', error)

        mainLoop()
    }
}

await mainLoop()