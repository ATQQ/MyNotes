const a = [1,2,3].flat()
const o = {a:{c:undefined}}
if(o?.a?.c!==1){
    console.log(1);
}

if(o&& o.a && o.a.c && o.a.c!==1){
    console.log(2);
}

const p:any = undefined

console.log(p?.slice(4));
