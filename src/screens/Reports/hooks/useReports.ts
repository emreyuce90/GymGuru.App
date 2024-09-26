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
          "/api/Workout/GetByUserId/04aa9bc1-ee4b-45e0-8feb-08dcde5262d9"
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
