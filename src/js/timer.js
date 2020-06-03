  // 计算时间差,返回字符串的函数
  function setTime(endTime){
    // 1,建立起始时间对象和终止时间对象

    // 起始时间,就是当前时间
    var start = new Date();

    // 终止时间,就是输入参数表示的事件
    var end = new Date(endTime);

    // 2,通过时间戳,来计算时间差
    // 将时间差--毫秒,转化为秒,取整
    var times = parseInt( ( end.getTime() - start.getTime() ) / 1000 );

    // 3,将时间差转化为天数,小时数,分钟数,秒数

    // 转化为天数 : 总秒数 / 一天的秒数   取整
    var d = parseInt(times / (24*60*60)); 

    // 转化为小时 : 总秒数 % 一天的秒数 再除以 一小时的秒数   取整
    var h = parseInt( (times % (24*60*60) ) / (60*60)); 

    // 转化为分钟 : 总秒数 % 一小时的秒数 再除以 一分钟的秒数   取整
    var m = parseInt( (times % (60*60) ) / 60 ); 

    // 转化为秒 : 总秒数 % 一分钟的秒数
    var s = times % 60; 
  
    
    // 将结果,写成字符串,作为返回值
    return `${d}天${h}:${m}:${s}`;
    
}