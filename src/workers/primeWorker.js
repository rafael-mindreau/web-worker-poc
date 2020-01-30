import { START_WORK } from '../constants/constants';

onmessage = (message) => {
  console.log('%cDEBUG', 'background-color: #27a24d; padding: 5px; border-radius: 3px; font-weight: bold; color: white', message);
  if (message === START_WORK) {
  }
};
