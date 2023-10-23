export const SIGNUP_MOCK_RESPONSE = {
  hasErrror: false,
  message: 'User created successfully',
  user_id: '5f9d4b0b9d9b4b0017b0e3d0',
  email: 'test@gmail.com',
  username: 'test123',
};

// get current hour
const date = new Date();
const minutes = date.getMinutes();
const str_minutes = minutes.toString();

export const SIGNUP_MOCK_BODY = {
  username: `${str_minutes}.username`,
  firstName: `${str_minutes}.firstName`,
  lastName: `${str_minutes}.lastName`,
  email: `${str_minutes}.email@gmail.com`,
  password: `${str_minutes}.password`,
};
