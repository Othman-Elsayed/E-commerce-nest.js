enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  VENDOR = 'vendor',
  CUSTOMER = 'customer',
  MANGER = 'manger',
  USER = 'user',
}
enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
interface UserAvatar {
  public_id: string;
  url: string;
}

export { UserRole, UserAvatar, UserGender };
