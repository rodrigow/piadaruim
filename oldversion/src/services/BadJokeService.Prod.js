export const BadJokeServiceProd = async (id, seen) => {
    const result = await fetch(`api/index.php${`?id=${id}&seen=${seen}`}`, {
        headers: {
            'Accept':  'application/json',
            'Cache': 'no-store'
        },
        credentials: 'same-origin'
    })
    const joke = result.ok ? await result.json() : {}
    return Object.assign(result, { joke: joke })
}
