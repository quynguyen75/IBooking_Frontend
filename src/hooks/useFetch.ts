import { useEffect, useState } from "react";

export default function useFetch<T>(url: string, options?: any) {
  const [status, setStatus] = useState<string>("loading");
  const [data, setData] = useState<null | T>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const parseData = await response.json();

        setData(parseData);
        setStatus("success");
      } catch (error) {
        console.log(error);
        setStatus("failed");
      }
    };

    fetchData();
  }, [url, options]);

  return [status, data];
}
