### 变量

##### 让变量名说明，这个变量存储的内容是什么

```
let candidateIds = yield models.answerSheet.getExamCandidatesUid(test.id, models.answerSheet.CONSTANT.TYPE.test);
let candidates = yield models.customAuth.getUserByIds(candidateIds);
candidates.forEach(function (e) {
  e.name = e.relName;
  delete e.relName;
});
let answerSheets = yield candidateIds.map(userId => models.answerSheet.get(userId, tesmodels.answerSheet.CONSTANT.TYPE.test));
let tempFormatMap = candidates.reduce((sumMap, current) => Object.assign(sumMap, {[current.current}), {});
//把答题卡的信息整合到tempFormatMap
answerSheets.forEach(answerSheet => tempFormatMap[answerSheet.uid] = Object.assign(tempFormanswerSheet.uid], _.pick(answerSheet, ['score', 'status', 'commitedAt'])));
//把答题卡id整合到tempFormatMap，因为在响应对象中key的名字变了，所以在弄一个forEach单独处理这个问题
answerSheets.forEach(answerSheet => tempFormatMap[answerSheet.uid].answerSheetId = answerSheet.id);
classInfos = Object.keys(tempFormatMap).map(key => tempFormatMap[key]);

```


### 函数