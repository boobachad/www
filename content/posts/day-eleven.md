---
title: "DSA Day 11"
date: "May 23, 2025"
status: "release"
readTime: "999+ min read"
---

# Day 11 Note

Course: Day 11 (https://www.notion.so/Day-11-1fc1178c2da6806f8dc3d260b6857229?pvs=21)
Confidence: Not Confident
Last Edited: May 23, 2025 3:54 PM

1.Given N house coordinates on a 1D line and an integer K, find the maximum possible minimum distance such that K party houses can be placed among the N houses, with the distance between any two chosen party houses being at least this minimum.

arr(N): 2 5 6 10 12 15 21 25 24 32 38 45 51 53 58

k=4

points before putting up the solution

1.there will be atleast 1 house that can organize party

2.we are not always organizing party at adjacnet houses.

3.maintain min. distance bwetn all houses

```cpp
int ans=0;
void solve(int idx, vector<int>& arr, int n, int k, int maxi, prev){
	if(k==0){
		ans=max(ans,maxi);
		return;
	}

	if(idx>=n){
		return;
	}

	for(int i=idx, i<n; ++i){
		solve(i+1,arr, n, k-1, (prev!=INT_MIN) ? min(maxi, arr[i]-prev) : INT_MAX, arr[i]);
	}
}

//in the main function first sort the array(it will add o(n) to you tc)
//if its already sorted then you are in luck its just o(1)
```

now this is not the efficient appraoch since if u observe its esentialy ttrying to find all the combiantion of k houses out of n.

$\binom{n}{r}$= $\frac{n!}{r!(n-r)!}$ which is the combiantion formual nCr

eg lets say n=100 and k=50 you can imagine the no scale it will be huge( $10^{29}$)

even if you scale down the k to just 10 it will be about $1.7×10^{13}$

why its this much?

because each combiantion requires traversing k depth in the recusion and performing calc the total tc will be exponential.

it would most probably hit TLE

it can also cause stack overflow due depth of recusion

## so lets optmize it

what we will do?
well the optimization of recusion or its backtracking is dp but we havent learned it yet.

so….

well we have studied binary search so lets try that

first lets bring the yesterday’s([Day 10 Note](Day%2010%20Note%201fc1178c2da680449eb4ced728e49ad3.md)) note of binary search as we are told that template will work everywhere we will just have to make some minor tweaks like for here we need to tweak the search space and comparison logic

```cpp
bool isMidValid(vector<int>& arr, int n, int k , int mid){
	if(k==0) return true;
	if(k>n) return false;

	int parties=1; int prev=arr[0];
	for(int i=1; i<n; ++i){
		if(parties==k) true;
		if(arr[i]-prev>=mid){
			parties++;
			prev=arr[i];
		}
	}
	return false;
}

int BS(std::vector<int>& arr, int n, int k) {
    sort(arr.begin(), arr.end());

    if (k <= 1) return 0;
    if (k > n) return 0;
    int low = 0; int high = arr[n - 1] - arr[0]; int p1 = 0;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (isMidValid(arr, n, k, mid)) {
            p1 = mid;
            low = mid + 1;
        } else high = mid - 1;
    }
    return p1;
}
```

<aside>
💡

this question style is called
1.n houses, k relatives

2.aggressive cows

3. for si primary its listed as productive farmers

</aside>

# Reality check

DSA ⇒ OOPS ⇒ Solid Principles ⇒ Design patterns

LLD, HLD

the bar has been raised i dont jsut need to learn jsut dsa i need to learn everything in the above if i am to be considered even for internship
