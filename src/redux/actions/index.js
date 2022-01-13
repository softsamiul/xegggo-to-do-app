export const addToDO = (data) => ({
    type: 'ADD_TODO',
    payload: {
        id: new Date().getTime().toString(),
        data:data
    }
})
export const deleteToDo = (id) => ({
    type: 'DELETE_TODO',
    id
})
export const deleteAllToDo = () => ({
    type: 'DELETE_ALL_TODO'
})