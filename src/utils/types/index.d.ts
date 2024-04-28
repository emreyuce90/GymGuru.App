type IMovement = {
  id: number;
  title: string;
  description?: string;
  icon?: string;
  bodyPartId?: number;
  video?: string;
  sets?: number;
  reps?: number;
};

type IBodyPart = {
  id: number;
  name: string;
};

type IProgramme = {
  id: number;
  name: string;
  userId?: string;
};

type ISubProgramme = {
  id: number;
  name: string;
  programmeId: number;
};

type ISubProgrammeMovement = {
  id: number;
  subProgrammeId: number;
  title: string;
  sets: number;
  reps: number;
  image: string;
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
