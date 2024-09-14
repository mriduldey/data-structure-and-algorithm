/**
  * Given an array arr[] with non-negative integers representing the height of blocks. 
If width of each block is 1, compute how much water can be trapped between the blocks during the rainy season. 
 

 Examples:

 Input: arr[] = [3,0,0,2,0,4]
 Output: 10
 Explanation: 

 Input: arr[] = [7,4,0,9]
 Output: 10
 Explanation:
 Water trapped by above 
 block of height 4 is 3 units and above 
 block of height 0 is 7 units. So, the 
 total unit of water trapped is 10 units.
 Input: arr[] = [6,9,9]
 Output: 0
 Explanation:
 No water will be trapped.
 Expected Time Complexity: O(N)
 Expected Auxiliary Space: O(N)


 Constraints:
 3 < number of blocks < 106
 0 < Ai < 108
  */

function getWater(blockCountArr) {
  let l = 0;
  let r = blockCountArr.length - 1;
  let lMax = blockCountArr[l];
  let rMax = blockCountArr[r];
  let sum = 0;

  while (l <= r) {
    if (lMax < rMax) {
      sum += lMax > blockCountArr[l] ? lMax - blockCountArr[l] : 0;
      lMax = Math.max(lMax, blockCountArr[l]);
      l++;
    } else {
      sum += rMax > blockCountArr[r] ? rMax - blockCountArr[r] : 0;
      rMax = Math.max(rMax, blockCountArr[r]);
      r--;
    }
  }

  return sum;
}

console.log(getWater([3, 0, 0, 2, 0, 4, 0, 0, 5, 0, 2, 3]));
