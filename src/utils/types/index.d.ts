type IWorkout = {
  id: number;
  title: string;
  description: string;
  icon?: string;
  bodyPartId?: number;
  video?: string;
};

type IBodyPart = {
  id: number;
  name: string;
};
