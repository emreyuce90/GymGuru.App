// export const movements: IMovement[] = [
//   {
//     id: 1,
//     title: "Flat Bench Press",
//     description: "Düz sehpada barı göğüse indirip kaldır.",
//     bodyPartId: 1,
//     video: "https://youtu.be/VmB1G1K7v94?si=2T1-fau279qBIRJh",
//     icon: "https://static.strengthlevel.com/images/exercises/dumbbell-bench-press/dumbbell-bench-press-800.jpg",
//   },
//   {
//     id: 2,
//     title: "Incline Bench Press",
//     description: "Yukarı Eğimli sehpada barı göğüse indirip kaldır",
//     bodyPartId: 1,
//     icon: "https://w7.pngwing.com/pngs/616/270/png-transparent-bench-press-barbell-dumbbell-pectoralis-major-barbell-physical-fitness-fitness-professional-arm-thumbnail.png",
//   },
//   {
//     id: 3,
//     title: "Decline Bench Press",
//     description: "Aşağı eğimli sehpada barı göğüse indirip kaldır.",
//     bodyPartId: 1,
//   },
//   {
//     id: 4,
//     title: "Chest Press",
//     description: "Makinada göğüs press",
//     bodyPartId: 1,
//   },
//   {
//     id: 5,
//     title: "Flat Dumbbell Bench Press",
//     description: "Düz sehpada dumbell'ı göğüse indirip kaldır.",
//     bodyPartId: 1,
//   },
//   {
//     id: 6,
//     title: "Incline Dumbbell Bench Press",
//     description: "Yukarı eğimli sehpada dumbell'ı göğüse indirip kaldır.",
//     bodyPartId: 1,
//   },
//   {
//     id: 7,
//     title: "Decline Dumbbell Bench Press",
//     description: "Aşağı eğimli sehpada dumbell'ı göğüse indirip kaldır.",
//     bodyPartId: 1,
//   },
//   {
//     id: 8,
//     title: "Pec Dec Fly",
//     description: "Makinada göğüs yana açış.",
//     bodyPartId: 1,
//   },
//   {
//     id: 9,
//     title: "Flat Dumbbell Fly",
//     description: "Düz sehpada dumbell ile yana açış.",
//     bodyPartId: 1,
//   },
//   {
//     id: 10,
//     title: "Incline Dumbbell Fly",
//     description: "Yukarı eğimli sehpada dumbell ile yana açış.",
//     bodyPartId: 1,
//   },
//   {
//     id: 11,
//     title: "Decline Dumbbell Fly",
//     description: "Aşağı eğimli sehpada dumbell ile yana açış.",
//     bodyPartId: 1,
//   },
//   {
//     id: 12,
//     title: "Cable Crossover",
//     description: "Üst Makarada sıkıştırma ve açma hareketi",
//     bodyPartId: 1,
//   },
//   {
//     id: 13,
//     title: "Low Cable Crossover",
//     description: "Alt makarada sıkıştırma ve açma hareketi",
//     bodyPartId: 1,
//   },
//   {
//     id: 14,
//     title: "Push Up",
//     description: "Şınav ",
//     bodyPartId: 1,
//   },
//   {
//     id: 15,
//     title: "Lat Front Pulldown",
//     description: "Sırt makinasında göğüse çekiş",
//     bodyPartId: 2,
//   },
//   {
//     id: 16,
//     title: "Close Grip Pulldown",
//     description: "Sırt makinasında dar ve ters tutarak göğüse çekiş",
//     bodyPartId: 2,
//   },
//   {
//     id: 17,
//     title: "Close Grip Pulldown",
//     description: "Sırt makinasında dar ve ters tutarak göğüse çekiş",
//     bodyPartId: 2,
//   },
//   {
//     id: 18,
//     title: "Close Grip Pulldown",
//     description: "Sırt makinasında dar ve ters tutarak göğüse çekiş",
//     bodyPartId: 2,
//   },
//   {
//     id: 19,
//     title: "Squat",
//     bodyPartId: 3,
//     description: "Barı öne al",
//   },
// ];
// export const bodyPart: IBodyPart[] = [
//   { id: 1, name: "Göğüs" },
//   { id: 2, name: "Sırt" },
//   { id: 3, name: "Bacak" },
//   { id: 4, name: "Omuz" },
//   { id: 5, name: "Pazu" },
//   { id: 6, name: "Arka Kol" },
//   { id: 7, name: "Karın" },
// ];

export const programmes: IProgramme[] = [
  {
    id: 1,
    name: "Full Body",
  },
  {
    id: 2,
    name: "Split 4 Günlük",
  },
  { id: 3, name: "Push & Pull" },
  { id: 4, name: "5x5" },
  {
    id: 5,
    name: "Split 5 Günlük",
  },
];

export const subProgramme: ISubProgramme[] = [
  { id: 1, name: "1.Gün", programmeId: 1 },
  { id: 2, name: "2.Gün", programmeId: 1 },
  { id: 3, name: "3.Gün", programmeId: 1 },
  { id: 4, name: "1.Gün", programmeId: 2 },
  { id: 5, name: "2.Gün", programmeId: 2 },
  { id: 6, name: "3.Gün", programmeId: 2 },
  { id: 7, name: "4.Gün", programmeId: 2 },
  { id: 8, name: "A", programmeId: 3 },
  { id: 9, name: "B", programmeId: 3 },
  { id: 10, name: "A", programmeId: 3 },
  { id: 11, name: "1.Gün", programmeId: 5 },
  { id: 12, name: "2.Gün", programmeId: 5 },
  { id: 13, name: "3.Gün", programmeId: 5 },
  { id: 14, name: "4.Gün", programmeId: 5 },
  { id: 15, name: "5.Gün", programmeId: 5 },
];

export const subProgrammeMovements: ISubProgrammeMovement[] = [
  {
    id: 1,
    title: "Incline Bench Press",
    image:
      "https://w7.pngwing.com/pngs/616/270/png-transparent-bench-press-barbell-dumbbell-pectoralis-major-barbell-physical-fitness-fitness-professional-arm-thumbnail.png",
    reps: 15,
    sets: 3,
    subProgrammeId: 1,
  },
  {
    id: 2,
    subProgrammeId: 1,
    title: "Incline Bench Press",
    image:
      "https://w7.pngwing.com/pngs/616/270/png-transparent-bench-press-barbell-dumbbell-pectoralis-major-barbell-physical-fitness-fitness-professional-arm-thumbnail.png",
    reps: 15,
    sets: 3,
  },
  {
    id: 3,
    subProgrammeId: 2,
    title: "Incline Bench Press",
    image:
      "https://w7.pngwing.com/pngs/616/270/png-transparent-bench-press-barbell-dumbbell-pectoralis-major-barbell-physical-fitness-fitness-professional-arm-thumbnail.png",
    reps: 15,
    sets: 3,
  },
];
