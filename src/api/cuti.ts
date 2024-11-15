import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

type CutiDTO = {
  id: string;
  name: string;
  reason: string;
};
export type CutiList = {
  content: CutiDTO[];
};
export function useCutiList() {
  const [data, setData] = useState<CutiList>({
    content: [],
  });
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function getCulitList() {
      setIsPending(true);

      try {
        const response = await axiosInstance.get("/bpmn/Cuti");

        if (axios.isAxiosError(response)) {
          setError(response);
        } else {
          setData(response.data?.data);
        }
      } catch (error) {
        setError(error);
      }

      setIsPending(false);
    }

    getCulitList();
  }, []);

  return { data, isPending, error };
}
