<template>
    <div class="helper">
        <div>
            <span class="first">{{unFinishedTodoLength}} items left</span>
            <span>
                <span 
                    v-for="state in states" 
                    :key="state" 
                    :class="[state, filter===state?'act':'']"
                    @click="toggleFilter(state)"
                >
                    {{state}}
                </span>
            </span>
            <span class="last clear" @click="clearAllCompleted">Clear Completed</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        filter:{
            type:String,
            require:true
        },
        todos:{
            type:Array,
            require:true
        }
    },
    data(){
        return {
            states:['all','active','completed']
        }
    },
    methods:{
        clearAllCompleted(){
            this.$emit('clearAllCompleted')
        },
        toggleFilter(state){
            this.$emit("toggleFilter",state)
        }
    },
    computed:{
        unFinishedTodoLength(){
            return this.todos.filter(e=>!e.completed).length
        }
    }

}
</script>


<style lang="stylus" scoped>
    .helper{
        box-sizing border-box
        width 600px
        height 80px
        line-height 80px
        background white
        margin 0 auto
        padding 0 18px
        border 1px solid #d5d5d5
        border-top none
        &>div{
            display inline-block
            margin 0 auto
            width 100%
            height 80px
            line-height 80px
        }
        &>div>span{
            margin-right 60px
        }
        span{
            cursor pointer
            display inline-block
            margin 0 6px
            height 20px
            line-height 20px
            vertical-align middle
        }
        
        .first{
            cursor default
        }
        .last{
            margin-right 0
        }
        .act{
            border 1px solid grey
        }
    }
</style>
