---
title: "DSA Day 5"
date: "May 17, 2025"
status: "release"
readTime: "999+ min read"
tags: "dsa"
---

# Day 5 Note

Course: Day 5 (https://www.notion.so/Day-5-1f51178c2da68092981dd877b4a67775?pvs=21)
Confidence: Not Confident
Last Edited: May 23, 2025 7:34 AM

# Most Important(we will be elarning RECURSION in this

---

leftover from [Day 4 Note](Day%204%20Note%201f51178c2da6801f9229e18442b83304.md)

Q)WAP to find the no which occurs only once among the duplicates(thrice) among the array

arr(N): 4 1 1 37 11 17 1 4 4 37 11 37 11

```cpp
for(int i=0; i<31; ++i){
	count=0;
	ans=0;
	for(in tj=0; j<n; ++j){
		if(arr[j]& (1<<i)==1) count+=1;
		if (c % 3 !=0) ans |= (1<<i);
	}
	cout << ans;
```

how does the above work?

as elements are repeated thrice so the bit position is divisible by 3 and if any bit position is set then that pos will not be divisible by 3 and will get set pos of non repeating element

TC: O(N) —we reduced it by N

SC: O(1)

---

1.WAP to compute $a^b$

```cpp
ans=1;
for(int i=1; i<b+1; ++i){
	ans=(ans*a)%M;
}
cout << ans
```

why will this above work?

because ans will always be in [0, M-1]

when will this not work?

if the constraints are **very big it will not work**

so lets come up with a more optimized approach

3^21: 3^x1 + 3^x2 + 3^x3 … 3^xn

x = [x1+x2+x3 … xn] = 21

= 2^0+2^2+2^4=1(x1)+4(x2)+16(x3)=21

### using bitpos

21 : 1 0 1 0 1

| bitpos | x    | ans          |
| ------ | ---- | ------------ |
| 0 ✅   | 3    | 3            |
| 1❌    | 3^2  | 3            |
| 2✅    | 3^4  | 3^1+3^4      |
| 3❌    | 3^8  | 3^1+3^4      |
| 4✅    | 3^16 | 3^1+3^4+3^16 |

now this could go on

this concept is called binary exponenation

```cpp
logvalue=(logn,2)+1
res=1; x=a;
for(int i=0; logvalue; ++i){
	if((b&(1<<<i))==1) res *= x
	x*=x;
}
cout << res;
```

TC: O(logN) cause we are iterating over logN+1 search space

```cpp
//by while
ans=1; x=a;
while(n>0){
	if((n&1)==1) ans *= x;
	x *= x;
	n=n>>1;
```

2.WAP to find the subset whose sum is equal to k and returns true. there will be atleast one subset which satisify the condition

arr(N): 24 5 9 17 -5 4 16 -14 0 21

k=12

o/p: True

| arr    | 17  | -5  | 4   |                |
| ------ | --- | --- | --- | -------------- |
| index  | 0   | 1   | 2   |                |
| bitpos | 2   | 1   | 0   |                |
|        |     |     |     |                |
| 0      | 0   | 0   | 0   | {0} =0         |
| 1      | 0   | 0   | 1   | {17} = 17      |
| 2      | 0   | 1   | 0   | {-5} = -5      |
| 3      | 0   | 1   | 1   | {17,-5} = 12   |
| 4      | 1   | 0   | 0   | {4} = 4        |
| 5      | 1   | 0   | 1   | {17, 4} = 21   |
| 6      | 1   | 1   | 0   | {-5, 4} = -1   |
| 7      | 1   | 1   | 1   | {17, -5, 4} =1 |

### subeset generation using bit masking

```cpp
for(int i=0; i<2^n; ++i){
	int s=0;
	for(int j=0; j<n; ++j){//jth idx is set in the ith subset including all elements that belong to current subset
		if(checkbit(i,j)==T) sum+=arr[j];
	}
	if(sum==k) return true
}
```

#iter= $N*2^N$ (no of iteration)

TC= $O(N*2^N)$

SC: O(1)

3.WAP to find the XOR of sum of pairs

arr(N): 25 4 14 12 16 24 19 21 24

```cpp
int sum=0;
for(int i=0; i<n; ++i){
	for(int j=0; j<n; ++j){
		sum ^= arr[i]+arr[j];
	}
}
cout << sum;
```

TC: O(N^2); need to optimize

SC: O(1)

```cpp
//optimized
int sum=0;
for(int i=0; i<n; ++i){
	sum^=2*arr[i];
}
cout << sum
```

TC: O(N)

SC: O(1)

how did we reduce tc by n

eg 3, 5, 15: (3+3)^(3+5)^(3+15)^(5+3)^**(5+5)**^(5+15)^(3+15)^(5+15)^(15+15)

everything will be cancelees execpt for the (3+3) (5+5) (15+15)

xor taking similar elements into 0

arr[i]+arr[i] or 2\*arr[i]

(3+3)^**(5+5)**^(15+15)

---

# Recursion

its a programming paradigm where a bigger problem is solved by solving smaller instances of the same bigger problem

eg: S(N): 1+2+3+4+….+N⇒ N+S(N-1)

## Recursive function: function that repeats itself again n again

3 steps to write a recursive function

1.Assumption

2.Main Logic

3.Base condition why? for smallest valid input that can be passed as a parameter

eg

```cpp
int sum(int n){//assumption
	if(N==1) return 1;//base condition
	return N+sum(N-1)//main logic
}
```

Stack overflow: if we dotn mention the base condition the the recursion might go into a infinite loop

1.WAP to calc factorial

```cpp
int fact(int n){
	if(n==0) return 1
  return n*fact(n-1);
 }
```

2.WAP to calc for fibonacci series

```cpp
int fibo(int n){
	if(n==1 | n==2) return 1;
	return fib(n-1)+fib(n-2);
```

3.WAP to calc sum of AP series

```cpp
int apsum(int a, int d, int n){
	if(N==1) return a;
	return (a+(n-1)*d)+apsum(a,d,n-1);
}
```

Recurrence relation

what is that?

it will help to find the TC of recursive function in terms of T

<aside>
💡

Ponder: why not the standard way we use to find tc

</aside>

eg

```cpp
int sum(int n){//assumption T(N)
	if(N==1) return 1;//base condition T(0) =1
	return N+sum(N-1)//main logic for sum(n-1) T(N-1)
}
```

T(N)= T(N-1) +1

      T(N-2)+2

T(N-3)+3

.

.

T(N-K)+K — K is unknown so eliminate it via base condition

T(0)+N

T(N)=0+N = O(N) —this method is called substitution method

<aside>
💡

draw the recurrence tree for the fibonacci when we have more than one recusion operation

</aside>

//compelte the recurrence tree part its about 2-3 pages long
