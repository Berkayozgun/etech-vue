import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import TaskItem from '../TaskItem.vue'

describe('TaskItem', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    priority: 'medium',
    status: 'notStarted',
    createdAt: '2023-01-01T00:00:00.000Z',
  }

  let wrapper

  beforeEach(() => {
    wrapper = mount(TaskItem, {
      props: {
        task: mockTask,
      },
    })
  })

  it('renders task details correctly', () => {
    expect(wrapper.find('.task-title').text()).toBe('Test Task')
    expect(wrapper.find('.task-description').text()).toBe('Test Description')
    expect(wrapper.find('.priority-label').text()).toBe('Orta')
    expect(wrapper.find('.status-label').text()).toBe('Başlanmadı')
  })

  it('emits delete event when delete button is clicked', async () => {
    await wrapper.find('.delete-button').trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0]).toEqual([mockTask.id])
  })

  it('switches to edit mode when edit button is clicked', async () => {
    await wrapper.find('.edit-button').trigger('click')
    expect(wrapper.find('.edit-form').exists()).toBe(true)
  })

  it('emits update event when form is submitted', async () => {
    await wrapper.find('.edit-button').trigger('click')
    await wrapper.find('input[name="title"]').setValue('Updated Title')
    await wrapper.find('textarea[name="description"]').setValue('Updated Description')
    await wrapper.find('select[name="priority"]').setValue('high')
    await wrapper.find('select[name="status"]').setValue('inProgress')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('update')).toBeTruthy()
    expect(wrapper.emitted('update')[0][0]).toEqual({
      ...mockTask,
      title: 'Updated Title',
      description: 'Updated Description',
      priority: 'high',
      status: 'inProgress',
    })
  })

  it('cancels edit mode when cancel button is clicked', async () => {
    await wrapper.find('.edit-button').trigger('click')
    await wrapper.find('.cancel-button').trigger('click')
    expect(wrapper.find('.edit-form').exists()).toBe(false)
  })

  it('displays correct priority and status labels', () => {
    const priorities = {
      low: 'Düşük',
      medium: 'Orta',
      high: 'Yüksek',
    }

    const statuses = {
      notStarted: 'Başlanmadı',
      inProgress: 'Devam Ediyor',
      completed: 'Tamamlandı',
    }

    Object.entries(priorities).forEach(([priority, label]) => {
      wrapper.setProps({ task: { ...mockTask, priority } })
      expect(wrapper.find('.priority-label').text()).toBe(label)
    })

    Object.entries(statuses).forEach(([status, label]) => {
      wrapper.setProps({ task: { ...mockTask, status } })
      expect(wrapper.find('.status-label').text()).toBe(label)
    })
  })
})
