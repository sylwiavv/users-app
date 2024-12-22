  import { useSignInUser } from "./useSignInUser";

export function generateToken() {
    const now = new Date();
  
    const milliseconds = now.getMilliseconds().toString();
    const seconds = now.getSeconds().toString();
    const minutes = now.getMinutes().toString();
    const hours = now.getHours().toString();
    const day = now.getDate().toString();
    const month = (now.getMonth() + 1).toString();
    const year = now.getFullYear().toString();
  
    const randomLetters = Array(5)
      .fill(null)
      .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
      .join("");
  
    const components = [milliseconds, seconds, minutes, hours, day, month, year, randomLetters];
    const shuffledComponents = components
      .sort(() => Math.random() - 0.5)
      .join("");
  
    return shuffledComponents;
  }

const useGenerateToken = () => {
    const {getGeneratedSignInToken} = useSignInUser();
     const generateVerificationToken = async () => {

        // TODO: logic to remove token when user is logg or logg out
    }
}