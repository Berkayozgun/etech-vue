<template>
  <div class="task-filter">
    <div class="search-box">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Görev ara..."
        class="search-input"
      >
      <i class="fas fa-search search-icon"></i>
    </div>

    <div class="filter-group">
      <div class="filter-section">
        <h3>Durum</h3>
        <div class="filter-buttons">
          <button
            v-for="status in ['all', 'notStarted', 'inProgress', 'completed']"
            :key="status"
            :class="['filter-button', { active: currentStatusFilter === status }]"
            @click="handleStatusFilter(status)"
          >
            {{ getStatusLabel(status) }}
          </button>
        </div>
      </div>

      <div class="filter-section">
        <h3>Öncelik</h3>
        <div class="filter-buttons">
          <button
            v-for="priority in ['all', 'low', 'medium', 'high']"
            :key="priority"
            :class="['filter-button', { active: currentPriorityFilter === priority }]"
            @click="handlePriorityFilter(priority)"
          >
            {{ getPriorityLabel(priority) }}
          </button>
        </div>
      </div>

      <div class="filter-section">
        <h3>Sırala</h3>
        <div class="sort-controls">
          <select v-model="currentSortBy" class="sort-select">
            <option value="createdAt">Oluşturulma Tarihi</option>
            <option value="title">Başlık</option>
            <option value="priority">Öncelik</option>
          </select>
          <button class="sort-order-button" @click="toggleSortOrder">
            <i :class="['fas', currentSortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down']"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const searchQuery = computed({
  get: () => store.state.searchQuery,
  set: (value) => store.commit('setSearchQuery', value)
})

const currentStatusFilter = computed({
  get: () => store.state.statusFilter,
  set: (value) => store.commit('setStatusFilter', value)
})

const currentPriorityFilter = computed({
  get: () => store.state.priorityFilter,
  set: (value) => store.commit('setPriorityFilter', value)
})

const currentSortBy = computed({
  get: () => store.state.sortBy,
  set: (value) => store.commit('setSortBy', value)
})

const currentSortOrder = computed({
  get: () => store.state.sortOrder,
  set: (value) => store.commit('setSortOrder', value)
})

const handleStatusFilter = (status) => {
  currentStatusFilter.value = status
}

const handlePriorityFilter = (priority) => {
  currentPriorityFilter.value = priority
}

const toggleSortOrder = () => {
  currentSortOrder.value = currentSortOrder.value === 'asc' ? 'desc' : 'asc'
}

const getStatusLabel = (status) => {
  const labels = {
    all: 'Tümü',
    notStarted: 'Başlanmadı',
    inProgress: 'Devam Ediyor',
    completed: 'Tamamlandı'
  }
  return labels[status]
}

const getPriorityLabel = (priority) => {
  const labels = {
    all: 'Tümü',
    low: 'Düşük',
    medium: 'Orta',
    high: 'Yüksek'
  }
  return labels[priority]
}
</script>

<style scoped>
.task-filter {
  background: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-500);
}

.filter-group {
  display: grid;
  gap: 1.5rem;
}

.filter-section h3 {
  font-size: 0.9rem;
  color: var(--gray-700);
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  background: white;
  color: var(--gray-700);
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
}

.filter-button:hover {
  background: var(--gray-100);
  border-color: var(--gray-400);
}

.filter-button.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.sort-controls {
  display: flex;
  gap: 0.5rem;
}

.sort-select {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  background: white;
  color: var(--gray-700);
  font-size: 0.9rem;
  cursor: pointer;
}

.sort-order-button {
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  background: white;
  color: var(--gray-700);
  cursor: pointer;
  transition: var(--transition);
}

.sort-order-button:hover {
  background: var(--gray-100);
  border-color: var(--gray-400);
}

@media (min-width: 768px) {
  .filter-group {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 767px) {
  .task-filter {
    padding: 1rem;
  }

  .filter-buttons {
    flex-wrap: wrap;
  }

  .filter-button {
    flex: 1;
    min-width: calc(50% - 0.25rem);
  }
}
</style>
