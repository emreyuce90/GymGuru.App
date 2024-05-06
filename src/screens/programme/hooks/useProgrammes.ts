import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

const useProgrammes = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>("");
  const [programmes, setProgrammes] = useState<IProgramme[]>([]);

  useEffect(() => {
    const getProgrammes = async () => {
      try {
        const programmes = await Api.get("/api/programme");
        if (programmes.Success) {
          setProgrammes(programmes.Resource.resource);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getProgrammes();
  }, []);
  return { loading, error, programmes };
};

export default useProgrammes;
