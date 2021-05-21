class Dom{
    constructor(el){
        this._el = el
        el.onclick = this.onClick
        this.msg = '666'
    }
    onClick(){
        this.hello()
    }
    hello(){
        console.log(this.msg)
    }
}

window.onload = function(){
    const btn1 = document.getElementById('btn1')
    // const btn2 = document.getElementById('btn2')
    new Dom(btn1)
    // new Dom2(btn2)
}

// class Dom2{
//     constructor(el){
//         this._el = el
//         el.onclick = this.onClick.bind(this)
//     }
//     onClick(){
//         console.log(this);
//     }
// }
