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
  array2: IWorkout[]
) => {
  let formattedArray1 = formatSubProgrammeMovement(array1);
  let formattedArray2 = formatIWorkout(array2);

  if (formattedArray1.length !== formattedArray2.length) return false;

  let sortedArray1 = formattedArray1
    .slice()
    .sort((a, b) => a.movementId.localeCompare(b.movementId));
  let sortedArray2 = formattedArray2
    .slice()
    .sort((a, b) => a.movementId.localeCompare(b.movementId));

  for (let i = 0; i < sortedArray1.length; i++) {
    let obj1 = sortedArray1[i];
    let obj2 = sortedArray2[i];

    // Belirtilen alanları karşılaştırma
    if (obj1.movementId !== obj2.movementId || obj1.sets !== obj2.sets) {
      return false;
    }
  }

  return true;
};

export const formatSubProgrammeMovement = (data: ISubProgrammeMovement[]) => {
  return data.map((d: ISubProgrammeMovement) => {
    return { movementId: d.movementId, sets: d.sets };
  });
};

const formatIWorkout = (data: IWorkout[]) => {
  const filteredData: IWorkout[] = data.filter((d: IWorkout) => {
    return d.movementSets.every((x) => x.checked === true);
  });

  return filteredData.map((d: IWorkout) => {
    return {
      movementId: d.movementId,
      sets: d.movementSets.length,
    };
  });
};

export const formatSubProgrammeMovementFetch = (data: IWorkout[]) => {
  return data.map((d: IWorkout) => {
    return { movementId: d.movementId, sets: d.movementSets.length, reps: 8 };
  });
};

export const movementIds = (data: ISubProgrammeMovement[]) => {
  return data.map((sp: ISubProgrammeMovement) => {
    return sp.movementId;
  });
};
