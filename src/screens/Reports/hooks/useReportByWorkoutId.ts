import { useEffect, useState } from "react";
import Api from "../../../../lib/@core/data/Api";

type useReportByWorkoutIdPropTypes = {
  workoutId: string;
};

const useReportByWorkoutId = (props: useReportByWorkoutIdPropTypes) => {
  const { workoutId } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | string>("");
  const [reportDetails, setReportDetails] = useState<any>();
  console.log("props", props);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(
          `/api/Workout/GetWorkoutLogDetailsByWorkoutId/${workoutId}`
        );
        if (response.Success) {
          setReportDetails(response.Resource.resource);
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

  return { loading, error, reportDetails };
};

export default useReportByWorkoutId;
