import { Repository } from "../src/repository.js"

import fsPromises from 'fs/promises'

import sinon from 'sinon'
import { describe, it } from 'mocha'
import { expect } from "chai"

describe('[Repository] test suite', () => {
    it('should save the data', async () => {
        sinon.stub(fsPromises, 'readFile').returns(JSON.stringify([]))
        sinon.stub(fsPromises, 'writeFile')

        await Repository.save('das')

        expect(fsPromises.readFile.calledOnce).to.be.ok
        expect(fsPromises.writeFile.calledOnce).to.be.ok
        expect(fsPromises.writeFile.getCall(0).args[1]).to.deep.equal(JSON.stringify(['das']))
    })
})


