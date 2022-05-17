import readline from 'readline'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import DraftLog from 'draftlog'

import { Person } from './person.js'

export class TerminalController {
    constructor() {
        this.data = {}
        this.print = {}
        this.tableOptions = {
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

    initializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language))

        const table = chalkTable(this.tableOptions, data)

        this.print = console.draft(table)
        this.data = data
    }

    question(msg = '') {
        return new Promise(resolve =>  this.terminal.question(msg, resolve))
    }

}
