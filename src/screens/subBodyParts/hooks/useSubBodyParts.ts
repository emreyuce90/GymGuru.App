import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

const useSubBodyParts = (bodypartId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>();
  const [subbodyparts, setSubbodyparts] = useState<ISubBodyPart[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`api/Bodypart/bodypart/${bodypartId}`);
        if (response.Success) {
          setSubbodyparts(response.Resource.resource);
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

  return { loading, error, subbodyparts };
};

export default useSubBodyParts;
