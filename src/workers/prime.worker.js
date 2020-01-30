import { START_WORK, CHANGE_WORKLOAD, WORK_FINISHED } from '../constants/constants';
import calculatePrimes from '../utils/calculatePrimes';

let workload = 0;

onmessage = ({ data: { message, payload } }) => {
  // Console log for shits and giggles
  console.log('%cSTARTING WORK', 'background-color: #27a24d; padding: 5px; border-radius: 3px; font-weight: bold; color: white', message, payload);

  // We capture several message types and perform the appropriate work per case

  if (message === START_WORK) {
    const primes = calculatePrimes(workload, 2);
    postMessage({ message: WORK_FINISHED, payload: primes });
  }

  if (message === CHANGE_WORKLOAD) {
    workload = payload;
  }
};
