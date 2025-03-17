<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ isEditing ? 'Görevi Düzenle' : 'Yeni Görev Ekle' }}</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="saveTask">
          <div class="form-group">
            <label for="title">Başlık <span class="required">*</span></label>
            <input
              id="title"
              v-model="taskForm.title"
              type="text"
              required
              :class="{ error: validationErrors.title }"
            />
            <span v-if="validationErrors.title" class="error-message">
              {{ validationErrors.title }}
            </span>
          </div>

          <div class="form-group">
            <label for="description">Açıklama <span class="required">*</span></label>
            <textarea
              id="description"
              v-model="taskForm.description"
              rows="4"
              required
              :class="{ error: validationErrors.description }"
            ></textarea>
            <span v-if="validationErrors.description" class="error-message">
              {{ validationErrors.description }}
            </span>
          </div>

          <div class="form-group">
            <label for="priority">Öncelik <span class="required">*</span></label>
            <select
              id="priority"
              v-model="taskForm.priority"
              required
              :class="{ error: validationErrors.priority }"
            >
              <option value="">-- Öncelik Seçin --</option>
              <option value="low">Düşük</option>
              <option value="medium">Orta</option>
              <option value="high">Yüksek</option>
            </select>
            <span v-if="validationErrors.priority" class="error-message">
              {{ validationErrors.priority }}
            </span>
          </div>

          <div class="form-group">
            <label for="status">Durum <span class="required">*</span></label>
            <select
              id="status"
              v-model="taskForm.status"
              required
              :class="{ error: validationErrors.status }"
            >
              <option value="">-- Durum Seçin --</option>
              <option value="notStarted">Başlanmadı</option>
              <option value="inProgress">Devam Ediyor</option>
              <option value="completed">Tamamlandı</option>
            </select>
            <span v-if="validationErrors.status" class="error-message">
              {{ validationErrors.status }}
            </span>
          </div>

          <div class="button-group">
            <button type="button" class="cancel-btn" @click="$emit('close')">İptal</button>
            <button type="submit" class="save-btn">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'TaskModal',
  props: {
    task: {
      type: Object,
      required: false,
      default: null,
    },
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const taskForm = ref({
      id: '',
      title: '',
      description: '',
      priority: '',
      status: '',
    })

    const validationErrors = ref({
      title: '',
      description: '',
      priority: '',
      status: '',
    })

    const isEditing = computed(() => !!props.task?.id)

    onMounted(() => {
      if (props.task) {
        taskForm.value = { ...props.task }
      } else {
        taskForm.value = {
          id: '',
          title: '',
          description: '',
          priority: '',
          status: 'notStarted',
        }
      }
    })

    const validateForm = () => {
      let isValid = true
      validationErrors.value = {
        title: '',
        description: '',
        priority: '',
        status: '',
      }

      if (!taskForm.value.title.trim()) {
        validationErrors.value.title = 'Başlık zorunludur'
        isValid = false
      }

      if (!taskForm.value.description.trim()) {
        validationErrors.value.description = 'Açıklama zorunludur'
        isValid = false
      }

      if (!taskForm.value.priority) {
        validationErrors.value.priority = 'Öncelik seçimi zorunludur'
        isValid = false
      }

      if (!taskForm.value.status) {
        validationErrors.value.status = 'Durum seçimi zorunludur'
        isValid = false
      }

      return isValid
    }

    const saveTask = () => {
      if (validateForm()) {
        emit('save', { ...taskForm.value })
      }
    }

    return {
      taskForm,
      validationErrors,
      isEditing,
      saveTask,
    }
  },
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #757575;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

.required {
  color: #f44336;
}

input[type='text'],
textarea,
select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input[type='text']:focus,
textarea:focus,
select:focus {
  border-color: #2196f3;
  outline: none;
}

input.error,
textarea.error,
select.error {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn,
.save-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.cancel-btn {
  background-color: #e0e0e0;
  color: #333;
}

.cancel-btn:hover {
  background-color: #d0d0d0;
}

.save-btn {
  background-color: #4caf50;
  color: white;
}

.save-btn:hover {
  background-color: #45a049;
}

@media (max-width: 576px) {
  .modal-content {
    width: 90%;
  }

  .button-group {
    flex-direction: column;
  }

  .button-group button {
    width: 100%;
  }
}
</style>
