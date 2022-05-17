import chalk from 'chalk'
import chalkTable from 'chalk-table'
import DraftLog from 'draftlog'
import readline from 'readline'

import database from './../database.json'
import { Person } from './person.js'

DraftLog(console).addLineListener(process.stdin)

const options = {
    leftPad: 2,
    columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "distanceTraveled", name: chalk.green("Distance Traveled") },
        { field: "startDate", name: chalk.red("Start Date") },
        { field: "endDate", name: chalk.blue("End date") },
    ]
}

const table = chalkTable(options, database.map(item => new Person(item).formatted('pt')))
const print = console.draft(table)
