export const ROLES = {
  admin: 'Administrador',
  regularUser: 'Usuario Regular',
} as const;

export type RolesTypes = (typeof ROLES)[keyof typeof ROLES];
