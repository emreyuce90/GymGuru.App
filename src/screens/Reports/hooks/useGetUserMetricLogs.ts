import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";
import { useAuth } from "../../../context/AuthProvider";

const useGetUserMetricLogs = (bodyMetricId: string) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>();
  const [metricLogs, setMetricLogs] = useState<IUserMetricLog[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(
          `/api/Metrics/${user?.id}/${bodyMetricId}`
        );

        if (response.Success) {
          setMetricLogs(response.Resource.resource);
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

  return { loading, error, metricLogs };
};

export default useGetUserMetricLogs;
