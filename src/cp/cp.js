import { spawn } from 'child_process';
import path from 'path';

const spawnChildProcess = async (args) => {
  const scriptPath = path.resolve('files', 'script.js');

  try {
    const child = spawn('node', [scriptPath, ...args], {
      stdio: ['pipe', 'pipe', 'inherit', 'ipc']
    });

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(process.stdout);

    child.on('error', (err) => {
      throw new Error('Failed to spawn child process');
    });

    child.on('exit', (code) => {
      console.log(`Child process exited with code ${code}`);
    });

  } catch (err) {
    console.error('FS operation failed');
  }
};

await spawnChildProcess('Hello World!');
