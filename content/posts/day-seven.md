---
title: "DSA Day 7"
date: "May 19, 2025"
status: "release"
readTime: "999+ min read"
tags: "dsa"
---

# Day 7 Note

Course: Day 7 (https://www.notion.so/Day-7-1fc1178c2da6801782f2f7998f9ccaf1?pvs=21)
Confidence: Not Confident
Last Edited: May 23, 2025 7:44 PM

## 1.Subset Sum Problem

Find subset from array whose sum is `k=7`.

Example: arr = [10, 5, -3], k = 7.

Subset [10, -3] sums to 7.

### Possible Solutions (Backtracking)

- Count subsets with sum `k`.
- Count _all_ subsets with sum `k`.
- Print all subsets with sum `k`.
- Implementations:
  - Using `void` function, global counter/list.
    ```cpp
    int count = 0;
    void countSubsets(int idx, vector<int>& arr, int n, int k, int current_sum) {
        if (idx == n) {
            if (sum == k) count++;
            return;
        }
        countSubsets(idx + 1, arr, n, k, sum + arr[idx]);//pick
        countSubsets(idx + 1, arr, n, k, sum);//do not pick
    }
    ```
    TC: $O(2^N)$
    SC: O(N) (recursion stack)
  - Using `int` function, returning count (no global).
    ```cpp
    int countSubsets(int idx, vector<int>& arr, int n, int k, int sum) {
        if (idx == n) {
            return sum == k ? 1 : 0;
        }
        int pick = countSubsets(idx + 1, arr, n, k, sum + arr[idx]);//pick
        int not_pick = countSubsets(idx + 1, arr, n, k, sum);//do not pick
    		return pick + not_pick; // sum pick+not pick counts
    }
    ```
    TC: $O(2^N)$
    SC: O(N) (recursion stack)
  - Using `void` function, passing list by reference (for printing).
    ```cpp
    void printSubsets(int idx, vector<int>& arr, int n, int k, int sum, vector<int>& subset) {
        if (idx == n) {
            if (sum == k) {
                cout << "[";
                for (size_t i = 0; i < subset.size(); ++i) {
                    cout << subset[i] << (i == subset.size() - 1 ? "" : ", ");
                }
                cout << "]" << endl;
            }
            return;
        }
        subset.push_back(arr[idx]);
        printSubsets(idx + 1, arr, n, k, sum + arr[idx], subset);//pick
        subset.pop_back(); // after backtrack
        printSubsets(idx + 1, arr, n, k, sum, subset);//dont pick
    }
    ```
    TC: $O(2^n.n)$ ( $2^n$ subsets, printing each takes O(n) time)
    SC: O(n) (recursion stack depth + O(n) for subset vector storage)

### Possible Solutions (Without Backtracking)

- Bitmasking (for small `N`).
  - **Check if Subset Sum Exists**
    ```cpp
    bool isPresent(vector<int>& arr, int n, int k) {
        // There are 2^n subsets, from 0 to 2^n - 1
        for (int mask = 0; mask < (1 << n); ++mask) {
            int sum = 0;
            for (int j = 0; j < n; ++j) {
                if (mask & (1<<j) {//if jth bit is set
                    sum += arr[j];
                }
            }
            if (sum == k) return true;
        }
        return false;
    }
    ```
    TC: $O(2^n.n)$ ( $2^n$ masks, each processingn bits)
    SC: O(1) (constant extra space)
  - **Count Subsets with Sum `k`**
    ```cpp
    int countSubsets(vector<int>& arr, int n, int k) {
        int count = 0;
        for (int mask = 0; mask < (1 << n); ++mask) {
            int sum = 0;
            for (int j = 0; j < n; ++j) {
                if ((mask >> j) & 1) {
                    sum += arr[j];
                }
            }
            if (sum == k) count++;
        }
        return count;
    }
    ```
    TC: $O(2^n.n)$
    SC: O(1)
  - **Print All Subsets with Sum `k`**
    ```cpp
    void printSubset(vector<int>& arr, int n, int k) {
        for (int mask = 0; mask < (1 << n); ++mask) {
            int sum = 0;
            vector<int> subset;
            for (int j = 0; j < n; ++j) {
                if ((mask >> j) & 1) {
                    sum += arr[j];
                    subset.push_back(arr[j]);
                }
            }
            if (sum == k) {
                cout << "[";
                for (int i = 0; i < subsets.size(); ++i) {
                    cout << subset[i] << (i == subset.size() - 1 ? "" : ", ");
                }
                cout << "]" << endl;
            }
        }
    }
    ```
    TC: $O(2^n.n)$
    SC: O(n) (for `subset`vector in worst case if storing a full subset)
- Dynamic Programming (DP).

### Backtracking: Pick/Not Pick Choices

Core Idea:

At each element, make a decision.

Two choices for current element:

1. **Pick** the number. Add to current sum.
2. **DO NOT Pick** the number. Keep current sum.

Explore all paths recursively.

Go until end of array (base case).

Then, backtrack to explore other paths.

**Example: `arr = [10, 5, -3]`, `k = 7`**

Let's trace isPresent function calls:

isPresent(idx, arr, n, k, current_sum)

### tracing recursive function calls

- `isPresent(0, [10,5,-3], 3, 7, 0)`
  - `idx=0`, element `10`.
  - **Choice 1: Pick 10**
    - Call `isPresent(1, arr, 3, 7, 0 + 10)` -> `isPresent(1, ..., 10)`
    - `idx=1`, element `5`.
    - **Choice 1: Pick 5**
      - Call `isPresent(2, arr, 3, 7, 10 + 5)` -> `isPresent(2, ..., 15)`
      - `idx=2`, element `3`.
      - **Choice 1: Pick -3**
        - Call `isPresent(3, arr, 3, 7, 15 + (-3))` -> `isPresent(3, ..., 12)`
        - `idx=3`. Base case. `12 != 7`. Returns `false`.
      - **Choice 2: DO NOT Pick -3**
        - Call `isPresent(3, arr, 3, 7, 15)`
        - `idx=3`. Base case. `15 != 7`. Returns `false`.
      - Both false. `isPresent(2, ..., 15)` returns `false`.
    - **Choice 2: DO NOT Pick 5**
      - Call `isPresent(2, arr, 3, 7, 10)`
      - `idx=2`, element `3`.
      - **Choice 1: Pick -3**
        - Call `isPresent(3, arr, 3, 7, 10 + (-3))` -> `isPresent(3, ..., 7)`
        - `idx=3`. Base case. `7 == 7`. Returns `true`.
      - Since one branch (`pick -3`) returned `true`, `isPresent(2, ..., 10)` returns `true`.
    - Since one branch (`not pick 5`) returned `true`, `isPresent(1, ..., 10)` returns `true`.
  - Since one branch (`pick 10`) returned `true`, `isPresent(0, ..., 0)` returns `true`.

```cpp
bool isPresent(int idx, vector<int>& arr, int n, int k, int sum) {
    if (idx == n) return sum == k;
    bool pick = isPresent(idx + 1, arr, n, k, sum + arr[idx]);
    bool not_pick = isPresent(idx + 1, arr, n, k, sum);
    return pick || not_pick;
}
//if u want to print just change the return type to int and return the sum of pick and not pick
```

Time Complexity (TC):

Each function call branches into 2 recursive calls.

The recursion depth is n (number of elements in arr).

Total number of function calls ≈2n.

TC = O(2n). (Exponential time complexity).

Space Complexity (SC):

Mainly due to recursion stack space.

The maximum depth of the recursion is n.

Each function call adds a frame to the stack.

SC = O(n). (Linear space complexity).

---

## 2.Generate Valid Parentheses

**Problem:** Given an integer `N`, generate all valid parenthesis strings of size `N` in lexicographical order.

**Clarification:** `N` here refers to the _total length_ of the parenthesis string. So, if `N=4`, it means 2 pairs of parentheses. If `N=6`, it means 3 pairs.

- Input: `n=4` (means 2 pairs)
  Output: `{{}}`, `{}{}`
- Input: `n=6` (means 3 pairs)
  Output: `{{{}}}, {{}{}}, {{}}{}, {}{{}}, {}{}{}`

**Methods:**

1. Backtracking (recursive approach, with/without explicit stack)
2. Dynamic Programming (not covered here, but an alternative)

---

### Backtracking Approach

gen(idx, char[] str, n)

We build the string character by character.

`idx`is current position in str.

`str`is the character array to build the parenthesis string.

`n`is the total length of the string (e.g., 4 for 2 pairs, 6 for 3 pairs).

We need to track:

- `open`: Number of `{` placed so far.
- `close`: Number of `}` placed so far.

**Rules for Valid Parentheses:**

1. Total number of `{` must equal total number of `}`.
2. At any point, number of `{` must be ≥ number of `}`.
3. Total `{` must be `n/2`. Total `}` must be `n/2`.

**Code**

```cpp
void validParenthesis(int idx, int open, int close, vector<char>& str, int n) {
    if (idx == n) {
        print_str(str);
        return;
    }
    if (open < n / 2) {
        str[idx] = '{';
        validParenthesis(idx + 1, open + 1, close, str, n);
    }
    if (close < open) {
        str[idx] = '}';
        validParenthesis(idx + 1, open, close + 1, str, n);
    }
}
```

### Search Pruning

Notice those if conditions: if (open < n / 2)

and

if (close < open).

These are pruning conditions.

What are we doing by writing so many if statements?

We are doing search pruning.

This means:

- We **stop exploring invalid paths early**.
- If a partial string is already invalid (e.g., `}}` or `{{{}}}{` where open count is already maxed out), we don't continue building from that point.
- This significantly reduces the number of unnecessary recursive calls, making the algorithm more efficient than blindly trying all combinations.

### Catalan Numbers

The total number of valid parenthesis strings of `n` pairs (total length `2n`) is given by the **Catalan Numbers**, Cn.

Formula: $C_n=\frac{1}{n+1} {2n \choose n}$

Recursive Relation: $C_n = C_0C_{n-1}+C_1C_{n-2}+...+C_{n-2}C_{1}+C_{n-1}C_0$

**Where it is applied:**

- Number of valid parenthesis sequences.
- Number of unique Binary Search Trees (BSTs) with `n` nodes.
- Number of ways to triangulate a convex polygon with `n+2` sides.
- Many other combinatorial problems.

---

## 3.Smart Square or Magic Square

### 1. What is a Smart Square (Magic Square)?

A **Magic Square** is a square grid where each cell contains a distinct positive integer, and the sum of the integers in each row, each column, and both main diagonals is the same. This sum is called the **magic constant** or **magic sum**.

For a 3x3 magic square containing the numbers from 1 to 9, the magic constant is always 15.

| 6   | 1   | 8   |
| --- | --- | --- |
| 7   | 5   | 3   |
| 2   | 9   | 4   |

`rows:`

`(8+1+6 = 15)
(3+5+7 = 15)
(4+9+2 = 15)

Columns:
8+3+4 = 15
1+5+9 = 15
6+7+2 = 15

Diagonals:
Main: 8+5+2 = 15
Anti: 6+5+4 = 15`

| 5   | 7   | 8   |
| --- | --- | --- |
| 6   | 3   | 1   |
| 9   | 2   | 4   |

This is clearly not a magic square because, for instance, the first row (5+3+4 = 12) does not sum to 15.

### 2. What is "Cost" and How Do We Find It?

The "cost" is defined as the absolute difference between the original number and the converted number: ∣a−b∣.

To find the minimum cost to convert your given matrix into a magic square, you need to determine which specific magic square it should be converted into.

**The Key Insight for 3x3 Magic Squares:**

There are only **8 unique 3x3 magic squares** (when considering rotations and reflections) whose elements are permutations of numbers from 1 to 9 and whose magic constant is 15. Since the problem asks for the minimum cost and implies conversion to a standard magic square, we can simply pre-calculate all 8 possible magic squares and then calculate the cost to transform the given matrix into each of them. The minimum of these costs will be your answer.

### The 8 Standard 3x3 Magic Squares (Magic Constant = 15):

1. `8 1 6
3 5 7
4 9 2`
2. `4 3 8
9 5 1
2 7 6`
3. `2 9 4
7 5 3
6 1 8`
4. `6 7 2
1 5 9
8 3 4`
5. `6 1 8
7 5 3
2 9 4`
6. `8 3 4
1 5 9
6 7 2`
7. `4 9 2
3 5 7
8 1 6`
8. `2 7 6
9 5 1
4 3 8`

so we have to do 3 things

- Check if the existing matrix is smart square or not
  ```cpp
  bool ismagicsquare(vector<int>& ar) {
      return ((ar[0] + ar[1] + ar[2]) % 5 == 0) &&
             ((ar[3] + ar[4] + ar[5]) % 5 == 0) &&
             ((ar[6] + ar[7] + ar[8]) % 5 == 0) &&
             ((ar[0] + ar[3] + ar[6]) % 5 == 0) &&
             ((ar[1] + ar[4] + ar[7]) % 5 == 0) &&
             ((ar[2] + ar[5] + ar[8]) % 5 == 0) &&
             ((ar[0] + ar[4] + ar[8]) % 5 == 0) &&
             ((ar[2] + ar[4] + ar[6]) % 5 == 0);
  }
  ```
- Find the minimum cost
  ```cpp
  int minimumCost(vector<int>& ar,vector<vector<int>>& v){
      int n = v.size();
      int ans = 200;
      for(int i = 0;i < n;i++){
          int cost = 0;
          for(int j = 0;j < 9;j++){
              cost += abs(ar[j] - v[i][j]);
          }
          if(cost < ans){
              ans = cost;
          }
      }
      return ans;
  }
  ```
- Generate Smart Squares
  ```cpp
  void magicSquare(int idx, vector<int>& arr, vector<bool>& taken, const vector<int>& mat, int& ans) {
      if (idx == 9) {
          if (ismagicsquare(arr)) {
              int cost = calcCost(mat, arr);
              ans = min(ans, cost);
          }
          return;
      }
      for (int i = 1; i <= 9; ++i) {
          if (!taken[i]) {
              arr[idx] = i;
              taken[i] = true;
              magicSquare(idx + 1, arr, taken, mat, ans);
              taken[i] = false;
          }
      }
  }
  ```
- Main Function
  ```cpp
  int main() {
      ios_base::sync_with_stdio(false);
      cin.tie(NULL);

      int t;
      cin >> t;

      while (t--) {
          vector<int> mat(9);
          for (int i = 0; i < 9; ++i) {
              cin >> mat[i];
          }

          int ans = INT_MAX;
          vector<int> arr(9);
          vector<bool> taken(10, false);
          magicSquare(0, arr, taken, mat, ans);
          cout << ans << endl;
      }
      return 0;
  }
  ```

