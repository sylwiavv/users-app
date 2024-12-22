import { useCallback } from 'react';

const useCreateIUniqued = () => {
  const generateId = useCallback((): string => {
    const now = new Date();

    const day = now.getDate().toString().padStart(2, '0'); 
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear(); 
    const hours = now.getHours().toString().padStart(2, '0'); 
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0'); 
    const millisecond = now.getMilliseconds().toString().padStart(3, '0');

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array.from({ length: 4 }, () => alphabet.charAt(Math.floor(Math.random() * alphabet.length))).join('');

    const datePart = `${year}${month}${day}${millisecond}${hours}${minutes}${seconds}`;
    const mixedArray = shuffleArray(datePart + randomLetters);

    return mixedArray.join('');
  }, []);

  const shuffleArray = (str: string): string[] => {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];  // Zamiana miejscami
    }
    return arr;
  };

  return { generateId };
};

export {useCreateIUniqued};
