// 渐隐渐现轮播图构造函数
// 参数1:执行渐现渐现轮播图的标签对象

class Banner{
    constructor(ele){
        // 接收参数
        this.ele = ele;
        // 获取需要的标签对象
        this.oUl = ele.querySelector('ul');
        this.oOl = ele.querySelector('ol');
        this.oLeftRight = ele.querySelector('div');
        this.oUllis = ele.querySelectorAll('ul li');
        // 设定参数变量
        // 记录存储轮播图的次数,从索引是0的第一张图片显示
        this.index = 0; 
        // 定义存储定时器
        this.loopTime = 0;
    }

    // 定义入口函数
    init(){
        this.setLi();
        this.setClick();
        this.autoLoop();
        this.overOut();
    }

    // 生成焦点按钮方法
    setLi(){
        // 根据ul中li的数量,设定ol中li标签数量
        // 可以字符串操作,也可以节点操作
        this.oUllis.forEach((item,key)=>{
            // 通过节点操作,创建标签
            const li = document.createElement('li');
            
            // 给li标签,添加特殊的属性属性值,做区分
            li.setAttribute('name' , 'olli');

            // 给li标签上,设定属性存储索引
            li.setAttribute('index' , key);
            

            // 如果key是0,也就是第一个创建的li
            if(key==0){
                // 是第一个标签,设定CSS样式
                li.className = 'active';
            }
            // 将创建的li标签,写入到ol中,
            this.oOl.appendChild(li);
        })
    }

    


    // 正常情况存下,渐隐渐现,都是执行的++的操作
    // 这里写一个方法,专门执行++操作
    change(param){
        // 当执行轮播显示切换时,让当前轮播图片透明不显示,让下一个/上一个图片显示

        // 先,根据当前的index值对应的li,透明度为0
        this.oUllis[this.index].style.opacity = 0;

        // 如果是右参数,将执行index++操作
        if(param == 'right'){
            this.index++;
        }

        // 如果是左参数,将执行index--操作
        if(param == 'left'){
            this.index--;
        }

        // 要判断index的极限值
        // 如果index操作之后是-1,就让index等于最后一张轮播图的索引下标
        if(this.index == -1){
            this.index = this.oUllis.length-1 ;
        }
        // 如果index操作之后是最后一个轮播图索引+1,让index为0
        if(this.index == this.oUllis.length){
            this.index = 0;
        }

        // 给对应的index标签定义透明度为1
        this.oUllis[this.index].style.opacity = 1;

        

        // 调用焦点设定样式方法
        this.setActive();

    }


    // 自动轮播方法
    // 按照时间间隔,每次执行调用 this.change() 方法
    // 自动轮播的时候,this.change()参数,也就是执行 ++ 还是 --
    // 应该是 执行 ++ 参数是 right
    autoLoop(){
        this.loopTime = setInterval(()=>{
            this.change('right');
        } , 3000)
    }

    // 鼠标移入移出
    // 鼠标移入,停止定时器,鼠标移出继续执行自动轮播函数
    overOut(){
        // 移入停止定时器
        this.ele.addEventListener('mouseover' , ()=>{
            clearInterval(this.loopTime);
        })
        // 移出重新执行自动轮播方法
        this.ele.addEventListener('mouseout' , ()=>{
            this.autoLoop();
        })
    }


    // 左右切换按钮和焦点按钮
    setClick(){
        // 点击左按钮,上一张图片  index--
        // 点击右按钮,下一张图片  index++
    
        // 给this.ele添加事件,通过事件委托来判断
        this.ele.addEventListener('click' , (e)=>{
            // 点击标签name是left,是做轮播图左切换
            // 调用change(),输入参数是left
            if(e.target.getAttribute('name') == 'left'){
                this.change('left');
            }

            // 点击标签name是right,是做轮播图右切换
            // 调用change(),输入参数是right
            if(e.target.getAttribute('name') == 'right'){
                this.change('right');
            }
            // 如果点击标签name是olli,证明点击的是焦点按钮
            if(e.target.getAttribute('name') == 'olli'){
                // 获取当前点击标签的index属性的属性值,也就是索引下标
                let ind = e.target.getAttribute('index');
                
                // 让当前原始index值对应的标签,透明度为0
                this.oUllis[this.index].style.opacity = 0;
                // 将这个索引赋值给this.index
                this.index = ind ;
                // 让新的index对应的标签,透明度为1
                this.oUllis[this.index].style.opacity = 1;

                // 调用方法
                this.setActive();
            }
        })  
    }

    setActive(){
        const oOllis = this.ele.querySelectorAll('ol li');

        // 循环遍历,如果ol>li索引,与index的索引相同,就设定样式
        // 因为轮播图图片没有赋值,焦点按钮与轮播图图片是一一对应的关系
        oOllis.forEach((item,key)=>{
            // 先清除所有的样式
            item.className = '';
            // 给索引与index相同的焦点,设定样式
            if(key == this.index){
                item.className = 'active';
            }
        })        
    }
}