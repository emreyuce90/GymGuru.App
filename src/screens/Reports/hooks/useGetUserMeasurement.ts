import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";
import { useAuth } from "../../../context/AuthProvider";

const useGetUserMeasurement = () => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>("");
  const [measurements, setMeasurements] = useState<IUserMeasurements[]>([]);
  const [trigger, setTrigger] = useState<number>(0);

  const reFetch = () => {
    setTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id || authLoading) {
        // Eğer user tanımlı değilse veya auth loading ise hiçbir şey yapma
        return;
      }
      try {
        //userId ve yeni değer gönder
        const response = await Api.get(`/api/Metrics/${user?.id}`);
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
  }, [trigger, user, authLoading]);

  return { loading, error, measurements, reFetch };
};

export default useGetUserMeasurement;
