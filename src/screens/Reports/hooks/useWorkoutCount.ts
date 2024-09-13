import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

const useWorkoutCount = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>("");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(
          "/api/Workout/GetWorkoutCountByUserId/9c2e83f5-d9b6-4ae1-ebad-08dcd3c40b19"
        );
        if (response.Success) {
          setCount(response.Resource.resource);
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

  return { loading, error, count };
};

export default useWorkoutCount;
