import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

const useExercises = (bodypartId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>();
  const [exercises, setExercises] = useState<IMovement[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get(
          `/api/Movements/GetMovementsByBodyPartId/${bodypartId}`
        );
        if (res.Success) {
          setExercises(res.Resource.resource);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, exercises };
};

export default useExercises;
