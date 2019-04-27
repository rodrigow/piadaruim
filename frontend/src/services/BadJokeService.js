export const BadJokeService = async () => {
    const result = await fetch(`resources/joke`, {
        headers: {
            'Accept':  'application/json',
            'Cache': 'no-store'
        },
        credentials: 'same-origin'
    })
    const body = result.ok ? await result.json() : {}
    return Object.assign(result, body)
}
