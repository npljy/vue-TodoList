<template>
    <section class="section">
        <input type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来要做什么"
            @keyup.enter="addTodo"
        >
        <Item 
            :todo="todo"
            v-for="todo in filterTodos"
            :key = "todo.id+todo.content"
            @del = "deleteTodo"
        />
        <Tabs 
            :filter="filter" 
            :todos="todos"
            @toggleFilter = "toggleFilter"
            @clearAllCompleted = "clearAllCompleted"
        />
    </section>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0;
export default {
    data(){
        return {
            todos:[],
            filter:'all'
        }
    },
    components:{
        Item,
        Tabs
    },
    methods:{
        addTodo(e){
            this.todos.unshift({
                id:id++,
                content:e.target.value.trim(),
                completed:false
            })
            e.target.value = ""
        },
        deleteTodo(id){
            this.todos.splice(this.todos.findIndex(e=>e.id === id ),1 )
        },
        toggleFilter(state){
            this.filter = state
        },
        clearAllCompleted(){
            this.todos = this.todos.filter(e=>!e.completed)
        }
    },
    computed:{
        filterTodos(){
            const isFilterd = this.filter === 'completed' 
            if(this.filter === 'all')return this.todos;
            else return this.todos.filter(e=>isFilterd === e.completed)

        }
    }
}
</script>
<style lang="stylus" scoped>
.section{
    text-align  center
    .add-input{
        box-sizing border-box
        width 600px
        height 60px 
        line-height 40px
        padding 0 20px
        border 1px solid #d5d5d5
        border-bottom none
        font-size 24px
        &::placeholder{
            font-size 24px
            color #d5d5d5
        }
    }
}
   
</style>
