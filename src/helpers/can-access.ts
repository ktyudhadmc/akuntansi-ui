import type { Permission } from "@constants/permissions";

interface User {
  permissions: Permission[];
}

export function canAccess(user: User, permission: Permission): boolean {
  return user.permissions.includes(permission);
}
