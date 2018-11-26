<template>
    <div :class="['todo-item' , todo.completed?'completed':'']">
        <span class="check-span">
            <input type="checkbox" 
                class="toggle"
                v-model="todo.completed"
            >
            <label></label>
        </span>
        <label>{{todo.content}}</label>
        <button class="detroy" @click="deleteTodo"></button>
    </div>
</template>
<script>
export default {
    props:{
        todo:{
            type:Object,
            require:true
        }
    },
    methods:{
        deleteTodo(){
            this.$emit('del',this.todo.id)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .todo-item{
        box-sizing border-box
        width 600px
        height 80px
        line-height 80px
        background white
        font-size 32px
        text-align left
        margin 0 auto
        border 1px solid #d5d5d5
        border-top none
        padding 0 15px
        border-bottom 1px solid #d5d5d5
    }
    .completed label{
        color:#d5d5d5;
        text-decoration :line-through
    }
    .detroy{
        width 30px 
        height 30px
        position relative
        border-radius 100%
        border none
        outline none
        float right
        top 50%
        transform translateY(-50%)
    }
    .detroy::after{
        content "X"
        display inline-block
        font-size 26px
    }
    .check-span{
        position relative
    }
    input.toggle{
        position relative
        z-index 9
        width 40px
        height 40px
        opacity 0
        left 0
        top 10px
    }
    .toggle + label{
        width 30px
        height 30px
        position absolute
        left 6px
        top 20%
        z-index 1
    }
    .toggle + label::before{
        content " "
        position absolute
        width 30px
        height 30px 
        line-height 30px
        border-radius 100%
        border 1px solid yellow
        z-index 1
    }
    .toggle:checked + label::before{
        content "√"
        position absolute
        z-index 1
        width 30px
        height 30px
        line-height 30px
        font-size 26px
        text-align center
        color #000
        border-radius 100%
        border 1px solid yellow
    }
</style>
