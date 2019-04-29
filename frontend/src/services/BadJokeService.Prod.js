export const BadJokeServiceProd = async () => {
    const result = await fetch(`resources/joke`, {
        headers: {
            'Accept':  'application/json',
            'Cache': 'no-store'
        },
        credentials: 'same-origin'
    })
    const joke = result.ok ? await result.json() : {}
    return Object.assign(result, { joke: joke })
}
