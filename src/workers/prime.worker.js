import {
  START_WORK,
  CHANGE_WORKLOAD,
  WORK_FINISHED,
  CHANGE_TAG,
} from '../constants/constants';
import calculatePrimes from '../utils/calculatePrimes';
import { startBenchmark, endBenchmark } from '../utils/benchmark';

let workload = 0;
let id = 'untagged';

onmessage = ({ data: { message, payload } }) => {
  // Console log for shits and giggles
  console.log('%cWORKER MESSAGE IN', 'background-color: #27a24d; padding: 5px; border-radius: 3px; font-weight: bold; color: white', message, payload);

  // We capture several message types and perform the appropriate work per case

  if (message === START_WORK) {
    startBenchmark();
    const primes = calculatePrimes(workload, 2);
    const time = endBenchmark();
    postMessage({ message: WORK_FINISHED, payload: { primes, id, time } });
  }

  if (message === CHANGE_WORKLOAD) {
    workload = payload;
  }

  if (message === CHANGE_TAG) {
    id = payload;
  }
};
