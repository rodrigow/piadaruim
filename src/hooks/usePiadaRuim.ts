import useSWR from "swr";

type PiadaResponse = {
  id: number;
  label: string;
}

export const usePiadaRuim = () => {
  const { data, isLoading } = useSWR<PiadaResponse[]>(`/novaPiada`);

  return {
    piadaRuim: data,
    isPiadaRuimLoading: isLoading
  }
};
