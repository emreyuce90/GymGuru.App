import { useCallback, useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

const useProgrammes = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>("");
  const [programmes, setProgrammes] = useState<IProgramme[]>([]);

  const fetchData = async () => {
    try {
      const programmes = await Api.get(
        `/api/programme/9c2e83f5-d9b6-4ae1-ebad-08dcd3c40b19`
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
