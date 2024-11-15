import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

export type ArtikelDTO = {
  id: string;
  name: string;
  description: string;
};
type ArtikelPayload = Omit<ArtikelDTO, "id">;

export type ArtikelList = {
  content: ArtikelDTO[];
};
export function useArtikelList() {
  const [data, setData] = useState<ArtikelList>({
    content: [],
  });
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function getArtikelList() {
      setIsPending(true);

      try {
        const response = await axiosInstance.get("/crud/artikel");

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

    getArtikelList();
  }, []);

  return { data, isPending, error };
}

export function useArtikelDetail(
  id?: string,
  options: { enabled?: boolean } = {
    enabled: true,
  }
) {
  const [data, setData] = useState<ArtikelDTO>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function getArtikelDetail() {
      setIsPending(true);

      try {
        const response = await axiosInstance.get(`/crud/artikel/${id}`);

        if (axios.isAxiosError(response)) {
          setError(response);
        } else {
          console.log(response.data);
          setData(response.data?.data);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }

      setIsPending(false);
    }

    if (options.enabled) {
      getArtikelDetail();
    }
  }, [id, options.enabled]);

  return { data, isPending, error };
}

export function useArtikelCreate() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>();

  async function mutate(values: ArtikelPayload) {
    setIsPending(true);

    try {
      await axiosInstance.post("/crud/artikel", values);
    } catch (error) {
      console.error(error);
      setError(error);
    }

    setIsPending(false);
  }

  return { mutate, isPending, error };
}

export function useArtikelEdit() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>();

  async function mutate(id: string, values: ArtikelPayload) {
    setIsPending(true);

    try {
      await axiosInstance.post("/crud/artikel/" + id, values);
    } catch (error) {
      console.error(error);
      setError(error);
    }

    setIsPending(false);
  }

  return { mutate, isPending, error };
}
