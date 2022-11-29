import { createContext } from '../createContext'
import type { UseTooltipReturn } from './use-tooltip'

export type TooltipContext = UseTooltipReturn

export const [TooltipProvider, useTooltipContext] = createContext<TooltipContext>({
  hookName: 'useTooltipContext',
  providerName: '<TooltipProvider />',
})