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
