<template>
  <div class="task-item" :class="{ 'is-editing': isEditing }">
    <div v-if="!isEditing" class="task-content">
      <div class="task-header">
        <h3 class="task-title">{{ task.title }}</h3>
        <span class="priority-label" :style="{ backgroundColor: priorityColors[task.priority] }">
          {{ getPriorityLabel(task.priority) }}
        </span>
      </div>
      <p class="task-description">{{ task.description }}</p>
      <div class="task-footer">
        <span class="status-label">{{ statusLabels[task.status] }}</span>
        <span class="date">{{ formattedDate }}</span>
      </div>
      <div class="actions">
        <button @click="startEdit" class="edit-button"><i class="fas fa-edit"></i> Düzenle</button>
        <button @click="handleDelete" class="delete-button">
          <i class="fas fa-trash"></i> Sil
        </button>
      </div>
    </div>
    <div v-else class="edit-form">
      <div class="form-group">
        <label for="title">Başlık:</label>
        <input v-model="editedTask.title" id="title" type="text" :class="{ error: errors.title }" />
        <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
      </div>
      <div class="form-group">
        <label for="description">Açıklama:</label>
        <textarea
          v-model="editedTask.description"
          id="description"
          :class="{ error: errors.description }"
        ></textarea>
        <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
      </div>
      <div class="form-group">
        <label for="priority">Öncelik:</label>
        <select v-model="editedTask.priority" id="priority">
          <option value="low">Düşük</option>
          <option value="medium">Orta</option>
          <option value="high">Yüksek</option>
        </select>
      </div>
      <div class="form-group">
        <label for="status">Durum:</label>
        <select v-model="editedTask.status" id="status">
          <option value="notStarted">Başlanmadı</option>
          <option value="inProgress">Devam Ediyor</option>
          <option value="completed">Tamamlandı</option>
        </select>
      </div>
      <div class="form-actions">
        <button @click="saveEdit" class="save-btn">Kaydet</button>
        <button @click="cancelEdit" class="cancel-btn">İptal</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['delete', 'update'])

const isEditing = ref(false)
const editedTask = ref({ ...props.task })
const errors = ref({})

const priorityColors = {
  low: 'var(--success-color)',
  medium: 'var(--warning-color)',
  high: 'var(--danger-color)',
}

const statusLabels = {
  notStarted: 'Başlanmadı',
  inProgress: 'Devam Ediyor',
  completed: 'Tamamlandı',
}

const formattedDate = computed(() => {
  return new Date(props.task.createdAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const startEdit = () => {
  isEditing.value = true
}

const validateForm = () => {
  errors.value = {}
  if (!editedTask.value.title.trim()) errors.value.title = 'Başlık zorunludur'
  if (!editedTask.value.description.trim()) errors.value.description = 'Açıklama zorunludur'
  return Object.keys(errors.value).length === 0
}

const saveEdit = () => {
  if (validateForm()) {
    emit('update', { ...editedTask.value, id: props.task.id }) // ID'yi de güncelle
    isEditing.value = false
  }
}

const cancelEdit = () => {
  editedTask.value = { ...props.task }
  errors.value = {}
  isEditing.value = false
}

const handleDelete = () => {
  emit('delete', props.task.id)
}

const getPriorityLabel = (priority) => {
  return (
    {
      low: 'Düşük',
      medium: 'Orta',
      high: 'Yüksek',
    }[priority] || ''
  )
}
</script>

<style scoped>
.task-item {
  background: white;
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  margin-bottom: 1rem; /* Görevler arası boşluk */
  display: flex;
  flex-direction: column;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #000;
}

.task-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #000;
}

.priority-label {
  padding: 0.3rem 0.8rem;
  border-radius: var(--border-radius);
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  color: white;
}

.task-description {
  margin-bottom: 1rem;
  line-height: 1.5;
  color: #333;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.edit-button,
.delete-button {
  background-color: transparent;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  display: flex;
  align-items: center;
}

.edit-button:hover,
.delete-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.edit-button i,
.delete-button i {
  margin-right: 0.5rem;
}

.edit-form {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.save-btn,
.cancel-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
}

.save-btn {
  background-color: var(--primary-color);
  color: white;
}

.cancel-btn {
  background-color: #ddd;
  color: #333;
}

/* Hata mesajları */
.error {
  border-color: var(--danger-color) !important;
}

.error-message {
  color: var(--danger-color);
  font-size: 0.8rem;
  margin-top: 4px;
}

/* Responsiveness */
@media (max-width: 768px) {
  .task-item {
    width: 100%;
  }
}

:root {
  --primary-color: #5c6bc0; /* Örnek bir birincil renk */
  --success-color: #4caf50; /* Başarı rengi */
  --warning-color: #ffc107; /* Uyarı rengi */
  --danger-color: #f44336; /* Hata rengi */
  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Kutu gölgesi */
  --border-radius: 4px; /* Kenar yuvarlaklığı */
  --transition: all 0.3s ease; /* Geçiş süresi */
}
</style>
