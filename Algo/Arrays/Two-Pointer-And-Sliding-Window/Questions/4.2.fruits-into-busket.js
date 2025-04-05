/**
 * Fruits into baskets
 * LeetCode 904
 * 
 * You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
Given the integer array fruits, return the maximum number of fruits you can pick.

 

Example 1:

Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick from all 3 trees.
Example 2:

Input: fruits = [0,1,2,2]
Output: 3
Explanation: We can pick from trees [1,2,2].
If we had started at the first tree, we would only pick from trees [0,1].
Example 3:

Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: We can pick from trees [2,3,2,2].
If we had started at the first tree, we would only pick from trees [1,2].
 

Constraints:

1 <= fruits.length <= 105
0 <= fruits[i] < fruits.length
 */


// Find longest subarray with atmost 2 type ( as bucket can take only one type)

function totalFruitGoodSolution(trees, k) {
    let l = 0;
    let r = 0
    let maxLen = 0;
    const typesCountMap = new Map();

    while(r < trees.length) {
        const typeCurrentCount = typesCountMap.get(trees[r]);
        const typeNextCount = typeCurrentCount ? typeCurrentCount + 1 : 1;
        typesCountMap.set(trees[r], typeNextCount);

        // Reduce count if not valid window
        if(typesCountMap.size > k) {
            const typeReducedCount = typesCountMap.get(trees[l]) - 1;
            typesCountMap.set(trees[l], typesCountMap.get(trees[l]) - 1);
            // If count become 0 remove the key value pair from list
            if(typeReducedCount === 0) {
                typesCountMap.delete(trees[l]);
            }
            l++;
        }
      
        if(typesCountMap.size <= k) {
            maxLen = Math.max(maxLen, r - l + 1)
        }

        r++;
    }

    return maxLen;
}

console.log(totalFruitGoodSolution([1,2,1], 2));
console.log(totalFruitGoodSolution([0,1,2,2], 2));
console.log(totalFruitGoodSolution([1,2,3,2,2], 2));



