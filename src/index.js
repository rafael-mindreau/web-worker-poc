import Controls from 'components/Controls';
import Hero from 'components/Hero';
import publishResult from 'components/TableOfResults';
import calculatePrimes from 'utils/calculatePrimes';
import PrimeWorker from 'workers/prime.worker.js';
import { START_WORK, CHANGE_WORKLOAD, WORK_FINISHED } from 'constants/constants';
import 'main.css';

// Amount of primes to search for
let primesToCalculate = 10;

// Initialize a Worker (= 1 extra separate thread we can use!)
const primeWorker = new PrimeWorker();
primeWorker.postMessage({ message: CHANGE_WORKLOAD, payload: primesToCalculate });

// Start work for the main thread
const createSerialWork = () => {
  return calculatePrimes(primesToCalculate, 2);
};

// Entry point for the app
const main = async () => {
  // Here we draw several components and define what they can do
  Hero();
  Controls({
    addToMain: () => {
      // Make work on the main UI thread
      const result = createSerialWork();
      publishResult(result, 'sequential');
    },
    addAsSeparate: () => {
      // Make work on a separate thread
      primeWorker.postMessage({ message: START_WORK });
    },
    changePrimesToCalculate: (newValue) => {
      // Handler for changing the workload
      primesToCalculate = newValue;
      primeWorker.postMessage({ message: CHANGE_WORKLOAD, payload: primesToCalculate });
    },
  });
}

// When the PrimeWorker has something to say, we listen in on it here
primeWorker.onmessage = ({ data: { message, payload: result } }) => {
  if (message === WORK_FINISHED) {
    publishResult(result, 'parallel');
  }
};
