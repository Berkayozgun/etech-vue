import { createStore } from 'vuex'
import store from '../index'

describe('Store', () => {
  beforeEach(() => {
    localStorage.clear()
    store.state.tasks = []
    store.state.statusFilter = 'all'
    store.state.priorityFilter = 'all'
    store.state.sortBy = 'createdAt'
    store.state.sortOrder = 'desc'
    store.state.searchQuery = ''
  })

  describe('Mutations', () => {
    it('should add a task', () => {
      const task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        priority: 'medium',
        status: 'notStarted',
        createdAt: new Date().toISOString(),
      }

      store.commit('addTask', task)
      expect(store.state.tasks).toHaveLength(1)
      expect(store.state.tasks[0]).toEqual(task)
    })

    it('should update a task', () => {
      const task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        priority: 'medium',
        status: 'notStarted',
        createdAt: new Date().toISOString(),
      }

      store.commit('addTask', task)
      const updatedTask = { ...task, title: 'Updated Task' }
      store.commit('updateTask', updatedTask)

      expect(store.state.tasks[0].title).toBe('Updated Task')
    })

    it('should delete a task', () => {
      const task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        priority: 'medium',
        status: 'notStarted',
        createdAt: new Date().toISOString(),
      }

      store.commit('addTask', task)
      store.commit('deleteTask', 1)
      expect(store.state.tasks).toHaveLength(0)
    })

    it('should set filters', () => {
      store.commit('setStatusFilter', 'completed')
      store.commit('setPriorityFilter', 'high')
      store.commit('setSearchQuery', 'test')

      expect(store.state.statusFilter).toBe('completed')
      expect(store.state.priorityFilter).toBe('high')
      expect(store.state.searchQuery).toBe('test')
    })
  })

  describe('Getters', () => {
    it('should filter tasks by status', () => {
      const tasks = [
        { id: 1, title: 'Task 1', status: 'notStarted' },
        { id: 2, title: 'Task 2', status: 'completed' },
        { id: 3, title: 'Task 3', status: 'notStarted' },
      ]

      store.state.tasks = tasks
      store.commit('setStatusFilter', 'completed')

      expect(store.getters.filteredTasks).toHaveLength(1)
      expect(store.getters.filteredTasks[0].id).toBe(2)
    })

    it('should filter tasks by priority', () => {
      const tasks = [
        { id: 1, title: 'Task 1', priority: 'low' },
        { id: 2, title: 'Task 2', priority: 'high' },
        { id: 3, title: 'Task 3', priority: 'low' },
      ]

      store.state.tasks = tasks
      store.commit('setPriorityFilter', 'high')

      expect(store.getters.filteredTasks).toHaveLength(1)
      expect(store.getters.filteredTasks[0].id).toBe(2)
    })

    it('should search tasks', () => {
      const tasks = [
        { id: 1, title: 'Test Task', description: 'Description' },
        { id: 2, title: 'Another Task', description: 'Test' },
        { id: 3, title: 'Task 3', description: 'Description' },
      ]

      store.state.tasks = tasks
      store.commit('setSearchQuery', 'test')

      expect(store.getters.filteredTasks).toHaveLength(2)
      expect(store.getters.filteredTasks.map((t) => t.id)).toEqual([1, 2])
    })

    it('should sort tasks', () => {
      const tasks = [
        { id: 1, title: 'C Task', createdAt: '2023-01-01' },
        { id: 2, title: 'A Task', createdAt: '2023-01-02' },
        { id: 3, title: 'B Task', createdAt: '2023-01-03' },
      ]

      store.state.tasks = tasks
      store.commit('setSortBy', 'title')
      store.commit('setSortOrder', 'asc')

      expect(store.getters.filteredTasks.map((t) => t.id)).toEqual([2, 3, 1])
    })
  })
})
