import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Api from "../../lib/@core/data/Api";

const useBodyPart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | string>("");
  const [bodyParts, setBodyParts] = useState<IBodyPart[]>();

  useEffect(() => {
    const fetchbodypart = async () => {
      try {
        const data = await Api.get("/api/bodypart");
        if (data.Success) {
          setBodyParts(data?.Resource?.resource);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchbodypart();
  }, []);

  return { loading, error, bodyParts };
};

export default useBodyPart;
