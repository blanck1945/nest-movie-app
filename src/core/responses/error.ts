const OPERATIONS_MESSAGES = {
  notFound: 'Record not found.',
  unauthorized: 'Unauthorized.',
  badRequest: 'Bad request.',
  invalidCredentials: 'Invalid credentials.',
  somethingWentWrong: 'Something went wrong.',
  emailAlreadyExists: 'Email already exists.',
};

export const ERROR_MESSAGES = (opt: keyof typeof OPERATIONS_MESSAGES) =>
  `${OPERATIONS_MESSAGES[opt]}`;
