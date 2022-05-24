import database from './../database.json'
import { TerminalController } from './terminalController.js'

const defaultLanguage = 'pt-BR'
const exitCommand = ':q'

const terminalController = new TerminalController()

terminalController.initializeTerminal(database, defaultLanguage)

function shouldExitLoop(input, command = exitCommand) {
    return input === command
}

async function mainLoop() {
    try {
        const userData = await terminalController.question('Enter the data: ')
        
        let shouldExit = shouldExitLoop(userData)

        if (shouldExit) return terminalController.closeTerminal()

        await terminalController.updateTable(userData)

        //2 Bike,Moto 5000 2021-01-01 2022-02-02

        return mainLoop()
    } catch (error) {
        console.log('Unsupported command or data format. Error: ', error)

        mainLoop()
    }
}

await mainLoop()