/**
 * 🔴 LC 278 — First Bad Version (MUST)

This is a classic binary search on answer space problem. Extremely common in FAANG interviews because it tests boundary handling and monotonic reasoning.

📌 Problem Statement

You are given:

n versions labeled from 1 to n

An API:

isBadVersion(version) -> boolean


which returns:

true if version is bad

false if version is good

You know:

Once a version becomes bad, all later versions are also bad

There exists a first bad version

Your task:
👉 Find the first bad version.

🧠 Example 1
n = 5
firstBadVersion = 4


Versions:

Version	isBadVersion
1	false
2	false
3	false
4	true
5	true

Output:

4

🧠 Example 2
n = 1
firstBadVersion = 1


Output:

1

🔎 Observations

The versions form a monotonic boolean array:

false false false true true true


This is critical.

Whenever you see:

sorted array

monotonic condition

first true / last false

👉 Think Binary Search

🧠 Intuition

We are not searching in an array.
We are searching in the range:

[1 ... n]


Key idea:

If mid is bad → the first bad version is in left half (including mid)

If mid is good → first bad version is in right half

This is a "find first true" binary search pattern.

🎯 Goal

Find smallest index i such that:

isBadVersion(i) === true

 */




function firstBadVersion(n) {
    let left = 1;
    let right = n;

    while(left < right) {
        const mid = left + Math.floor((right - left) / 2);

        if(isBadVersion(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    // use commented section only when inviewers say there can be no bad version at all. if bad version always present then return only left.

    // if(isBadVersion(left)) {
    //     return left;
    // }

    // return -1

    return left;
}


// Simulated API
function isBadVersion(version) {
    const FIRST_BAD = 4; 
    return version >= FIRST_BAD;
}

console.log(firstBadVersion(5));