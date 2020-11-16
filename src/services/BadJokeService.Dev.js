export const BadJokeServiceDev = async (id, seen) => {
    console.log(`DEBUG => Bad Joke Service: id=${id} seen=${seen}`);
    return {
        ok: true,
        status: 200,
        joke: {
            id: id ? id : 1,
            text: "Por quê as araucárias não se perdem na mata? Pois elas tem uma pinha."
        }
    }
}
