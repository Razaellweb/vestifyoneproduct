export type Role = "ADMIN" | "USER";

export function can(role: Role, action: string): boolean {
  if (role === "ADMIN") return true;
  const userPermissions = new Set<string>([
    "wallet:read",
    "savings:create",
    "investment:read",
  ]);
  return userPermissions.has(action);
}
