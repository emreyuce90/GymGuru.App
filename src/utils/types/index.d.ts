type IMovement = {
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

type IProgramme = {
  id: number;
  name: string;
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

  MovementsProgram Tablosu
  Id,MovementId,ProgramId,Sets,Reps

  Metrics
  Id,Name,UserId
  
*/
