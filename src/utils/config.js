const prod = {
  API_URL: "https://api.piadaruim.com/piadaruim",
};

const dev = {
  API_URL: "localhost",
}

export const config = process.env.NODE_ENV === "development" ? dev : prod;

export const swrConfig = (options = {}) => {
  const fetcher = async (path) => {
    console.log('################## -> path', path);

    // if (config.API_URL === "localhost") {
    //
    //   return (Math.floor(Math.random() * 100) % 2 === 0) ?
    //     {
    //       "id": "1",
    //       "pergunta": "O que é o filho de um pontinho marrom no palco?",
    //       "resposta": "Charlie BROWN Jr.!",
    //
    //     } : {
    //       "id": "2",
    //       "pergunta": "Nomes criativos para seus filhos gêmeos: Nemli e Nemlerei."
    //     };
    // }

    const res = await fetch(`${ config.API_URL }${ path }`);
    if (res.status >= 400) {
      const error = new Error('An error occurred while fetching the data.');
      error.info = await res.json();
      error.status = res.status;
      throw error;
    } else {
      return res.json();
    }
  };

  return {
    fetcher,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    ...options
  };
};
