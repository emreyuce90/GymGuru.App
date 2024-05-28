type IMovement = {
  id: string;
  title: string;
  description?: string;
  tip?: string;
  imageUrl?: string;
  videoUrl?: string;
  bodyPartId?: string;
};

type IBodyPart = {
  id: string;
  name: string;
};

type IProgramme = {
  id: string;
  name: string;
  userId?: string;
};

type ISubProgramme = {
  id: string;
  name: string;
  programmeId: number;
};

type ISubProgrammeMovement = {
  id: string;
  movementId: string;
  subProgrammeId: string;
  sets: number;
  reps: number;
  movement: IMovement;
};

type IWorkoutSets = {
  setNumber: number;
  reps: number;
  weight: number;
  checked: boolean;
};

type IWorkout = {
  movementId: string;
  movementSets: IWorkoutSets[];
  movementName?: string;
};
