---
title: Longest Common Prefix
createdDate: '2018-04-24'
author: Necmttn
image: './longestCommonPrefix.png'
tags:
  - javascript
draft: false
layout: 'til'
---

## TL;DR

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) return '';
  let answer = strs.reduce((prev, current) => {
    commonPrefix = [];
    if (prev === '' || current === '') return '';
    prev = prev.split('');
    for (i = 0; i < prev.length; i++) {
      if (prev[i] === current[i]) {
        commonPrefix.push(prev[i]);
      } else {
        return commonPrefix.join('');
      }
    }
    return commonPrefix.join('');
  });

  return answer;
};
```

may approach was using reduce function.
Runtime is about Runtime: **64 ms**
