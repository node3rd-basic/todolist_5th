class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = "MyError";
  }
}

try {
  const a = 10;
  const b = 20;
  console.log(a + b);
  throw new Error("not_error!");
} catch (err) {
  if (err) {
    if (err instanceof MyError) {
      console.log(0);
    } else {
      throw err;
    }
  }
}

try {
  const a = 10;
  const b = 20;
  console.log(a + c);
  throw new Error("not_error!");
} catch (err) {
  console.log(err);
}
