import client from "./client";

const domain = process.env.REACT_APP_DOMAIN;
const loginUrl = domain+'/auth/login';
const registerUrl = domain+'/auth/register';

export const loginUser = (userDetails) =>
  client.apiPostClient.post(
    loginUrl,
    { ...userDetails },
    { headers: { "Content-Type": "application/json" } }
  );

export const registerUser = (userDetails) => //console.log('register User', userDetails)
  client.apiPostClient.post(
    registerUrl,
    { ...userDetails },
    { headers: { "Content-Type": "application/json" } }
  );

//export default { loginUser, registerUser };
