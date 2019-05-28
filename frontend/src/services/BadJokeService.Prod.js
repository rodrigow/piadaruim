export const BadJokeServiceProd = async (id) => {
    const result = await fetch(`resources/joke${id ? `/${id}` : ''}`, {
        headers: {
            'Accept':  'application/json',
            'Cache': 'no-store'
        },
        credentials: 'same-origin'
    })
    const joke = result.ok ? await result.json() : {}
    return Object.assign(result, { joke: joke })
}
