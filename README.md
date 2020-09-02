# Dedicated Worker Demo

![image](https://user-images.githubusercontent.com/1874332/73597537-444d8f80-452d-11ea-93c1-86d2f15a8ff2.png)

## Try it out
https://rafael-mindreau.github.io/web-worker-poc/

## Dedicated Workers
Dedicated Web Workers allow you to delegate some work to **a separate thread** instead of the main thread. This allows us to run JavaScript code **multi-threaded.**

This is useful when you have a computationally heavy task which you want to run. Normally you would run this on the main thread, **but there it can actually block the UI** (as this also lives on the main thread). Delegating heavy duty work to another thread allows the user to use an app **without being interrupted.**

![image](https://user-images.githubusercontent.com/1874332/73597578-94c4ed00-452d-11ea-97ae-38bd976be252.png)

## Conclusion
It is rather straight-forward to delegate some work to a Worker. By spawning multiple concurrent workers it's possible to get more work done than was possible on the main thread. An ugly side-effect of running heavy tasks on the main thread is that it locks up the UI from being rendered until the work was finished. So the main benefits are:

> ✅ Better user experience (app still reacts to user input)

> ✅ You can truly run concurrent tasks (on multiple threads)

> ✅ It's fully supported! https://caniuse.com/#search=web%20worker

> 🚫 A Worker cannot directly access DOM, all work needs to be messaged back to the caller on the main thread, and this requires some management.

Another observation was that off-the-main-thread Workers appeared to do the specific task of calculating primes much faster than the same work being performed on the main UI thread. This is possibly because of other work being performed there.
