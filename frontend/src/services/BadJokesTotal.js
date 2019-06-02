export const BadJokesTotal = async () => {
    const result = await fetch(`resources/totaljokes`, {
        headers: {
            'Accept':  'application/json',
            'Cache': 'no-store'
        },
        credentials: 'same-origin'
    })
    const totalJokes = result.ok ? await result.json() : {}
    return Object.assign(result, { jokes: totalJokes })
};