type IMovement = {
  id: string;
  title: string;
  description?: string;
  tip?: string;
  imageUrl?: string;
  videoUrl?: string;
  bodyPartId?: string;
  subBodyPartId?: string;
  isChecked?: boolean;
};

type IBodyPart = {
  id: string;
  name: string;
  pictureUrl: string;
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
  id?: string;
  movementId: string;
  subProgrammeId?: string;
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
  movementId?: string;
  movementSets: IWorkoutSets[];
  movementName?: string;
};

type IWorkoutLog = {
  workoutId: string;
  workoutDate: string;
  workoutTime: number;
  workoutName: string;
};

type IUserMeasurements = {
  metricId: string;
  bodyMetricsId: string;
  metricName: string;
  value: string;
  color?: string;
  color2?: string;
};

type IUserMetricLog = {
  createdDate: Date;
  value: number;
  metricName: string;
  metricId: string;
};

type ISubBodyPart = {
  id: string;
  name: string;
  bodyPartId: string;
};

type IAddExerciseModel = {
  programmeName: string;
  subProgramme: ISubProgrammeAddModel[];
};

type ISubProgrammeAddModel = {
  id: number;
  subProgrammeName: string;
  subProgrammeMovements: ISubProgrammeMovement[];
};

type IUser = {
  id: string;
  email: string;
  username: string;
  token: string;
  loginDate: string;
};
