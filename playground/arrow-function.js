const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    },
    {
        text: 'Film course',
        completed: false
    },
    
],
getTasksToDo () {
    const inCompletedTasks = this.tasks.filter(function(task){
        return task.completed === false
    })
    return inCompletedTasks
}

}
console.log(tasks.getTasksToDo())