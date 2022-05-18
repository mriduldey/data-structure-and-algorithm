/**
 * KMP Algorithm for Pattern Searching
 * Given a text txt[0..n-1] and a pattern pat[0..m-1],
 * write a function search(char pat[], char txt[]) that prints all occurrences of pat[
 * in txt[]. You may assume that n > m.
 * 
 * Input:  txt[] = "THIS IS A TEST TEXT"
 *       pat[] = "TEST"
 * Output: Pattern found at index 10

 * Input:  txt[] =  "AABAACAADAABAABA"
        pat[] =  "AABA"
 * Output: Pattern found at index 0
        Pattern found at index 9
        Pattern found at index 12
 */

function getLPSArray(pat) {
  // length of the previous longest prefix suffix
  let len = 0;
  const patLength = pat.length;
  const lps = [];
  lps.push(0); // first item is always 0 in lps
  let i = 1;

  while (i < patLength) {
    if (pat[i] === pat[len]) {
      lps[i] = len + 1;
      len++;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

// console.log(getLPSArray('abcdabcdxi')); // o/p [0,0,0,0,1,2,3,4,0,0]

function KMPSearch(s, pat) {
  const sLen = s.length;
  const patLen = pat.length;
  const lps = getLPSArray(pat);

  let i = 0,
    j = 0;

  while (i < sLen) {
    if (s[i] === pat[j]) {
      i++, j++;
    } else {
      if (j > 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }

    if (j === patLen) {
      console.log(i - j);
      j = lps[j - 1];
    }
  }
}

KMPSearch('abcdabcdabcdabcdabcd', 'c');
