<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import TaskItem from './TaskItem.vue'
import TaskModal from './TaskModal.vue'
import draggable from 'vuedraggable'

const store = useStore()
const isModalOpen = ref(false)
const currentTask = ref(null)

// Filtre ve sıralama için state değerleri
const statusFilter = computed({
  get: () => store.state.statusFilter,
  set: (value) => store.dispatch('setFilter', { type: 'status', value }),
})
const priorityFilter = computed({
  get: () => store.state.priorityFilter,
  set: (value) => store.dispatch('setFilter', { type: 'priority', value }),
})
const sortOption = computed({
  get: () => `${store.state.sortBy}-${store.state.sortOrder}`,
  set: (value) => {
    const [sortBy, direction] = value.split('-')
    store.dispatch('setSort', { sortBy, direction })
  },
})

// Arama sorgusu
const searchQuery = computed({
  get: () => store.state.searchQuery,
  set: (value) => store.commit('setSearchQuery', value),
})

const filteredTasks = computed(() => {
  return store.getters.filteredTasks
})

const openTaskModal = (task = null) => {
  currentTask.value = task ? { ...task } : null // Mevcut görevin bir kopyasını al veya yeni bir görev oluştur
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

// Sürükleme sonrası durum hesaplama
const onDragEnd = (evt) => {
  if (evt.moved) {
    const getStatusFromIndex = (index) => {
      const columnCount = 3
      return ['notStarted', 'inProgress', 'completed'][
        Math.floor(index / Math.ceil(filteredTasks.value.length / columnCount))
      ]
    }
    const movedTask = evt.moved.element
    const newStatus = getStatusFromIndex(evt.moved.newIndex)
    if (movedTask.status !== newStatus) {
      store.dispatch('updateTask', { ...movedTask, status: newStatus })
    }
  }
}

onMounted(() => {
  store.dispatch('loadTasks')
})
</script>

<template>
  <div class="task-list">
    <!-- Filtre ve Sıralama Alanları -->
    <div class="filters-sort-container">
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="Görevlerde ara..."
        />
      </div>
      <div class="filter-container">
        <select v-model="statusFilter" class="filter-select">
          <option value="all">Tüm Durumlar</option>
          <option value="notStarted">Başlamadı</option>
          <option value="inProgress">Devam Ediyor</option>
          <option value="completed">Tamamlandı</option>
        </select>
        <select v-model="priorityFilter" class="filter-select">
          <option value="all">Tüm Öncelikler</option>
          <option value="high">Yüksek</option>
          <option value="medium">Orta</option>
          <option value="low">Düşük</option>
        </select>
      </div>
      <div class="sort-container">
        <select v-model="sortOption" class="sort-select">
          <option value="createdAt-desc">Oluşturma Tarihi (Yeniden Eskiye)</option>
          <option value="createdAt-asc">Oluşturma Tarihi (Eskiden Yeniye)</option>
          <option value="title-asc">Başlık (A-Z)</option>
          <option value="title-desc">Başlık (Z-A)</option>
          <option value="priority-asc">Öncelik (Düşükten Yükseğe)</option>
          <option value="priority-desc">Öncelik (Yüksekten Düşüğe)</option>
        </select>
      </div>
    </div>
    <!-- Sürükleme Alanı -->
    <div class="drag-area">
      <draggable
        v-model="filteredTasks"
        group="tasks"
        item-key="id"
        class="task-grid"
        @end="onDragEnd"
        :animation="200"
      >
        <template #item="{ element: task }">
          <TaskItem :task="task" @delete="deleteTask" @update="openTaskModal" />
        </template>
        <template #footer>
          <div v-if="filteredTasks.length === 0" class="no-tasks-content">
            <i class="fas fa-tasks"></i>
            <p>Mevcut filtrelerle eşleşen görev bulunamadı.</p>
            <button class="add-task-button" @click="openTaskModal">Görev Ekle</button>
          </div>
        </template>
      </draggable>
    </div>
    <!-- Modal -->
    <TaskModal v-if="isModalOpen" :task="currentTask" @close="closeTaskModal" @save="saveTask" />

    <!-- Görev ekleme butonu -->
    <button class="add-task-button" @click="openTaskModal">Görev Ekle</button>
  </div>
</template>

<style scoped>
.task-list {
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

/* Filtre ve Sıralama Stilleri */
.filters-sort-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-container,
.sort-container {
  display: flex;
  gap: 0.5rem;
}

.filter-select,
.sort-select,
.search-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-select:focus,
.sort-select:focus,
.search-input:focus {
  outline: none;
  border-color: #5c6bc0;
  box-shadow: 0 0 2px rgba(92, 107, 192, 0.5);
}

.task-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.add-task-button {
  background-color: #5c6bc0;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1.5rem;
}

.add-task-button:hover {
  background-color: #3949ab;
}

/* Sürükleme sırasında stil değişiklikleri */
.ghost {
  opacity: 0.7;
  border: 2px dashed #42b883;
  background: #f0f9eb;
}

.drag {
  transform: scale(1.02);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.no-tasks-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  color: #6c757d;
  text-align: center;
  width: 100%;
}

.no-tasks-content i {
  font-size: 2.5rem;
}
.no-tasks-content p {
  font-size: 1.1rem;
}

.search-input {
  width: 100%;
}
.search-container {
  width: 350px;
}

.drag-area {
  border: 1px dashed #ddd;
  padding: 1rem;
  border-radius: 5px;
}

/* Responsive Tasarım */
@media (max-width: 768px) {
  .task-grid {
    grid-template-columns: 1fr;
  }
  .filters-sort-container {
    flex-direction: column;
    align-items: stretch;
  }
  .filter-container,
  .sort-container {
    flex-direction: column;
  }
  .search-container {
    width: 100%;
  }
}
</style>
