import readline from 'readline'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import DraftLog from 'draftlog'

import { Person } from './person.js'

export class TerminalController {
    constructor() {
        this.tableOptions =  {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.cyan("ID") },
                { field: "vehicles", name: chalk.magenta("Vehicles") },
                { field: "distanceTraveled", name: chalk.green("Distance Traveled") },
                { field: "startDate", name: chalk.red("Start Date") },
                { field: "endDate", name: chalk.blue("End date") },
            ]
        }
    }

    initializeTerminal(database, language) {
        DraftLog(console).addLineListener(process.stdin)

        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.initializeTable(database, language)
    }

    closeTerminal() {
        this.terminal.close()
    }

    initializeTable(data, language) {
        const formattedData = data.map(item => new Person(item).formatted(language))

        const table = chalkTable(this.tableOptions, formattedData)

        this.language = language
        this.data = formattedData
        this.printTable = console.draft(table)
    }

    updateTable(rawData) {
        const formattedData = Person.generateInstanceFromString(rawData).formatted(this.language)

        this.data.push(formattedData)
        
        const table = chalkTable(this.tableOptions, this.data)

        this.printTable(table)
    }
    

    question(msg = '') {
        return new Promise(resolve =>  this.terminal.question(msg, resolve))
    }

}
