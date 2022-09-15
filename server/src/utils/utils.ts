const randomError = 10;

function generateError(): boolean {
  return Math.floor(Math.random() * randomError) == 0;
}

// add the code below
export { generateError };