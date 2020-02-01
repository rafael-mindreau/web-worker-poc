let startTime = 0;
let endTime = 0;

const getMillis = () => {
  return (new Date).getTime();
}

export const startBenchmark = () => {
  startTime = getMillis();
};

export const endBenchmark = () => {
  endTime = getMillis();
  return (endTime - startTime) / 1000;
};
