type IWorkout = {
  title: string;
  description: string;
  icon?: string;
  bodyPartId?: number;
};

type IBodyPart = {
  id: number;
  name: string;
};
