import useSWR from "swr";

type PiadaRequest = {
  id: string | null;
}

type PiadaResponse = {
  id: number;
  pergunta: string;
  resposta?: string;
}

export const usePiadaRuim = ({ id }: PiadaRequest) => {
  const key = id ? `/id=${id}` : '/';
  console.log('################## -> key', key);

  const { data, isLoading, isValidating, mutate } = useSWR<PiadaResponse>(key);

  return {
    piada: data,
    mutatePiada: mutate,
    isPiadaLoading: isLoading || isValidating,
  }
};
