import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

type useSubProgrammeMovementsPropTypes = {
  subProgrammeId: string;
};

const useSubProgrammeMovements = (props: useSubProgrammeMovementsPropTypes) => {
  const { subProgrammeId } = props;
  const [subProgrammeMovements, setsubProgrammeMovements] = useState<
    ISubProgrammeMovement[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>("");

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const movements = await Api.get(
          `/api/SubProgrammeMovement/${subProgrammeId}`
        );
        if (movements.Success) {
          setsubProgrammeMovements(movements.Resource.resource);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovements();
  }, []);

  return { loading, error, subProgrammeMovements };
};

export default useSubProgrammeMovements;
