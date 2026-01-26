export const PERMISSIONS = {
  /** USER */
  USERS_VIEW: "view:users",
  USERS_CREATE: "create:users",
  USERS_UPDATE: "update:users",
  USERS_DELETE: "delete:users",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
