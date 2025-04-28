import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';

const performCalculations = async () => {
  const workerPath = path.resolve('files', 'worker.js');
  const numCPUs = os.cpus().length;
  const workers = [];

  for (let i = 0; i < numCPUs; i++) {
    const workerData = 10 + i;

    const workerPromise = new Promise((resolve) => {
      const worker = new Worker(workerPath);

      worker.postMessage(workerData);

      worker.on('message', (result) => {
        resolve({ status: 'resolved', data: result });
      });

      worker.on('error', () => {
        resolve({ status: 'error', data: null });
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });
    });

    workers.push(workerPromise);
  }

  const settledResults = await Promise.all(workers);

  console.log(settledResults);
};

performCalculations();
