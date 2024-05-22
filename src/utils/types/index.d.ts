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
};

/*
  Users
  Id,Name,Surname,DateofBirth,Mobile,username,password,passwordSalt,MembershipStartDate,MembershipEndDate
  
  BodyParts
  Id,Name

  Movements 
  Id,Title,Description,Trick,videoUrl,pictureUrl,bodyPartId

  Programlar
  Id,UserId,Name

  Workouts
  Id,ProgramId,Name


  MovementsProgram Tablosu
  Id,MovementId,ProgramId,Sets,Reps

  Metrics
  Id,Name,UserId
  
*/
