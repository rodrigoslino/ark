import { Index, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { SegmentGroup } from './'
import './segment-group.css'

const meta: Meta = {
  title: 'SegmentGroup',
}

export default meta

export const Basic = () => {
  const frameworks = ['React', 'Solid', 'Vue']
  return (
    <SegmentGroup.Root>
      <SegmentGroup.Indicator />
      <Index each={frameworks}>
        {(framework) => (
          <SegmentGroup.Item value={framework()}>
            <SegmentGroup.ItemText>{framework()}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
          </SegmentGroup.Item>
        )}
      </Index>
    </SegmentGroup.Root>
  )
}

export const Controlled = () => {
  const frameworks = ['React', 'Solid', 'Vue']
  const [value, setValue] = createSignal('React')
  return (
    <SegmentGroup.Root value={value()} onValueChange={(e) => setValue(e.value)}>
      <SegmentGroup.Indicator />
      <Index each={frameworks}>
        {(framework) => (
          <SegmentGroup.Item value={framework()}>
            <SegmentGroup.ItemText>{framework()}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
          </SegmentGroup.Item>
        )}
      </Index>
    </SegmentGroup.Root>
  )
}

export const Disabled = () => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  return (
    <SegmentGroup.Root>
      <SegmentGroup.Indicator />
      <Index each={frameworks}>
        {(framework) => (
          <SegmentGroup.Item value={framework()} disabled={framework() === 'Svelte'}>
            <SegmentGroup.ItemText>{framework()}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
          </SegmentGroup.Item>
        )}
      </Index>
    </SegmentGroup.Root>
  )
}
