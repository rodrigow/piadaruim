const prod = {
  API_URL: "https://api.piadaruim.com/piadaruim",
};

const dev = {
  API_URL: "http://localhost:3500/piadaruim",
}

export const config = process.env.NODE_ENV === "development" ? dev : prod;

export const swrConfig = (options = {}) => {
  const fetcher = async (path) => {
    const res = await fetch(`${ config.API_URL }${path}`);
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
