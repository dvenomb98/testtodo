import { Difficulty, Status, Ranks } from "./enums";

export const getStatusColor = (status: string) => {
  if (status === Status.Active) {
    return "text-primary-gray";
  } else if (status === Status.Progress) {
    return "text-primary-green";
  } else if (status === Status.Completed) {
    return "text-primary-amber";
  }
};

export const getDifficultyColor = (difficulty: string) => {
  if (difficulty === Difficulty.Low) {
    return "bg-primary-green";
  } else if (difficulty === Difficulty.Medium) {
    return "bg-primary-amber";
  } else if (difficulty === Difficulty.Hard) {
    return "bg-primary-red";
  }
};

export const getDifficultyTextColor = (difficulty: string) => {
  if (difficulty === Difficulty.Low) {
    return "text-green-400";
  } else if (difficulty === Difficulty.Medium) {
    return "text-orange-400";
  } else if (difficulty === Difficulty.Hard) {
    return "text-red-400";
  }
};

export const getXp = (difficulty: string, multipler: number) => {
  if (difficulty === Difficulty.Low) {
    return 15 * multipler
  } else if (difficulty === Difficulty.Medium) {
    return 25 * multipler
  } else if (difficulty === Difficulty.Hard) {
    return 40 * multipler
  }
};

export const getCoins = (difficulty: string, multipler: number) => {
  if (difficulty === Difficulty.Low) {
    return 50 * multipler;
  } else if (difficulty === Difficulty.Medium) {
    return 75 * multipler;
  } else if (difficulty === Difficulty.Hard) {
    return 125 * multipler;
  }
};

export const getEditedString = (string: string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

// SWITCH < IF/ELSE IF
export const getRanks = (level: number) => {
  if (level <= 4) return Ranks.Newbie;
  else if (level >= 5 && level <= 10) return Ranks.Iron;
  else if (level >= 11 && level <= 15) return Ranks.Bronze;
  else if (level >= 16 && level <= 20) return Ranks.Silver;
  else if (level >= 21 && level <= 30) return Ranks.Gold;
  else if (level >= 31 && level <= 40) return Ranks.Platinum;
  else if (level >= 41 && level <= 50) return Ranks.Diamond;
  else if (level >= 51 && level <= 60) return Ranks.Master;
  else if (level >= 61 && level <= 79) return Ranks.Grandmaster;
  else if (level >= 80) return Ranks.Challenger;
};

export const levelsForRank = [
  {
    rank: Ranks.Newbie,
    level: 0,
  },
  {
    rank: Ranks.Iron,
    level: 11,
  },
  {
    rank: Ranks.Silver,
    level: 16,
  },
  {
    rank: Ranks.Gold,
    level: 21,
  },
  {
    rank: Ranks.Platinum,
    level: 31,
  },
  {
    rank: Ranks.Diamond,
    level: 41,
  },
  {
    rank: Ranks.Master,
    level: 51,
  },
  {
    rank: Ranks.Grandmaster,
    level: 61,
  },
  {
    rank: Ranks.Challenger,
    level: 80,
  },
];
