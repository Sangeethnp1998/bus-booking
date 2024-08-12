export function getSeats() {
  const lowerDeckSeats = [];
  const upperDeckSeats = [];

  let start = 0;
  let index = 0;
  let counter = 0;
  let i = 0;

  while (i < 18) {
    if (counter === 4) {
      start++;
      counter = 0;
    }
    index = start + counter * 6;
    lowerDeckSeats[index] = counter === 2 ? null : `L${i + 1}`;
    upperDeckSeats[index] = counter === 2 ? null : `U${i + 1}`;
    if (counter !== 2) {
      i++;
    }
    counter++;
  }

  return { lowerDeckSeats, upperDeckSeats };
}

export default getSeats;
