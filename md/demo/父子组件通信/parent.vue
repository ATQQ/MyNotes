<template>
    <div>
        <p>我是父组件</p>
        <child :isShow="show" @hidechild="hidechild"></child>
        <button @click="show=true">显示子组件</button>
    </div>
</template>

<script>
    import child from "./child"
    export default {
        date(){
            return{
                show:false
            }
        },
        comcomponents:{
            child
        },
        methods:{
            hidechild:function () {
                this.show=false
            }
        }
    }
</script>
