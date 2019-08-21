export const BATCH_UPDATE_REQ = {
  NEW: 0,
  HEAD_INSTRUCTOR: 1,
  STUDENTS: 2,
  ANNOUNCEMENTS: 4,
  CLASSES: 8,
  DRILLS: 16,
  ACTIVE: 32,
  SLOTS: 64
};

export const SPORT = {
  INVALID: 0,
  BADMINTON: 1,
  VOLLEYBALL: 2,
  FOOTBALL: 3,
};

export const USER_UPDATE_REQ = {
  NEW: 0,
  // Parent/Student/Instructor
  THUMBNAIL: 1,
  COMMUNITY: 2,
  // Parent
  CHILDREN: 4,
  // Student/Instructor
  CURR_BATCHES: 8,
  PAST_BATCHES: 16,
  // Instructor
  HEAD: 32
};

export const GENDER = {
  INVALID: 0,
  MALE: 1,
  FEMALE: 2,
};

export const CLASS_UPDATE_REQ = {
  NEW: 0,
  TIMING: 1,
  INSTRUCTOR: 2,
  STUDENTS: 4,
  DRILLS: 8,
  IMAGES: 16,
  STATS: 32
};

export const DAY = {
  NONE: 0,
  SUN: 1,
  MON: 2,
  TUE: 3,
  WED: 4,
  THU: 5,
  FRI: 6,
  SAT: 7,
};

export const COMMUNITY_UPDATE_REQ = {
  NEW: 0,
  FACILITIES: 1,
  BATCHES: 2,
  MEMBERS: 4,
};

export const FACILITY_UPDATE_REQ = {
  NEW: 0,
  DESCRIPTION: 1,
  IMAGES: 2,
};

export const OPERATION = {
  OVERWRITE: 'Overwrite',
  ADD: 'Add',
  DELETE: 'Del'
};
