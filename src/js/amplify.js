// 放大镜封装类
// 参数1,执行放大镜效果的区域
// 参数2,是图片数据信息数组

class Amplify{
    constructor(ele ){
        // 接收存储参数
        this.ele = ele;
        
        // 图片区域
        this.show = ele.querySelector('.m_img');
        // 图片区域中的遮盖层
        this.mask = ele.querySelector('.mask');
    
        // 放大镜区域
        this.glass = ele.querySelector('.glass');
    }
    // 入口函数 
    init(){
        this.overOut();
        this.move();
    }

    // 鼠标的移入移出
    overOut(){
        // 鼠标移入,图片区域show,让遮盖层和放大镜显示
        this.show.addEventListener('mouseover' , ()=>{
            console.log('移入')
            this.mask.style.display = 'block';
            this.glass.style.display = 'block';
        })
        // 鼠标移出,图片区域show,让遮盖层和放大镜隐藏
        this.show.addEventListener('mouseout' , ()=>{
            console.log('移出')

            this.mask.style.display = 'none';
            this.glass.style.display = 'none';
        })
    }
    move(){
        // 鼠标在show区域移动
        this.show.addEventListener('mousemove' , (e)=>{
            
            let x = e.clientX - this.ele.offsetLeft - this.ele.clientLeft - this.mask.clientWidth;
            let y = e.clientY - this.ele.offsetTop - this.ele.clientTop - this.mask.clientHeight;

            // 设定边界值
            // 最小是 0  最大值 父级div宽高 - 遮盖层宽高
            if(x < 0){
                x = 0;
            }

            if(y < 0 ){
                y = 0;
            }

            if(x > this.show.clientWidth - this.mask.clientWidth){
                x = this.show.clientWidth - this.mask.clientWidth;
            }

            if(y > this.show.clientHeight - this.mask.clientHeight){
                y = this.show.clientHeight - this.mask.clientHeight;
            }

            // 3,将数值定位给遮盖层
            this.mask.style.left = x + 'px';
            this.mask.style.top = y + 'px';
           
            let bx = 1600*x/400 ;
            let by = 1600*y/400 ;

            this.glass.style.backgroundPosition = ` -${bx}px  -${by}px `;

        })
    }


}