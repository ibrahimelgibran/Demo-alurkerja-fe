import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

export type CutiDTO = {
  id: string;
  name: string;
  reason: string;
};
type CutiPayload = Omit<CutiDTO, "id">;

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
    async function getCutiList() {
      setIsPending(true);

      try {
        const response = await axiosInstance.get("/bpmn/Cuti");

        if (axios.isAxiosError(response)) {
          setError(response);
        } else {
          setData(response.data?.data);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }

      setIsPending(false);
    }

    getCutiList();
  }, []);

  return { data, isPending, error };
}

export function useCutiCreate() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>();

  async function mutate(values: CutiPayload) {
    setIsPending(true);

    try {
      await axiosInstance.post("/bpmn/Cuti", values);
    } catch (error) {
      console.error(error);
      setError(error);
    }

    setIsPending(false);
  }

  return { mutate, isPending, error };
}

export function useCutiDetail(
  id?: string,
  options: { enabled?: boolean } = {
    enabled: true,
  }
) {
  const [data, setData] = useState<CutiDTO>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function getCutiDetail() {
      setIsPending(true);

      try {
        const response = await axiosInstance.get(`/bpmn/Cuti/${id}`);

        if (axios.isAxiosError(response)) {
          setError(response);
        } else {
          console.log(response.data);
          setData(response.data?.data?.object);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }

      setIsPending(false);
    }

    if (options.enabled) {
      getCutiDetail();
    }
  }, [id, options.enabled]);

  return { data, isPending, error };
}
