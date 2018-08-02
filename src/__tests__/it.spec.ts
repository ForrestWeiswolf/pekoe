import { expect } from 'chai'
import pekoe from '..'

describe('pekoe.it', () => {
	it('Is a function', () => {
		expect(pekoe.it).to.be.a('function')
	})

	it('Returns a function', () => {
		expect(pekoe.it('foo', () => null)).to.be.a('function')
	})

	describe('the returned function', () => {
		let ranTestReturn
		const exampleError = new Error('A spectacular failure!')
		let errorFuncReturn
		let ran = false
		beforeEach(() => {
			ranTestReturn = pekoe.it('sets a var', () => { ran = true })
			errorFuncReturn = pekoe.it('oh no!', () => { throw exampleError })
		})

		it('calls the function that was passed to pekoe', () => {
			ranTestReturn([], [])
			expect(ran).to.be.true
		})

		describe('if the function doesn\'t throw an error', () => {
			it('pushes `true` to the first array it was passed', () => {
				let firstArr = []
				ranTestReturn(firstArr, [])
				expect(firstArr[0]).to.be.true
			})

			it('does not modify the second array it was passed', () => {
				let secondArr = []
				ranTestReturn([], secondArr)
				expect(secondArr.length).to.equal(0)
			})
		})

		describe('if the function throws an error', () => {
			it('pushes `false` to the first array it was passed', () => {
				let firstArr = []
				errorFuncReturn(firstArr, [])
				expect(firstArr[0]).to.be.false
			})

			it('pushes an object to the second array it was passed', () => {
				let secondArr = []
				errorFuncReturn([], secondArr)
				expect(secondArr[0]).to.be.an('object')
			})

			describe('the object it pushes to its second arg', () => {
				let objectPushed
				beforeEach(() => {
					let secondArr = []
					errorFuncReturn([], secondArr)
					objectPushed = secondArr[0]
				})

				it('has a .description property with the string passed to pekoe.it', () => {
					expect(objectPushed.description).to.equal('oh no!')
				})

				it('has a .error property with the error that was thrown', () => {
					expect(objectPushed.error).to.equal(exampleError)
				})
			})
		})
	})
})
