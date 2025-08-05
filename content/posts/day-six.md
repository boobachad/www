---
title: "DSA Day 6"
date: "May 18, 2025"
status: "release"
readTime: "999+ min read"
tags: "dsa"
---

# Day 6 Note

Course: Day 6 (https://www.notion.so/Day-6-1fc1178c2da6801a9709da8284b65939?pvs=21)
Confidence: Not Confident
Last Edited: May 23, 2025 5:07 PM

> Apply modulas wherever possible

> Always use long since both int & long have same size in memory

1.Compute $2^N$ using recursive function

i/p: a=3, n=21 ⇒ $3^1 * 3^4 * 3^{16}$

step1: assumption

```cpp
/unoptimized
int aPowerN(int a, int n){//assumption
	if(n==0) return 1; //mainlogic
	return a*aPowerN(a, n-1)
}
```

T(N) = T(N-1)+1 ⇒ O(N)

we need to optimize

<aside>
💡

for questions leetcode where we cant move change the datatype

simply define return as int

</aside>

optimized for above:

```cpp
if((N&1)==1){//if odd
	return a*aPowerN(a,n/2)*aPowerN(a,N/2)
}
return aPowerN(a,N/2)*aPowerN(a,N/2);//id even
```

Recurrence relation: total recursive calls : 2

T(N)=2\*T(N/2)

but but

if we store the recursive call result

lets say in x=aPowerN(a,N/2)

recursive call reduced to 1

T(N)=T(N/2)+1

TC: O(logN)

again try to solve the aPowerN Question

```cpp
if((N&1)==1){//if odd
	result_store=aPowerN
	return a*result_store(a,n/2)*result_store(a,N/2)
}
return result_store(a,N/2)*result_store(a,N/2);//id even
```

### Most famous is: TOWER OF HANOI

2.1.if we want to shift the rings to 3rd tower

![](https://media.geeksforgeeks.org/wp-content/uploads/20240603113914/tower-of-hanoi-in-cpp.gif)

main logic

assumption: N: S→D,H

N-1 from S→H,D

move nth S→D

N-1 from H→D,S

> Complete the recurrence tree

```cpp
void TOH(int N, char S, char H, char D){
    if (N==0) return;
    TOH(N-1, S,D,H);
    cout << "Move " << N << " from " << S << " to " << D << endl;
    TOH(N-1, H,S,D);
}
```

T(N)=2T(N+1)+1

=4T(N+2)+3

=8T(N+3)+7

.

.

= $2^KT(N+K)+2^K-1$

T(N) = $O(2^N)$

3.Repeated no in array

# left about 1 page

