import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

type subProgrammePropTypes = {
  programmeId: string;
};

const useSubProgramme = (props: subProgrammePropTypes) => {
  const [error, setError] = useState<string | unknown>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [subProgrammes, setSubProgrammes] = useState<ISubProgramme[]>([]);

  const { programmeId } = props;
  useEffect(() => {
    const getSubProgrammes = async () => {
      try {
        const subProgrammes = await Api.get(`/api/SubProgramme/${programmeId}`);
        if (subProgrammes.Success) {
          console.log(
            "subProgrammes.Resource.resource",
            subProgrammes.Resource.resource
          );

          setSubProgrammes(subProgrammes.Resource.resource);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getSubProgrammes();
  }, []);

  return { loading, error, subProgrammes };
};

export default useSubProgramme;
