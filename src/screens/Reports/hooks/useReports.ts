import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";
import { useAuth } from "../../../context/AuthProvider";

const useReports = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>();
  const [reports, setReports] = useState<IWorkoutLog[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get(`/api/Workout/GetByUserId/${user?.id}`);
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
