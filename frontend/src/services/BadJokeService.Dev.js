export const BadJokeServiceDev = async (id) => {
    console.log('DEBUG => Bad Joke Service: ' + id)
    return {
        ok: true,
        status: 200,
        joke: {
            id: isNaN(id) ? 1 : id,
            text: "Por quê as araucárias não se perdem na mata? Pois elas tem uma pinha."
        }
    }
}
