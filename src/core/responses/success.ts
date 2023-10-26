const OPERATIONS_MESSAGES = {
  index: 'retrieved successfully',
  show: 'retrieved successfully',
  create: 'created successfully',
  update: 'updated successfully',
  delete: 'deleted successfully',
  changeRole: 'role changed successfully',
  login: 'logged in successfully',
};

export const ENTITIES = {
  movie: 'Movie',
  user: 'User',
} as const;

export const SUCCESS_MESSAGES = (
  entity: keyof typeof ENTITIES,
  opt: keyof typeof OPERATIONS_MESSAGES,
) => `${entity}${opt === 'index' ? 's' : ''} ${OPERATIONS_MESSAGES[opt]}`;
