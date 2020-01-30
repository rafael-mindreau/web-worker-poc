import Controls from 'components/Controls';
import Hero from 'components/Hero';
import publishResult from 'components/TableOfResults';
import calculatePrimes from 'utils/calculatePrimes';
import { START_WORK } from 'constants/constants';
import 'main.css';

let primesToCalculate = 10;

const createSerialWork = () => {
  return calculatePrimes(primesToCalculate, 2);
};

const main = async () => {
  Hero();
  Controls({
    addToMain: () => {
      // Make work on the main UI thread
      const result = createSerialWork();
      publishResult(result, 'sequential');
    },
    addAsSeparate: () => {
      // Make work on a separate thread
      // const primeWorker = new Worker('workers/primeWorker.js');
      // console.log('%cDEBUG', 'background-color: #1962dd; padding: 5px; border-radius: 3px; font-weight: bold; color: white', primeWorker);
      primeWorker.postMessage(START_WORK);
    },
    changePrimesToCalculate: (newValue) => {
      primesToCalculate = newValue;
    },
  });

}

main().then(() => console.log('Started'));
