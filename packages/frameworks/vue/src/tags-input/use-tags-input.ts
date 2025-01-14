import * as tagsInput from '@zag-js/tags-input'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseTagsInputProps = Optional<tagsInput.Context, 'id'> & {
  modelValue?: tagsInput.Context['value']
}
export type UseTagsInputReturn = ComputedRef<tagsInput.Api<PropTypes>>

export const useTagsInput = (
  props: UseTagsInputProps,
  emit: CallableFunction,
): UseTagsInputReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    tagsInput.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onValueChange(details) {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
      onValueInvalid(details) {
        emit('value-invalid', details)
      },
      onHighlightChange(details) {
        emit('highlight-change', details)
      },
    }),
    { context },
  )

  return computed(() => tagsInput.connect(state.value, send, normalizeProps))
}
