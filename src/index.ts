import chalk from 'chalk'

export function describe(description: string, ...callbacks: Function[]) {
	let results = []
	let failures = []
	callbacks.forEach(callback => {
		callback(results, failures)
	})

	console.log(results
		.map(r => r ? chalk.green('.') : chalk.red('F'))
		.join('')
	)
	console.log('Failures:')
	failures.forEach(failure => {
		console.log(description, failure.description)
		console.log(chalk.red(String(failure.error)))
	})
}

export function it(description: string, callback: Function) {
	return (results: boolean[], failures: object[]) => {
		try {
			callback()
			results.push(true)
		} catch (error) {
			results.push(false)
			failures.push({ description, error })
		}
	}
}
