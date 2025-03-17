<template>
  <div class="task-list-container">
    <h1>Görev Yönetimi</h1>

    <div class="controls">
      <div class="filters">
        <div class="filter-group">
          <label>Durum:</label>
          <select v-model="statusFilter" @change="updateFilters">
            <option value="all">Tümü</option>
            <option value="notStarted">Başlanmadı</option>
            <option value="inProgress">Devam Ediyor</option>
            <option value="completed">Tamamlandı</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Öncelik:</label>
          <select v-model="priorityFilter" @change="updateFilters">
            <option value="all">Tümü</option>
            <option value="low">Düşük</option>
            <option value="medium">Orta</option>
            <option value="high">Yüksek</option>
          </select>
        </div>
      </div>

      <div class="sort-controls">
        <label>Sırala:</label>
        <select v-model="sortOption" @change="updateSort">
          <option value="createdAt-desc">Oluşturma Tarihi (Yeni-Eski)</option>
          <option value="createdAt-asc">Oluşturma Tarihi (Eski-Yeni)</option>
          <option value="title-asc">Başlık (A-Z)</option>
          <option value="title-desc">Başlık (Z-A)</option>
          <option value="priority-desc">Öncelik (Yüksek-Düşük)</option>
          <option value="priority-asc">Öncelik (Düşük-Yüksek)</option>
        </select>
      </div>

      <button class="add-task-btn" @click="openTaskModal()">Yeni Görev Ekle</button>
    </div>

    <div class="task-list" v-if="filteredTasks.length > 0">
      <task-item
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @edit="openTaskModal"
        @delete="deleteTask"
      />
    </div>
    <div v-else class="no-tasks">
      <p>Görev bulunamadı.</p>
    </div>

    <task-modal v-if="isModalOpen" :task="currentTask" @close="closeTaskModal" @save="saveTask" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import TaskItem from '../components/TaskItem.vue'
import TaskModal from '../components/TaskModal.vue'

export default {
  name: 'TaskList',
  components: {
    TaskItem,
    TaskModal,
  },
  setup() {
    const store = useStore()
    const isModalOpen = ref(false)
    const currentTask = ref(null)
    const statusFilter = ref('all')
    const priorityFilter = ref('all')
    const sortOption = ref('createdAt-desc')

    const filteredTasks = computed(() => {
      return store.getters.filteredTasks
    })

    const openTaskModal = (task = null) => {
      currentTask.value = task
      isModalOpen.value = true
    }

    const closeTaskModal = () => {
      isModalOpen.value = false
      currentTask.value = null
    }

    const saveTask = (task) => {
      if (task.id) {
        store.dispatch('updateTask', task)
      } else {
        store.dispatch('addTask', task)
      }
      closeTaskModal()
    }

    const deleteTask = (taskId) => {
      if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
        store.dispatch('deleteTask', taskId)
      }
    }

    const updateFilters = () => {
      store.dispatch('setFilter', { type: 'status', value: statusFilter.value })
      store.dispatch('setFilter', { type: 'priority', value: priorityFilter.value })
    }

    const updateSort = () => {
      const [sortBy, direction] = sortOption.value.split('-')
      store.dispatch('setSort', { sortBy, direction })
    }

    return {
      filteredTasks,
      isModalOpen,
      currentTask,
      statusFilter,
      priorityFilter,
      sortOption,
      openTaskModal,
      closeTaskModal,
      saveTask,
      deleteTask,
      updateFilters,
      updateSort,
    }
  },
}
</script>

<style scoped>
.task-list-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filters {
  display: flex;
  gap: 15px;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 14px;
}

select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  min-width: 150px;
}

.add-task-btn {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.add-task-btn:hover {
  background-color: #45a049;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.no-tasks {
  text-align: center;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    gap: 15px;
  }

  .filters {
    flex-direction: column;
  }

  .add-task-btn {
    width: 100%;
  }
}
</style>
