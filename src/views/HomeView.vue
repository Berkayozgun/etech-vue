<script setup>
import { ref } from 'vue'
import TaskList from '../components/TaskList.vue'
import TaskModal from '../components/TaskModal.vue'

const showTaskModal = ref(false)
</script>

<template>
  <div class="home">
    <div class="header">
      <div class="header-content">
        <h1>Görev Yönetimi</h1>
        <button @click="showTaskModal = true" class="add-task-btn">
          <span class="icon">+</span>
          Yeni Görev Ekle
        </button>
      </div>
    </div>

    <div class="content">
      <TaskList />
    </div>

    <TaskModal v-if="showTaskModal" @close="showTaskModal = false" @save="showTaskModal = false" />
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  box-shadow: var(--box-shadow);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
  color: var(--text-color);
  font-size: 1.75rem;
  font-weight: 600;
}

.add-task-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 1.5rem;
  background-color: var(--success-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  transition: var(--transition);
}

.add-task-btn:hover {
  background-color: var(--success-hover);
  transform: translateY(-1px);
}

.add-task-btn .icon {
  font-size: 1.25rem;
  line-height: 1;
}

.content {
  flex: 1;
  padding: 2rem 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: var(--border-radius);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .header-content {
    padding: 0 2rem;
  }

  .content {
    padding: 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  .add-task-btn {
    padding: 0.875rem 2rem;
    font-size: 1.125rem;
  }
}
</style>
