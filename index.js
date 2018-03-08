function it(description){
	if(description === null){
		throw new Error(
			`The first argument of Pekoe.it must be a string. Instead, it was passed an argument of type null.`
		)
	}
	else if(typeof description !== 'string'){
		throw new Error(
			`The first argument of Pekoe.it must be a string. Instead, it was passed an argument of type ${typeof description}.`
		)
	}
}

module.exports = {
	it
}