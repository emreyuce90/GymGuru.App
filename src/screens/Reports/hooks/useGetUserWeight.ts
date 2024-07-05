import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

const useGetUserWeight = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>("");
  const [weight, setWeight] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //userId ve yeni değer gönder
        const response = await Api.get(
          "/api/Metrics/7aaf453f-56ea-4f7d-8877-4cec29072bfe"
        );
        if (response.Success) {
          setWeight(response.Resource.resource[0].value || 0);
        } else {
          setError(response.Message);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, weight };
};

export default useGetUserWeight;
