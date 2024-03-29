import Controls from './components/Controls';
import Hero from './components/Hero';
import StatusBar, { updateWorkloadPill, updatePoolSizePill } from './components/StatusBar';
import { announce, publish } from './components/TableOfResults';
import calculatePrimes from './utils/calculatePrimes';
import { startBenchmark, endBenchmark } from './utils/benchmark';
import PrimeWorker from './workers/prime.worker.js?worker';
import {
  START_WORK,
  CHANGE_WORKLOAD,
  WORK_FINISHED,
  CHANGE_TAG,
  PARALLEL_WORK_TYPE,
  SERIAL_WORK_TYPE,
} from './constants/constants';
import { v4 as uuid } from 'uuid';
import './main.css';

// Amount of primes to search for
let primesToCalculate = 0;

// Pool for workers! Workers are eager to swim in this pool!
const pool = {};

// Entry point for the app
const main = async () => {
  // Here we draw several components and define what they can do
  Hero();
  Controls({
    addToMain: () => {
      // Make work on the main UI thread
      const id = uuid();
      announce(id, SERIAL_WORK_TYPE);

      // We delay the actual work so that the rendering for the announced item can happen first
      // The UI would otherwise block before seeing the announced job
      setTimeout(() => {
        startBenchmark();
        const result = calculatePrimes(primesToCalculate, 2);
        const time = endBenchmark();
        publish(id, result, time);
      }, 500);
    },
    addAsSeparate: () => {
      // Make work on a separate thread
      // Create a new Worker
      const primeWorker = new PrimeWorker();
      primeWorker.postMessage({ message: CHANGE_WORKLOAD, payload: primesToCalculate });

      const id = uuid();
      announce(id, PARALLEL_WORK_TYPE);
      primeWorker.postMessage({ message: CHANGE_TAG, payload: id });
      primeWorker.postMessage({ message: START_WORK });
      pool[id] = { id, worker: primeWorker };

      // When a worker has something to say, we listen in on it here
      primeWorker.onmessage = ({ data: { message, payload: { primes: result, id, time } } }) => {
        if (message === WORK_FINISHED) {
          publish(id, result, time);
          primeWorker.terminate();
          delete pool[id];
          updatePoolSizePill(Object.keys(pool).length);
        }
      };

      updatePoolSizePill(Object.keys(pool).length);
    },
    changePrimesToCalculate: (newValue) => {
      // Handler for changing the workload
      primesToCalculate = newValue;

      // Change workload for all workers in the pool
      Object.keys(pool).forEach((workerId) => {
        const worker = pool[workerId];
        worker.postMessage({ message: CHANGE_WORKLOAD, payload: primesToCalculate });
      });

      updateWorkloadPill(primesToCalculate);
    },
  });
  StatusBar({
    initialPoolSize: Object.keys(pool).length,
    initialWorkload: primesToCalculate,
  });
}

main();
