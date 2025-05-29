enum RolesUser {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

enum ViableUserInformation {
  none = 'NONE',
  email = 'EMAIL',
  phoneNumber = 'PHONE_NUMBER',
  avatar = 'AVATAR',
  bio = 'BIO',
  lastSeen = 'LAST_SEEN',
}

enum GenderUser {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

interface Cloudinary {
  uri: string;
  public_id: string;
}

export { Cloudinary, RolesUser, GenderUser, ViableUserInformation };
