import Api from "../../../../lib/@core/data/Api";

export const deleteProgramme = async (programmeId: string) => {
  try {
    const response = await Api.delete(`/api/programme/${programmeId}`, {});
    if (response.Success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Silme işlemi başarısız");
  }
};
