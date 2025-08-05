---
title: "DSA Day 4"
date: "May 16, 2025"
status: "release"
readTime: "999+ min read"
tags: "dsa"
---

### Modular Arithmetic

Why?

We do this to bring back the value back to the integer range or the datatype range.

We often see in questions that the result values will be larger and you should divide it by M = 10^9 + 7 = 1000000007.

Why divide by the above M?

If we use above value as M then we will get more random and unique values.

It increases the chances of avoiding collisions.

Example:

5 % 3 = 2

8 % 3 = 2

Notice how we are getting the same result. We use above M value exactly because of this to avoid the collisions.

We will not dive how we come up with current M value. All we should know is that the current M value is the largest prime number.

**Modular Arithmetic Properties:**

1. (a - b) % M
   - (a % M - b % M) % M -- X wrong
   - Why? Here we see that result value goes out of range.
   - To bring back the range to again to [0, M-1], we add M.
   - (a % M - b % M + M) % M -- right
2. (ab) % M
   - (a % M \* b % M) % M -- right
3. (a / b) % M
   - (a % M / b % M) % M -- X wrong
   - (a _ b^-1) % M = (a % M _ b^-1 % M) % M -- correct
   - First refer to inverse modulo then try this formula.

<aside>
💡

Ponder: Euclidean Algo -> HCF, LCM

Extended Euclidean Algo, Inverse Modulo

</aside>

---

**14-05-2025 Contest 100M Question:**

**Count all divisors of N**

Input: N=24 -> 1, 2, 3, 4, 6, 8, 12, 24

Output: 8

**Code Snippet:**

```cpp
int count = 0;
for (int i = 1; i <= N; ++i) {
    if (N % i == 0) {
        count++;
    }
}
return count;
```

---

### Time Complexity and Space Complexity

We often see sometimes in our programs Time Limit Exceeded (TLE) error.

Why TLE?

Code takes too long to run.

Competitive programming systems have time limits. Usually 1-2 seconds.

Machine speed model: 1 GHz CPU.

1 GHz = 10^9 cycles/sec.

Roughly means 10^9 simple instructions/sec. (This is a model, actual depends on instruction).

Look at the `Count divisors` code:

The loop runs N times.

If N = 10^9:

Loop runs 10^9 times.

Instructions approx 10^9 (simple work per loop).

Time approx 10^9 instructions / 10^9 instructions/sec = 1 second.

This is often acceptable within a 1-2 second limit.

BUT, what if N is much larger?

Like if your algorithm needed N up to 10^18 (hypothetical example from notes).

Loop still runs N times.

Instructions approx 10^18.

Time approx 10^18 instructions / 10^9 instructions/sec = 10^9 seconds.

Convert 10^9 seconds:

10^9 seconds is about 31.7 years.

Meaning:

A simple loop that runs N times (Time Complexity O(N)) is fine for N up to around 10^8 or 10^9 on typical systems/limits.

For much larger N, an O(N) solution is too slow. Takes too many instructions.

Leads to TLE.

Need more efficient algorithms.

Need to optimize.

---

now since we know something about optimizations we know that the above system is not efficent if the N becomes very large

how to optmize?

lets again take a look at the question
**Count all divisors of N**

Input: N=24 -> 1, 2, 3, 4, 6, 8, 12, 24

                       24, 12, 8, 6, 4, 3,  2,    1

Output: 8

Notice the pairs:

1 \* 24 = 24

2 \* 12 = 24

3 \* 8 = 24

4 \* 6 = 24

What do we observe?

Divisors come in pairs (i, N/i).

If 'i' is a divisor of N, then N/i is also a divisor.

Except when i \* i = N (i is the square root of N). In this case, i and N/i are the same number.

Look at the pairs again for N=24:

(1, 24)

(2, 12)

(3, 8)

(4, 6)

Notice something about the numbers on the left side: 1, 2, 3, 4.

And compare them to sqrt(24). sqrt(24) is between 4 and 5 (approx 4.89).

All the numbers on the left (1, 2, 3, 4) are less than or equal to sqrt(24).

All the numbers on the right (24, 12, 8, 6) are greater than or equal to sqrt(24).

For every divisor 'i' less than sqrt(N), there is a corresponding divisor N/i greater than sqrt(N).

If i is exactly sqrt(N) (i\*i = N), then i and N/i are the same, equal to sqrt(N).

Optimization Idea (using root N):

Instead of looping from 1 to N, we can loop only from 1 up to sqrt(N).

If 'i' divides N in this range (1 to sqrt(N)):

- 'i' is a divisor.
- N/i is also a divisor.

We find pairs of divisors by checking only up to sqrt(N).

Algorithm using sqrt(N):

Initialize count = 0.

Loop 'i' from 1 up to sqrt(N).

If N % i == 0:

- Check if i \* i == N (i.e., i is the square root).
- If i \* i == N: We found only ONE divisor (the square root). Add 1 to count.
- If i \* i != N: We found TWO distinct divisors (i and N/i). Add 2 to count.

Example N=24:

sqrt(24) is approx 4.89. Loop i from 1 to 4.

i=1: 24 % 1 == 0. 11 != 24. Found 1 and 24. Count = 2.

i=2: 24 % 2 == 0. 22 != 24. Found 2 and 12. Count = 2 + 2 = 4.

i=3: 24 % 3 == 0. 33 != 24. Found 3 and 8. Count = 4 + 2 = 6.

i=4: 24 % 4 == 0. 44 != 24. Found 4 and 6. Count = 6 + 2 = 8.

Loop ends. Total count = 8.

Example N=36:

sqrt(36) = 6

Divisors: 1, 2, 3, 4, 6, 9, 12, 18, 36

Loop i from 1 to 6.

i=1: 36 % 1 == 0. 11 != 36. Found 1 and 36. Count = 2.

i=2: 36 % 2 == 0. 22 != 36. Found 2 and 18. Count = 2 + 2 = 4.

i=3: 36 % 3 == 0. 33 != 36. Found 3 and 12. Count = 4 + 2 = 6.

i=4: 36 % 4 == 0. 44 != 36. Found 4 and 9. Count = 6 + 2 = 8.

i=5: 36 % 5 != 0. Do nothing. Count = 8.

i=6: 36 % 6 == 0. 6\*6 == 36. Found only 6. Add 1. Count = 8 + 1 = 9.

Loop ends. Total count = 9.

```cpp
for(int i=1; i<=sqrt(N); ++i){
		if(N%i==0) (i*i==N) ? Count++ : count=+2;
}
return count;
```

Time Complexity:

The loop runs up to sqrt(N).

Time complexity is O(sqrt(N)).

Much faster than O(N) for large N.

If N = 10^18, sqrt(N) = 10^9. O(sqrt(N)) is like O(10^9).

This takes ~1 second. O(N) took ~31.7 years. Big difference.

Time Complexity Analysis

1.

```cpp
for(int i=0; i<N; ++i){
			//O(1) code here
	}
```

TC⇒ O(N) —linear time complexity

why?

because we are itnerating N times over the input and here N is dynamic meaning value is changing

2.

```cpp
int hello(int arr[], int N){
			int x=arr[0]*arr[N-1];
			int y=arr[N-1]+100;
			return x+y;
}
```

TC ⇒ O(1) —constant time complexity

why?

first is the obvious we are not iteraing over anything.

second since we are not iterating over anything, everything is happening in constant time. so O(1) is called constant time

3.

```cpp
for(int i=0; i<N; ++i){
		//O(1)
		for(int i=0; i<N; ++i){
		//O(1)
		}
}
for(int i=0; i<N; ++i){
//O(1)
}
```

TC⇒ O(N^2)

why? why not O(N+N^2)?

simple we know that first for loop is running for N\*N times and the secod for loop for N times so that would be N^2+N but as soon as we put Big O around it. it becomes O(N^2) beacuse in Big O notation we ingore lower degree order terms.
reason for ignoring lower degree terms?

if we look closely we can see that the contribution of lower degree on the overall equation is far less than that of higher degree term. so we deems it as very less or negligible.

4.

```cpp
for(int i=0; i<=N; i+=2){
		//O(1)
}
```

TC ⇒ O(N/2)
Why?
Obvious answer, we are stepping 2\*i.
The loop runs approximately N/2 times.
In Big O, constant factors are ignored. O(N/2) simplifies to O(N).

5.

```cpp
for(int i=0; i<=N; i*=2){
		//O(1)
}
```

TC⇒ O(logN)

why?

The loop variable 'i' starts at 1 and doubles in each iteration (1, 2, 4, 8, 16, ...).
We want to find how many times it takes for 'i' to reach or exceed N by repeatedly multiplying by 2.
Let 'k' be the number of iterations.
After k iterations, i will be 2^k.
The loop stops when 2^k >= N.
To find k, we take the logarithm base 2 of both sides: log₂(2^k) >= log₂(N).
k >= log₂(N).
so , the number of iterations is about log₂(N).
In Big O notation, the base of the logarithm is usually ignored as they differ only by a constant factor (change of base formula).
So, O(log₂N) is simplified to O(logN).

6.

```cpp
for(int i=0; i<N; ++i){
		for(int j=i; j<N; ++j){
				//O(1)
			}
}
```

TC⇒O(N^2)

why?

i = 0 1 2 3 N-1

j = [0,N-1] [1,N-1] [2,N-1] [3,N-1]……..[N-1,N-1]

#iter = N N+1 N+2 N+3 1
Let's look at the number of times the inner loop runs for each value of 'i' (the outer loop variable).
The inner loop `for(int j=i; j<N; ++j)` runs from `j = i` up to `j = N-1`.
Number of iterations for the inner loop is `(N-1) - i + 1` which simplifies to

`N - i`.

i = 0: inner loop runs N - 0 = N times
i = 1: inner loop runs N - 1 times
i = 2: inner loop runs N - 2 times
...
i = N-2: inner loop runs N - (N-2) = 2 times
i = N-1: inner loop runs N - (N-1) = 1 time

Total number of operations (iterations) = N + (N-1) + (N-2) + ... + 2 + 1.

This is the sum of the first N positive integers.
The formula for the sum is N \* (N + 1) / 2.

Total operations = N _ (N + 1) / 2 = (N^2 + N) / 2 = (1/2) _ N^2 + (1/2) \* N.

In Big O notation:
We ignore constant factors (like 1/2).
We ignore lower degree terms (like (1/2) _ N compared to (1/2) _ N^2 for large N).

So, O((1/2) _ N^2 + (1/2) _ N) simplifies to O(N^2).

The time complexity is quadratic.

Big O-notations(Worst case):

Puts an **upper bound** on the time complexity (or space complexity) of an algorithm based on the input size(N) after a certain thresold

Why "after a certain threshold"?
Big O describes the performance of the algorithm **as the input size N becomes very large** It focuses on the growth rate for large inputs (asymptotic behavior).
Ignores how the algorithm performs on small inputs, as that's less critical for overall scalability.

<aside>
💡

Other TC’s Omega and theta they usually focus on avg or best case

</aside>

Q)

- **O(N^3)**: If Total Operations = 10^18
  Time = 10^18 / 10^9 sec = 10^9 sec
  Time = approx **31.7 years**
- **O(N^2 logN)**: If Total Operations = 2 _ 10^13
  Time = 2 _ 10^13 / 10^9 sec = 2 \* 10^4 sec = 20,000 sec
  Time = approx **5.5 hours**
- **O(N^2)**: If Total Operations = 10^12
  Time = 10^12 / 10^9 sec = 10^3 sec = 1000 sec
  Time = approx **16.7 minutes**
- **O(N logN)**: If Total Operations = 2 _ 10^7
  Time = 2 _ 10^7 / 10^9 sec = 0.02 sec
  Time = **0.02 sec** (or 20 milliseconds)
- **O(N)**: If Total Operations = 10^6
  Time = 10^6 / 10^9 sec = 10^-3 sec
  Time = **1 ms**
- **O(sqrt(N))**: If Total Operations = 10^3
  Time = 10^3 / 10^9 sec = 10^-6 sec
  Time = **1 µs** (microsecond)
- **O(logN)**: If Total Operations = 2 _ 10^4
  Time = 2 _ 10^4 / 10^9 sec = 2 \* 10^-5 sec
  Time = **20 µs** (microseconds)
- **O(1)**: If Total Operations = Constant (e.g., 1, 10, 100 operations)
  Time = Constant / 10^9 sec
  Time = Very fast, typically **nanoseconds (ns) to microseconds (µs)**

---

**Time Unit Definitions:**

1 ms = 10^-3 seconds
1 µs = 10^-6 seconds (microsecond)
1 ns = 10^-9 seconds (nanosecond)

Model: **10^9 instructions takes 1 sec**.

To convert a value in nanoseconds to seconds: Divide by 10^9.
To convert a number of operations to seconds: Divide the number of operations by 10^9 (based on the model).

---

## Space Complexity

1.

```cpp
int solve(int arr[], int N){
			int a =arr[N/2]+N*100; //4Bytes(B)
			char ch[100];  //1B*100=100B
			ch[0]='a';
			double=0.071;  //8B
}
return
```

SC=O(1)

why?

we can see the total is just about 112B

This amount of memory (112 Bytes) is **constant**. It does **not** change or grow based on the input size N.

2.

```cpp
int solve(int arr[], int N){
			int a =arr[N/2]+N*100; //O(1)
			vector<int> b(N); //N*4B
			for(int i=0; i<N; ++i){
						b[i]=arr[i];
			}
			double=0.071;  //8B
}
return
```

SC = O(N)

Why?

Extra variables a, d O(1) space.

New array b (or vector).

Size of b is N.

Memory for b = N \* (size of int).

This memory GROWS with N.

Extra space depends on N.

arr size

about 256 MB is supported

int ar[10^6] = 4\*10^6B = 4MB always

int ar[10^7] = 4\*10^7B = 40MB May

int ar[10^8] = 4\*10^8B = 400MB MLE

matrix size

int mat[10^3][10^4] ⇒ 4B\*10^10=40000MB⇒40GB

int mat[10^3][10^4] ⇒ 4B\*10^8=400MB

int mat[10^3][10^4] ⇒ 4B\*10^6=4MB (1≤rows,cols≤10^3)

for bool & char

bool flag[10^9] ⇒ 1B\*10^9 = 1GB

bool flag[10^8] ⇒ 1B\*10^8 = 100MB always works

Limitations for TC:

most website judges only support about 1 sec=10^9 instrcutions

while(t—){

//logic

}

Z=time required to run test cases

total T\*Z = approx 10^8

<aside>
💡

Ponder: search about stdio false and tie null false

</aside>

Q)arr: 2,6,9,12,14,19,12,2,9,6,19

find the no which occurs once

approach 1:

```cpp
for (int i = 0; i < N; ++i) {
        // Count occurrences of arr[i]
        int count = 0;
        for (int j = 0; j < N; ++j) {
            if (arr[i] == arr[j]) {
                count++;
            }
        }
        // If count is 1, this is the unique element
        if (count == 1) {
            return arr[i]; // Return the unique element
        }
    }
```

TC⇒O(N^2) -- Quadratic time

SC ⇒ O(1) -- Constant space

is this the optimized approach what if N becomes very large then what?

hint: try to recall how much time does O(N^2) takes to run.

so we need a optmized approach:

```cpp
 int result = 0;
    for (int i = 0; i < N; ++i) {
        result = result ^ arr[i];
    }
    return result;
```

---

## Problems on Complexity Analysis:

> Important: while coming up with the TC note that u have to include anything given to u as input. refer Question E

A.

```cpp
// Assume rand() O(1) time
int a = 0, b = 0; // O(1) space
for (int i = 0; i < N; i++) { // Loop N times
    a = a + rand(); // O(1) work
} // Block O(N) time
for (int j = 0; j < M; j++) { // Loop M times
    b = b + rand(); // O(1) work
} // Block O(M) time
```

TC⇒O(N)+O(M)⇒ O(max(N,M)

SC⇒O(1)
Variables i, j. Fixed size + O(1)

B.

```cpp
int a = 0, b = 0; // O(1) space
for (int i = 0; i < N; i++) { // Outer loop N times
    for (int j = 0; j < N; j++) { // Inner loop N times
        a = a + j; // O(1) work
    }
} // Block O(N*N) = O(N^2) time
for (int k = 0; k < N; k++) { // Loop N times
    b = b + k; // O(1) work
} // Block O(N) time
```

TC⇒N^2+N⇒ O(N^2)

SC⇒O(1)
Variables i, j. Fixed size + O(1)

C.

```cpp
int a = 0; // O(1) space
for (int i = 0; i < N; i++) { // Outer loop N times
    for (int j = N; j > i; j--) { // Inner loop iterations: N-i
        a = 2 + i + j; // O(1) work
    }
} // Total iterations: N + (N-1) + ... + 1 = N*(N+1)/2
```

TC⇒O(N \* (N+1) / 2) => **O(N^2)**

SC⇒O(1)
Variables i, j. Fixed size + O(1)

D.

```cpp
int a = 0, i = N; // O(1) space. i starts at N.
while (i > 0) { // Loop continues while i > 0
    a += i;      // O(1) work
    i /= 2;      // i is halved each time. N -> N/2 -> N/4 -> ... -> 1
} // Number of iterations: log base 2 of N
```

TC⇒Loop runs log₂(N) times. **O(logN)**

SC⇒O(1)
Variables i, j. Fixed size + O(1)

E.

```cpp
// Assume pow() O(1) time
void fun(int N, int K) { // N, K inputs
  // No extra space allocated based on N or K inside
  for (int i = 1; i <= N; i++) { // Outer loop N times
    int p = pow(i, K); // p value depends on i, K. Variable p O(1) space.
    for (int j = 1; j <= p; j++) { // Inner loop runs pow(i, K) times
      // Constant amount of work O(1) time, O(1) space
    }
  } // Total operations = Sum for i=1 to N of pow(i, K) * O(1)
} // Sum(i^K) from i=1 to N is O(N^(K+1))
```

TC⇒(N^K+1/K+1) ⇒ O(N^K+1)

how? lets discuss

How fast does the sum 1K+2K+.......+NK grow as N gets large?

Look at some examples for K:

- If K = 1: Sum = 11+21+.......+N1=1+2+.......+N.
  This sum is exactly N*(N+1)/2.
  N*(N+1)/2 = (N^2 + N)/2.
  In Big O, this is O(N^2).
  Notice the pattern: For K=1, TC is O(N^(1+1)) = O(N^2).
- If K = 2: Sum = 12+22+.......+N2.
  This sum is N*(N+1)*(2N+1)/6.
  N*(N+1)*(2N+1)/6 = (N^2+N)(2N+1)/6 = (2N^3 + N^2 + 2N^2 + N)/6 = (2N^3 + 3N^2 + N)/6.
  In Big O, this is O(N^3).
  Notice the pattern: For K=2, TC is O(N^(2+1)) = O(N^3).

**The Pattern:**

The sum of i^K from i=1 to N, $sum=1^N i^K$, always grows like $N^K+1$ for large N.
The highest power of N in the sum $1^K+.......+N^K$ will be $N^K+1$

SC⇒O(1)
Variables i, j. Fixed size + O(1)

F.

```cpp
int count = 0; // O(1) space
for (int i = N; i > 0; i /= 2) { // Outer loop: i is N, N/2, N/4, ..., 1. logN iterations.
  for (int j = 0; j < i; j++) { // Inner loop runs 'i' times
    count++; // O(1) work
  }
} // Total operations = N + N/2 + N/4 + ... + 1 = approx 2N
```

TC⇒**O(N)**

Sum of inner loop iterations: N + N/2 + N/4 + ... + 1. This sum is O(N).

SC⇒O(1)
Variables i, j. Fixed size + O(1)

G.

```cpp
// Assuming ... is O(1) time and space
for (int i = 0; i < N; i++) { // Outer loop N times
  for (int j = i; j < N; j++) { // Inner loop iterations: N-i
    /* ... */
  }
} // Total iterations: N + (N-1) + ... + 1 = N*(N+1)/2
```

TC⇒O(N \* (N+1) / 2) => **O(N^2)**

SC⇒O(1)
Variables i, j. Fixed size + O(1)

H.

```cpp
for (int i = 0; i < N; i++) { // Outer loop N times
  while (j < N && arr[i] <= arr[j]) { // Inner while loop. j increases.
    j++; // j increments. Total j increments across ALL outer loops <= N
    /* ... */ // O(1) work
  }
} // Outer loop runs N times. Total j increments <= N. Total operations approx N + N.
```

TC⇒**O(N).**

This is a common pattern for O(N) involving a while loop inside a for loop, where the inner loop's pointer/index doesn't reset)

SC⇒O(1)
Variables i, j. Fixed size + O(1)
