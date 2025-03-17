import '@testing-library/jest-dom'
import { config } from '@vue/test-utils'

// Font Awesome ikonları için mock
config.global.mocks = {
  $icons: {
    'fa-search': 'search-icon',
    'fa-edit': 'edit-icon',
    'fa-trash': 'delete-icon',
    'fa-sort-up': 'sort-up-icon',
    'fa-sort-down': 'sort-down-icon',
    'fa-tasks': 'tasks-icon'
  }
} 