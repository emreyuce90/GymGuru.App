import { useCallback, useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

const useProgrammes = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>("");
  const [programmes, setProgrammes] = useState<IProgramme[]>([]);

  const fetchData = async () => {
    try {
      const programmes = await Api.get(
        `/api/programme/04aa9bc1-ee4b-45e0-8feb-08dcde5262d9`
      );
      if (programmes.Success) {
        setProgrammes(programmes.Resource.resource);
      } else {
        setError(programmes.Message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { loading, error, programmes, fetchData };
};

export default useProgrammes;
