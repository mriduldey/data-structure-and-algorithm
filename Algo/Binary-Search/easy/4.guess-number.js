/**
 * 🟢 5. Guess Number Higher or Lower — LC 374 (Easy)
📌 Problem Statement

You are playing a number guessing game.

I pick a number between 1 and n.

You must guess the number.

You call a pre-defined API:

guess(num)


The API returns:

-1 → My number is lower

1 → My number is higher

0 → Correct guess

Your task:
Return the number I picked.

🧠 Core Insight

This is a pure Binary Search problem.

Why?

Because:

The search space is sorted → [1, 2, 3, ..., n]

After every guess, half the search space is eliminated.

Time complexity target:

O(log n) (FAANG expectation)

Not O(n)
 */

function guessNumber(n) {
    let left = 1;
    let right = n;

    while(left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        if(guess(mid) === 0) {
            return mid;
        } else if(guess(mid) === -1) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}

function guess(n) {
    const CHOICE = 1;
    if(n === CHOICE) {
        return 0;
    } else if(n < CHOICE) {
        return 1;
    } else {
        return -1;
    }
}
console.log(guessNumber(10));