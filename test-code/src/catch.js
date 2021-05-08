async function fn(){
    throw new Error('错误1')
    return 666
}

function fn2(){
    throw new Error('错误2')
    return 666
}
function runtimeErrorInterceptor(e){
    console.log(e);
}

try {
    const a = fn()
    if(a instanceof Promise){
        a.catch((e)=>{
            console.log(1);
            runtimeErrorInterceptor(e)
        })
    }
    fn2()
} catch (e) {
    console.log(2);
    runtimeErrorInterceptor(e)
}