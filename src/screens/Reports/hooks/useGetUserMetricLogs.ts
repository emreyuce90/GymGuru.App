import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

const useGetUserMetricLogs = (bodyMetricId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>();
  const [metricLogs, setMetricLogs] = useState<IUserMetricLog[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(
          `/api/Metrics/04aa9bc1-ee4b-45e0-8feb-08dcde5262d9/${bodyMetricId}`
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
