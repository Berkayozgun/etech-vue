import { createStore } from 'vuex'

// Local Storage işlemleri
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks')
  return savedTasks ? JSON.parse(savedTasks) : []
}

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

export default createStore({
  state: {
    tasks: loadTasksFromLocalStorage(),
    statusFilter: 'all',
    priorityFilter: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    searchQuery: '',
  },
  getters: {
    filteredTasks: (state) => {
      let filtered = [...state.tasks]

      // Arama filtresi
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(
          (task) =>
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query),
        )
      }

      // Durum filtresi
      if (state.statusFilter !== 'all') {
        filtered = filtered.filter((task) => task.status === state.statusFilter)
      }

      // Öncelik filtresi
      if (state.priorityFilter !== 'all') {
        filtered = filtered.filter((task) => task.priority === state.priorityFilter)
      }

      // Sıralama
      filtered.sort((a, b) => {
        let comparison = 0
        switch (state.sortBy) {
          case 'createdAt':
            comparison = new Date(a.createdAt) - new Date(b.createdAt)
            break
          case 'title':
            comparison = a.title.localeCompare(b.title)
            break
          case 'priority':
            const priorityOrder = { high: 3, medium: 2, low: 1 }
            comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
            break
        }
        return state.sortOrder === 'asc' ? comparison : -comparison
      })

      return filtered
    },
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    addTask(state, task) {
      state.tasks.push(task)
      saveTasksToLocalStorage(state.tasks)
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id)
      if (index !== -1) {
        state.tasks[index] = updatedTask
        saveTasksToLocalStorage(state.tasks)
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId)
      saveTasksToLocalStorage(state.tasks)
    },
    setStatusFilter(state, status) {
      state.statusFilter = status
    },
    setPriorityFilter(state, priority) {
      state.priorityFilter = priority
    },
    setSortBy(state, sortBy) {
      state.sortBy = sortBy
    },
    setSortOrder(state, order) {
      state.sortOrder = order
    },
    setSearchQuery(state, query) {
      state.searchQuery = query
    },
  },
  actions: {
    loadTasks({ commit }) {
      const tasks = loadTasksFromLocalStorage()
      commit('setTasks', tasks)
    },
      setFilter({ commit }, { type, value }) {
      if (type === 'status') {
        commit('setStatusFilter', value)
      } else if (type === 'priority') {
        commit('setPriorityFilter', value)
      }
    },
        setSort({ commit }, { sortBy, direction }) {
      commit('setSortBy', sortBy)
      commit('setSortOrder', direction)
    },
    addTask({ commit }, task) {
        task.id = Date.now();
        task.createdAt = new Date();
        commit('addTask', task);
    },
    updateTask({ commit }, task) {
        commit('updateTask', task);
    },
    deleteTask({ commit }, taskId) {
        commit('deleteTask', taskId);
    },
  },
})
