jQuery.fn.extend({
    bindAll:function($checkall,$btnUnCheck){
        
        $checkall.click(()=>{
            this.checkAll($checkall.prop("checked"));
        });

        this.click(()=>{
            this.backCheck($checkall);
        });
        $btnUnCheck&&$btnUnCheck.click(()=>{
            this.unCheck($checkall);
        });
    },
    checkAll:function(isChecked){
        // this 是jQuery对象
        // console.log(this);
        // console.log(isChecked);
        this.prop("checked",isChecked);
    },
    // 根据子复选框控制父复选框的选中状态
    backCheck:function($checkall){
        // this
        let isAllCheck = true;
        for(let i=0;i<this.length;i++){
            if($(this[i]).prop("checked")==false){
                isAllCheck = false;
                break;
            }
        }
        $checkall.prop("checked",isAllCheck);
    },
    unCheck:function($checkall){
        this.each(function(){
            $(this).prop("checked",!$(this).prop("checked"));
        });
        this.backCheck($checkall);
    }
})

