import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerTableContext } from './date-picker-table-context'

export interface DatePickerTableHeadProps extends HTMLArkProps<'thead'> {}

export const DatePickerTableHead = (props: DatePickerTableHeadProps) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(() => api().getTableHeadProps(tableProps), props)

  return <ark.thead {...mergedProps} />
}
