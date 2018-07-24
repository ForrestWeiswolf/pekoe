export function describe(description: string, ...callbacks: Function[]){
	let results = []
	let failures = []
	callbacks.forEach(callback => {
		callback(results, failures)
	})

	console.log(results.map(r => r ? '.' : 'F').join(''))
	console.log('Failures:')
	failures.forEach(failure => {
		console.log(failure)
	})
}

export function it(description: string, callback: Function){
	return (results: boolean[], failures: string[]) => {
		try {
			callback()
			results.push(true)
		} catch (error) {
			results.push(false)
			failures.push(String(error))
		}	
	}
}
