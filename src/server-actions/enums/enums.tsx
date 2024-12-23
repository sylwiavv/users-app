const IS_PRODUCTION = process.env.NODE_ENV === "production";
const PRODUCTION_API = "https://users-app-backend.vercel.app/";
const DEVELOPMNENT_API = `http://localhost:9000/`;

export const API_URL = {
  MANAGER: IS_PRODUCTION
    ? `${PRODUCTION_API}managers`
    : `${DEVELOPMNENT_API}managers`,

  USER: IS_PRODUCTION
   ? `${PRODUCTION_API}users` 
   : `${DEVELOPMNENT_API}users`,

  SIGNED_IN_USERS: IS_PRODUCTION
    ? `${PRODUCTION_API}usersSignInData`
    : `${DEVELOPMNENT_API}usersSignInData`,
    
  SIGN_IN_USERS_TOKEN: IS_PRODUCTION
    ? `${PRODUCTION_API}signin`
    : `${DEVELOPMNENT_API}signin`,

  BCRYPT_GENERATE_PASSWORD:
    "https://www.toptal.com/developers/bcrypt/api/generate-hash.json",
  BCRYPT_CHECK_PASSWORD:
    "https://www.toptal.com/developers/bcrypt/api/check-password.json",
};
