const expect = require('chai').expect
const Pekoe = require('.')

describe('it', () => {
	it('is a function', () => {
		expect(typeof Pekoe.it).to.equal('function')
	})

	it('can take a string and a function as arguments', () => {
		Pekoe.it('str', () => {})
	})


	it('throws an informative error when first argument is not a string', () => {
		const types = {
			number: 1, 
			object: {},
			undefined: undefined, 
			null: null,
			'function': () => {}
		}

		const wrongTypeCalls = {}
		
		Object.keys(types).forEach((type) => {
			wrongTypeCalls[type] = () => {
				Pekoe.it(types[type], () => {})
			}
		})

		Object.keys(wrongTypeCalls).forEach((type) => {
			expect(wrongTypeCalls[type]).to.throw(
				`The first argument of Pekoe.it must be a string. Instead, it was passed an argument of type ${type}.`
			)
		})
	})
})