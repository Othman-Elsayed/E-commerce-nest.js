enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

enum PrivacySetting {
  PUBLIC = 'PUBLIC',
  FRIENDS_ONLY = 'FRIENDS_ONLY',
  PRIVATE = 'PRIVATE',
}

const ROLES_KEY = 'roles';

export { Roles, PrivacySetting, ROLES_KEY };
