<template>
    <div>
        <h2 v-show="isShow">我是子组件</h2>
        <button @click="hideMyself()">隐藏子组件</button>
    </div>
</template>

<script>
    export default {
        name:"child",
        props:{
            isShow:Boolean
        },
        methods:{
            hideMyself:function () {
                this.$emit('hidechild');
                //通过调用父组件的方法改变props中参数的内容
                //$emit(eventname,args); 可以携带参数
            }
        }
    }
</script>
