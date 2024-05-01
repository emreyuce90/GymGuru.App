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
