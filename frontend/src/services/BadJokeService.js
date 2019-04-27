export const BadJokeService = async () => {
    const result = await fetch(`badjoke.json`, {
        headers: {
            'Accept':  'application/json',
            'Cache': 'no-store'
        },
        credentials: 'same-origin'
    })
    const body = result.ok ? await result.json() : {}
    return Object.assign(result, body)
}
