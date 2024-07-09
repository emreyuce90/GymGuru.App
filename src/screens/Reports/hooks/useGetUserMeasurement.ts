import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

const useGetUserMeasurement = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>("");
  const [measurements, setMeasurements] = useState<IUserMeasurements[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //userId ve yeni değer gönder
        const response = await Api.get(
          "/api/Metrics/7aaf453f-56ea-4f7d-8877-4cec29072bfe"
        );
        if (response.Success) {
          setMeasurements(response.Resource.resource);
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

  return { loading, error, measurements };
};

export default useGetUserMeasurement;
