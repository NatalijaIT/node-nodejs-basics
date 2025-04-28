const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    process.on('message', (n) => {
      const result = nthFibonacci(n);
      process.send(result);
    });
};

sendResult();
