## Sequence

### 概述
任务序列  
通过add方法，向序列中添加一个task，序列会按照添加的顺序依次执行每一个task

### 方法列表
* add(worker, args, done) 
	* 功能：将task加入序列当中
	* 参数
		* workder 需要执行的function
		* args function需要的参数
		* done function执行完成后的回调函数