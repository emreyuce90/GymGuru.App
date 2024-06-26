import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

const useBodyPart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>();
  const [bodyparts, setBodyparts] = useState<IBodyPart[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get("/api/bodypart");
        if (response.Success) {
          setBodyparts(response.Resource.resource);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { loading, error, bodyparts };
};

export default useBodyPart;
