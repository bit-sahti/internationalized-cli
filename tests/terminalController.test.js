import sinon from "sinon"
import readline from 'readline'
import { describe, it } from 'mocha'
import { expect } from "chai"

import { TerminalController } from "../src/terminalController.js"

import { Person } from "../src/person.js"
import { Repository } from "../src/repository.js"

describe('[TerminalController] test suite', () => {
    let terminalController, sandbox
    const mockedFormatted = {
        id: 1,
        vehicles: 'Motocicleta, Carro e Caminhão',
        distanceTraveled: '10.000 km',
        startDate: '01 de janeiro de 2020',
        endDate: '01 de janeiro de 2022'
    }
    
    beforeEach(() => {
        terminalController = new TerminalController()
        sandbox = sinon.createSandbox()

        const fake = sandbox.fake()

        sandbox.stub(readline, 'createInterface').returns({ close: fake, question: fake })
        sandbox.stub(Person.prototype, 'formatted').returns(mockedFormatted)
        sandbox.stub(console, 'log')

        terminalController.initializeTerminal([{}], 'pt')
    })

    afterEach(() => {
      sandbox.restore()
    })
    
    it('should initialize the terminal', () => {
        expect(readline.createInterface.calledOnce).to.be.ok
        expect(terminalController.terminal).to.be.ok
        expect(terminalController.language).to.be.equal('pt')
        expect(terminalController.data).to.deep.equal([mockedFormatted])
        expect(terminalController.hasOwnProperty('printTable')).to.be.ok
    })

    it('should save the data and update the table', async () => {
      const expected = [
        mockedFormatted,
        {
          id: 2,
          vehicles: 'Avião',
          distanceTraveled: '20.000 km',
          startDate: '05 de janeiro de 2020',
          endDate: '01 de maio de 2022'
        }
      ]

      Person.prototype.formatted.returns(expected[1])

      sinon.stub(Repository, 'save')

      await terminalController.updateTable('2 Avião 20000 2022-01-05 2022-05-05')

      expect(Repository.save.calledOnce).to.be.ok
      expect(terminalController.data).to.deep.equal(expected)
    })

    it('should close the terminal', () => {
      terminalController.closeTerminal()

      expect(terminalController.terminal.close.callCount).to.equal(1)
    })

    it('should write a question to the terminal', async () => {
      terminalController.question('Sup')

      expect(terminalController.terminal.question.callCount).to.equal(1)
      expect(terminalController.terminal.question.calledWith('Sup')).to.be.ok
    })
})

