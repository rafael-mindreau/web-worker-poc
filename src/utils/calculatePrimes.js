const iterations = 50;
const multiplier = 1000000000;

export default function calculatePrimes(iterations, multiplier) {
  const primes = [];
  for (var i = 0; i < iterations; i++) {
    const candidate = i * (multiplier * Math.random());
    const isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
          // not prime
          isPrime = false;
          break;
       }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}
