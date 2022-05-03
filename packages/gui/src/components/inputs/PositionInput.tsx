import { EditorPropsWithLabel, getInputProps } from '../../lib/util'
import { Position } from '../../types/css'
import { Label } from '../primitives'
import { LengthInput } from './LengthInput'

export function PositionInput(props: EditorPropsWithLabel<Position>) {
  return (
    <div>
      <Label>{props.label}</Label>
      <LengthInput
        {...getInputProps(props, 'x')}
        percentage
        keywords={['left', 'center', 'right']}
      />
      <LengthInput
        {...getInputProps(props, 'y')}
        percentage
        keywords={['top', 'center', 'bottom']}
      />
    </div>
  )
}