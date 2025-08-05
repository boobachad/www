---
title: "DSA Day 3"
date: "May 15, 2025"
status: "release"
readTime: "999+ min read"
tags: "dsa"
---

# Day 3 Note

Course: Day 3 (https://www.notion.so/Day-3-1f51178c2da6802bb84ecf90eb12bcb4?pvs=21)
Confidence: Not Confident
Last Edited: May 23, 2025 3:56 PM

# Day 3 most important bit manipulation

1.WAP to compute $2^N$

```cpp
cout << (1<<n) << endl;
```

<aside>
💡

Ponder: What if in shifting for N we go beyond 63 then what
hint: binary exponeation

</aside>

2.WAP to check if the ith bit is set or unset in N

i/p: 10(00001010) or 32(00100000)

o/p: set or unset

```cpp
n&(1<<i)!=0;//very very very fast
(n>>i)&1==1;//very very fast
(n<<i)%2==1;
(n&(1<<i))==(a<<i);
```

<aside>
💡

Tell no. is odd or even using bit manipulation

hint : answer is listed above

</aside>

<aside>
💡

very important checkbit

</aside>

> Both for & while loop can be used but in while loop there is less interation and less time consuiming

3.WAP to count all set bits in N; $0≤ N≤ 10^9$

i/p: 27(00011011)

o/p: 4

```cpp
//appraoch1
while(n){
	count+=n&1;
	n>>1;
}

//approach2
for(int i=0; i<n; ++i){
	logN+1;
	if((n>>i)&1==1) count+=1;
}
cout << count;

//approach3
use if blocks

//approach4 using the check bit function we created earlier
for(int i=0; i<n; ++i){
	if(checkbit(N,i)==T) count++;
}
```

> if multiply then left shift $a*2^i$ ; if divide then right shift $a/2^i$

<aside>
💡

Ponder about this logN thing

</aside>

lets see the log logic here

log2(N): gives the most significant(MSB) set bits positions in n

how?

i≤log2(N) < = > 2^i≤N < = > (1<<i) ≤N

> Start using & instead of %

| value | N            | N-1          | N&(N-1)       |
| ----- | ------------ | ------------ | ------------- |
| 13    | 13: 00001101 | 12: 00001100 | 00001100 :12  |
| 19    | 19: 00010011 | 18: 00010010 | 00010010 : 18 |
| 26    | 26: 00011010 | 25: 0011001  | 0011001 : 24  |

so what does N&N-1 do?

it unsets the least significant(LSB) set bit.

now after this knowledge lets again attempt

3.1: WAP to count no of set bits in a num

```cpp
while(n>0){
	n=n&(n-1);
	count++;
}
```

4.WAP to check if N is power of 2

```cpp
cout << ((n&n-1)==0) ? "Yes" : "No";
```

<aside>
💡

once again revise the diff mehtods of counting set bits

</aside>

5.WAP to create a no with ith & jth bit as set

i/p: ith=4, jth=2

```cpp
int n= (1<<i) | (1<<j);
cout << n << endl;
```

6.WAP to create a number with x 1’s followed by y 0’s

i/p: x=5, y=3

o/p:

```cpp
for(int i=y; i<x+y-1; ++i){//one way
	ans | (i<<i);
}
```

> if you desire x no of 1’s then do (1<<x)-1

eg: x=5 then 1<<5 ⇒ 32(00100000) ⇒ 32-1=31(00011111)

now we need to append some y no of 0’s as well

for that ((1<<n)-1) <<y which in maths is $2^x+^y-2^y$

### Modular arithmetic

(a+b)%m = (a%m+b%m)%m

> %M always give remainder in range [0, M-1]

further we have continued our discussion in [Day 4](https://www.notion.so/Day-4-1f51178c2da680d59cbadd431054d362?pvs=21)

