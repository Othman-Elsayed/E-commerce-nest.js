enum RolesUser {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

interface VisibleInfo {
  email: boolean;
  phoneNumber: boolean;
  avatar: boolean;
  bio: boolean;
  age: boolean;
  address: boolean;
  lastSeen: boolean;
}

enum GenderUser {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NONE = 'NONE',
}

interface Cloudinary {
  uri: string;
  public_id: string;
}

interface FindOne {
  filter: any;
  populate?: any;
  select?: string;
  failedMsg?: string;
}

interface EditOne {
  filter: any;
  payload: any;
  populate?: any;
  select?: string;
  failedMsg?: string;
}

enum UserFieldLimits {
  minName = 3,
  maxName = 200,
  minEmail = 3,
  maxEmail = 200,
  minUsername = 2,
  maxUsername = 200,
  minPassword = 2,
  maxPassword = 200,
  maxAddress = 300,
  maxPhone = 11,
  minAge = 18,
  maxAge = 100,
}

export {
  Cloudinary,
  FindOne,
  EditOne,
  RolesUser,
  UserFieldLimits,
  GenderUser,
  VisibleInfo,
};
