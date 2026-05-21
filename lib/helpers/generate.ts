
// function generateVehiclePlate() {
//   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//   const randomLetters = Array.from({ length: 3 }, () =>
//     letters[Math.floor(Math.random() * letters.length)]
//   ).join("");

//   const randomNumbers = Math.floor(100 + Math.random() * 900);

//   return `${randomLetters}${randomNumbers}`;
// }

// function generateVehiclePlates(amount = 100) {
//   const plates = new Set();

//   while (plates.size < amount) {
//     plates.add(generateVehiclePlate());
//   }

//   return Array.from(plates);
// }


// function generatePhoneNumber() {
//   const remainingDigits = Math.floor(
//     1000000 + Math.random() * 9000000
//   );

//   return `021${remainingDigits}`;
// }

// function generatePhoneNumbers(amount = 10) {
//   const phoneNumbers = new Set();

//   while (phoneNumbers.size < amount) {
//     phoneNumbers.add(generatePhoneNumber());
//   }

//   return Array.from(phoneNumbers);
// };

export function randomNumber(min: number, max:  number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export function generateDueDate() {
  const rand = Math.random();

  const date = new Date();

  // overdue
  if (rand < 0.15) {
    date.setDate(date.getDate() - randomNumber(1, 90));
    return date;
  }

  // due soon
  if (rand < 0.30) {
    date.setDate(date.getDate() + randomNumber(0, 7));
    return date;
  }

  // future
  date.setDate(date.getDate() + randomNumber(8, 365));

  return date;
};

export function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
};

export function generateRandomDate(): Date {
    const now = new Date();
    const offset = Math.floor(Math.random() * 180);
    now.setDate(now.getDate() + offset);
    return now;
}
