import { selectAnatomy } from '@ark-ui/anatomy'
import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { Portal } from '../portal'
import { getExports, getParts } from '../setup-test'
import type { Optional } from '../types'
import { Select, type SelectProps } from './'

interface Item {
  label: string
  value: string
  disabled?: boolean
}

const ComponentUnderTest = (props: Optional<SelectProps<Item>, 'items'>) => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Select.Root items={items} {...props}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator />
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup id="framework">
              <Select.ItemGroupLabel htmlFor="framework">Frameworks</Select.ItemGroupLabel>
              {items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
describe('Select', () => {
  it.each(getParts(selectAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(selectAnatomy))('should export %s', async (part) => {
    expect(Select[part]).toBeDefined()
  })

  it('should handle item selection', async () => {
    render(<ComponentUnderTest />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)

    const item = screen.getByText('React')
    user.click(item)
    await waitFor(() => expect(trigger).toHaveTextContent('React'))
  })

  it('should close on select', async () => {
    render(<ComponentUnderTest />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)
    const item = screen.getByText('React')
    user.click(item)
    await waitFor(() => expect(screen.queryByText('Frameworks')).not.toBeVisible())
  })

  it('should be disabled when disabled is true', async () => {
    render(<ComponentUnderTest disabled />)
    const trigger = screen.getByRole('button', { name: 'Framework' })

    expect(trigger).toBeDisabled()
  })

  it('should handle multiple selection', async () => {
    render(<ComponentUnderTest multiple />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)
    const itemReact = screen.getByText('React')
    const itemVue = screen.getByText('Vue')
    user.click(itemReact)
    user.click(itemVue)
    await waitFor(() => expect(trigger).toHaveTextContent('React, Vue'))
  })

  it('should call onChange when item is selected', async () => {
    const onChange = vi.fn()
    render(<ComponentUnderTest onChange={onChange} />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)
    const item = screen.getByText('React')
    user.click(item)
    waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })

  it('should open menu when onOpen is called', async () => {
    const onOpen = vi.fn()
    render(<ComponentUnderTest onOpenChange={onOpen} />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)
    await waitFor(() => expect(onOpen).toHaveBeenCalledTimes(1))
  })

  it('should be read-only when readOnly is true', async () => {
    render(<ComponentUnderTest readOnly />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)
    await waitFor(() => expect(screen.queryByText('React')).not.toBeVisible())
  })
})
