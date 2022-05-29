import { describe, it } from "mocha"
import { expect } from "chai"

import { Person } from "../src/person.js"

describe('[Person] test suite', () => {
    it('should return an instance from a string', () => {
        const string = '1 avião,barco 50000 2022-01-01 2022-03-01'
        const expected = {
            id: '1',
            vehicles: ['avião', 'barco'],
            distanceTraveled: '50000',
            startDate: '2022-01-01',
            endDate: '2022-03-01'
        }

        const newPerson = Person.generateInstanceFromString(string)

        expect(newPerson instanceof Person).to.be.deep.equal(true)
        expect(newPerson).to.be.deep.equal(expected)
    })

    it('should format the content to the especified language', () => {
        const string = '1 avião,barco 50000 2022-01-01 2022-03-01'
        const expected = {
            id: 1,
            vehicles: 'avião e barco',
            distanceTraveled: '50.000 km',
            startDate: '01 de janeiro de 2022',
            endDate: '01 de março de 2022'
        }

        const newPerson = Person.generateInstanceFromString(string)

        expect(newPerson.formatted('pt')).to.be.deep.equal(expected)
    })

    it('should format the content to english as default', () => {
        const string = '1 avião,barco 50000 2022-01-01 2022-03-01'
        const expected = {
            id: 1,
            vehicles: 'avião and barco',
            distanceTraveled: '50,000 mi',
            startDate: 'January 01, 2022',
            endDate: 'March 01, 2022'
        }

        const newPerson = Person.generateInstanceFromString(string)

        expect(newPerson.formatted('en')).to.be.deep.equal(expected)
    })
})