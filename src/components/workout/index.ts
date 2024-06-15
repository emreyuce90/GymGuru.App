export const filterDataToSend = (data: IWorkout[]) => {
  return data
    .map((workout: IWorkout) => {
      return {
        movementId: workout.movementId,
        movementSets: workout.movementSets.filter((ms) => ms.checked === true),
      };
    })
    .filter((m) => m.movementSets.length > 0);
};

export const convertToWorkoutMovementAddDto = (workouts: IWorkout[]) => {
  return workouts.map((workout) => ({
    MovementId: workout.movementId,
    MovementSetDtos: workout.movementSets.map((set) => ({
      SetNumber: set.setNumber,
      Reps: set.reps,
      Weight: set.weight,
    })),
  }));
};

export const isAllMovementsOk = (workouts: IWorkout[]): boolean => {
  const falseCheckeds = workouts.some((w) =>
    w.movementSets.find((ms) => ms.checked === false)
  );
  if (falseCheckeds) {
    return false;
  } else {
    return true;
  }
};
export const finishedSetCounts = (workouts: IWorkout[]): number => {
  const setCounts = workouts.reduce((acc, current: IWorkout) => {
    let sets = current.movementSets.filter((ms) => ms.checked === true).length;
    return (acc += sets);
  }, 0);

  return setCounts;
};

export const unFinishedSetCounts = (workouts: IWorkout[]): number => {
  const setCounts = workouts.reduce((acc, current: IWorkout) => {
    let sets = current.movementSets.filter((ms) => ms.checked === false).length;
    return (acc += sets);
  }, 0);

  return setCounts;
};

export const findMovementName = (
  data: IWorkout[],
  subProgrammeMovements: ISubProgrammeMovement[]
) => {
  return data.map((w: IWorkout) => {
    return {
      movementId: w.movementId,
      movementName: subProgrammeMovements.find(
        (sp) => sp.movementId === w.movementId
      )?.movement.title,
      movementSets: w.movementSets,
    };
  });
};

export const calculateVolume = (data: IWorkout[]): number => {
  return data.reduce((total, movement) => {
    const movements = movement.movementSets.reduce((subTotal, set) => {
      return (subTotal += set.reps * set.weight);
    }, 0);
    return total + movements;
  }, 0);
};

// export const isSameWorkout = (
//   data1: ISubProgrammeMovement[],
//   data2: ISubProgrammeMovement[]
// ): boolean => {
//   console.log("original data", data1);
//   console.log("new data", data2);
//   return false;
// };

export const isSameWorkout = (
  array1: ISubProgrammeMovement[],
  array2: ISubProgrammeMovement[]
) => {
  if (array1.length !== array2.length) return false;

  let sortedArray1 = array1
    .slice()
    .sort((a, b) => a.movementId.localeCompare(b.movementId));
  let sortedArray2 = array2
    .slice()
    .sort((a, b) => a.movementId.localeCompare(b.movementId));

  for (let i = 0; i < sortedArray1.length; i++) {
    let obj1 = sortedArray1[i];
    let obj2 = sortedArray2[i];

    // Belirtilen alanları karşılaştırma
    if (
      obj1.movementId !== obj2.movementId ||
      obj1.sets !== obj2.sets ||
      obj1.reps !== obj2.reps
    ) {
      return false;
    }
  }

  return true;
};
