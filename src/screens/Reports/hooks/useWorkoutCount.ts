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
          "/api/Workout/GetWorkoutCountByUserId/7aaf453f-56ea-4f7d-8877-4cec29072bfe"
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
