import { useCallback, useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";
import { useAuth } from "../../../context/AuthProvider";

const useProgrammes = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>("");
  const [programmes, setProgrammes] = useState<IProgramme[]>([]);

  const fetchData = async () => {
    try {
      const programmes = await Api.get(`/api/programme/${user?.id}`);
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
