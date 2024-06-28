import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

const useReports = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>();
  const [reports, setReports] = useState<IWorkoutLog[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get(
          "/api/Workout/GetByUserId/7aaf453f-56ea-4f7d-8877-4cec29072bfe"
        );
        console.log("res", res);
        if (res.Success) {
          setReports(res.Resource.resource);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, reports };
};

export default useReports;
