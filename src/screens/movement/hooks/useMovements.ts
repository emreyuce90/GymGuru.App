import Api from "../../../../lib/@core/data/Api";
import { useEffect, useState } from "react";

const useMovements = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | string>();
  const [movements, setMovements] = useState<IMovement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movements = await Api.get("/api/movements");
        if (movements.Success) {
          setMovements(movements?.Resource.resource);
          console.log("movements", movements);
        }
      } catch (err) {
        setError(err);
        console.log("err", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, movements };
};

export default useMovements;
