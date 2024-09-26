import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

const useGetUserMeasurement = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>("");
  const [measurements, setMeasurements] = useState<IUserMeasurements[]>();
  const [trigger, setTrigger] = useState<number>(0);

  const reFetch = () => {
    setTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //userId ve yeni değer gönder
        const response = await Api.get(
          "/api/Metrics/04aa9bc1-ee4b-45e0-8feb-08dcde5262d9"
        );
        if (response.Success) {
          setMeasurements(response.Resource.resource || []);
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
  }, [trigger]);

  return { loading, error, measurements, reFetch };
};

export default useGetUserMeasurement;
