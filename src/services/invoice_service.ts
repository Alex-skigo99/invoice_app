export function generateID() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = letters.charAt(Math.floor(Math.random() * 26)) + 
                          letters.charAt(Math.floor(Math.random() * 26));
    const randomNumbers = Math.floor(100 + Math.random() * 900); // Generates a 3-digit number from 100 to 999
    return randomLetters + randomNumbers;
};

export const getTotal = (items: any[]) => items.reduce((acc, item) => acc + item.total, 0); // calculate total from items
