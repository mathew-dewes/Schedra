// Generate NZ-style vehicle plates
// Example: LJT597

function generateVehiclePlate() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const randomLetters = Array.from({ length: 3 }, () =>
    letters[Math.floor(Math.random() * letters.length)]
  ).join("");

  const randomNumbers = Math.floor(100 + Math.random() * 900);

  return `${randomLetters}${randomNumbers}`;
}

// Generate 100 unique vehicle plates
function generateVehiclePlates(amount = 100) {
  const plates = new Set();

  while (plates.size < amount) {
    plates.add(generateVehiclePlate());
  }

  return Array.from(plates);
}

// Generate NZ-style mobile numbers
// Example: 0211234567

function generatePhoneNumber() {
  const remainingDigits = Math.floor(
    1000000 + Math.random() * 9000000
  );

  return `021${remainingDigits}`;
}

// Generate 10 unique phone numbers
function generatePhoneNumbers(amount = 10) {
  const phoneNumbers = new Set();

  while (phoneNumbers.size < amount) {
    phoneNumbers.add(generatePhoneNumber());
  }

  return Array.from(phoneNumbers);
}

// Example usage

export const vehiclePlates = generateVehiclePlates(100);
export const phoneNumbers = generatePhoneNumbers(10);

console.log(vehiclePlates);
console.log(phoneNumbers);