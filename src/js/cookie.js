// 封装cookie的操作

// cookie操作 包括：增删改查


// 增（添加）
// 功能：添加一个cookie
// 参数：
// 键，
// 值：
// 有效期：单位是天； 如：有效期为7天

// 返回值：无
function setCookie(key,value,count){
    // 1、失效时间点
    let d = new Date();
    d.setDate(d.getDate()+count);
    document.cookie = `${key}=${escape(value)};expires=${d.toGMTString()}`;
}


// 获取cookie
function getCookie(key){
    
    let str = unescape(document.cookie);//获取当前网站所有的cookie（键值对）：ausername=肖阳aaa; username=肖阳; userpass=123

    // 1、用字符串的split函数，分割cookie字符串，分割成了数组
    let arr = str.split("; ");

    // 2、循环数组，查询key对应的元素（以 key = 开头的元素）
    for(let i=0;i<arr.length;i++){

        if(arr[i].indexOf(key+"=")==0){ // 假设 arr[i] = "username=肖阳";
            // return arr[i].substring(key.length+1);
            // return arr[i].substring(key+"=".length);
            // let [,value] = arr[i].split("=");
            // return value;
            return arr[i].split("=")[1];
        }
    }
    return null;
}

// 删除（）
// 功能：删除某个cookie
// 参数：键
function removeCookie(key){
    setCookie(key,"bye",-1);
}   

// 修改
// 功能：修改cookie
// 参数：
// 键
// 值
// 失效时间
function updateCookie(key,value,count){
    setCookie(key,value,count);
}