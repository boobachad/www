---
title: "DSA Day 1"
date: "May 12, 2025"
status: "release"
readTime: "999+ min read"
tags: "dsa"
---

# Day 1 Note

Course: Day 1 (https://www.notion.so/Day-1-1f51178c2da680de9d14f0ba00000137?pvs=21)
Confidence: Not Confident
Last Edited: May 23, 2025 6:08 AM

Armstrong Number:

```cpp
int sum=0;
int num=n;
while(n>0){
		int rem=n%10;
		sum += rem*rem*rem;
		n /= 10;
}
cout << (sum==num) ? "armstrong no" : "not armstrong";
```

find the multiples of 3,5 in range [1,10^18]

Rememebr: Formula for union

$P(A U B)=P(A)+P(B)-P(A ∩ B)$

```cpp
int n1,n2;
count += (n/n1 + n/n2 - n/n1*n2)
//- n/n1*n2 beacuse we will have a number which will occur 3 times so we weill remove one.

```

> int is a datatype whereas long, signed, unsigned and etc are keywords

<aside>
💡

Ponder: if long adn above all are keywords then hwo are they extending the range of int

</aside>

1.WAP to ocunt of max number of 1’s together in the array meaning print the count of longest 1’s streak:

arr(N): 1 1 1 0 0 1 0 0 0 1 0 1 1 1 1 1 0 1 1 1

```cpp
for(int i=0; i<n; ++i){
	if(arr[i]==1) count++;
	else {
		maxStreak = max(maxStreak, count);
		count=0;
	}
}
cout
```

2.WAP to find 2nd largest element in O(N) complexity

arr(N): -3 5 4 9 16 -14 21 17 24

```cpp
for (int i=0; i<n; ++i){
	if(arr[i]>max) {
		secmax=max;
		max=arr[i];
		}
		else if(arr[i]>max && arr[i]!=max) secmax=arr[i];
}
```

> it is a good practice if we assign INT_MIN to max and secmax if finding largest and INT_MAX if we are going for smallest

3.WAP to find the sum of each row in matrix

```cpp
for(int i=0; i<rows; ++i){
	for(j=0; j<cols; ++j) sum+=arr[i][j];
}
cout << sum;
```

<aside>
💡

do all the sum regarding sum in si basic lik e column sum, submatrix sum transpose matrix, local max, max min partition

</aside>

4.WAP to when a zero is found in matrix make the corresponding rows and cols also 0

# check all the codes from here

```cpp
//approach 1: using 2 matrices
original_mat[i][j];
new_mat[row][cols];
if(mat[i][j]==0){
	for(int k=0; k<rows; ++k) mat[i][j]=0;
	for(int k=0; k<cols; ++k) mat[k][j]=0;
}
else if(mat[i][j]!=0 && mat[i][j]=1) mat[i][j]=1;
```

```cpp
//appraoch 2: same matrix
for(int i=0; i<row; ++i){
	for(int j=0; j<cols; ++j){
		if(mat[i][j]==0){
			for(int k=0; k<row; ++k){
				if(mat[i][k]==1) mat[i][k]=10;
			}
			for(int k=0; k<cols; k++){
				if(mat[k][i]==1) mat[k][j]=10;
			}
			if(mat[i][j]==0 || mat[i][j]==10) cout <<0;
			else cout <<0
```

4.WAP to check if given string start and ends with SMART

str: smartinterveiwssmart

```cpp
if(str[0:5]==str[n-5:n]=="smart";
//do with for loop also
```

5.WAP to find the length of longest prefix which is also a suffix in O(N^2)

```cpp
for(int i=0; i<n; ++i){
	if(i==n-i) length=i;
}
cout << length
```

<aside>
💡

Whenever we see the word “CHECK” in question always try to prove invalidness

</aside>

6.WAP for compressed strings(one of the many variation)

i/p: a a a a a b b b p p p q a a

o/p:a5 b3 p3 q1 a2

```cpp
for(int i=0; i<length; ++i){
	if(arr[i]==arr[i+1]) count++;
	else {
		cout << arr[i] << count;
		count=1;
	}
}
//2 issues
//if s=='aa' && if s=='a' here outof bound error
//so here for loop is villain
```

<aside>
💡

if we are unsure of no of iteration always go with while instead of for

</aside>

lets do it again the above question with while loop

```cpp
int i=0;
while(i<n){
	char ref=s[i];
	int count=0;
	while(i<n && s[i]==ref){
		count++;
		i++;
	}
	cout << ref << count;
```

