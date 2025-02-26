import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxTriggerProps = HTMLArkProps<'button'>

export const ComboboxTrigger = defineComponent({
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
