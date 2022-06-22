import { ButtonHTMLAttributes, useState } from 'react'
import ValuePicker from './ValuePicker'
import IconButton from '../../ui/IconButton'
import { RefreshCw, Trash } from 'react-feather'
import { Theme } from '../../../types/theme'
import { randomColor } from '../../../lib/color'
import { Color } from '../../../types/css'

export interface Props {
  value: Color
  onChange(value: Color): void
  theme?: Theme
  /** If provided, a label to render for the color picker */
  title?: string
  /** The initial tab to show on load */
  initialTab?: string
  /** If provided, will render a trash icon that calls `onRemove` when clicked */
  onRemove?(): void
  /**
   * Allows a custom regenerate function (e.g. for color contrast) when the user clicks
   * the regenerate button. If not provided, uses the default random color generator.
   */
  onRegenerate?(): Color
}

/**
 * The color picker field: provides a color picker that lets the user:
 *
 *  - pick a color value directly in multiple color modes
 *  - select a system color
 *  - select a palette color from the user theme
 *
 * The picker appears as a field taking up the entire parent space. If a popover is desired,
 * use ColorPopover instead.
 *
 */
export default function ColorPicker({
  value,
  onChange,
  theme,
  title,
  initialTab = 'picker',
  onRemove,
  onRegenerate,
}: Props) {
  const [tab, setTab] = useState(initialTab)
  return (
    <div>
      {/* <Tabs.Root value={tab} onValueChange={setTab}> */}
      {title && (
        <div
          sx={{
            textTransform: 'uppercase',
            opacity: 0.7,
            fontWeight: 800,
            margin: 0,
            width: '100%',
          }}
        >
          {title}
        </div>
      )}
      <div sx={{ display: 'flex', my: 1 }}>
        <div
          sx={{
            marginLeft: 'auto',
            display: 'flex',
          }}
        >
          {onRemove && (
            <ActionButton onClick={onRemove}>
              <Trash size={14} />
            </ActionButton>
          )}
          <ActionButton
            onClick={() => {
              // If a user-defined regenerator is given, use it
              if (onRegenerate) {
                onChange(onRegenerate())
                return
              } else {
                // Otherwise, regenerate a random color based on theme
                onChange(randomColor(theme))
              }
            }}
          >
            <RefreshCw size={14} />
          </ActionButton>
        </div>
      </div>
      <ValuePicker value={value} onChange={onChange} theme={theme} />
    </div>
  )
}

function ActionButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <IconButton
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
        borderRadius: '9999px',
        aspectRatio: '1 / 1',
        height: '1.5rem',
        width: '1.5rem',
        ':hover': {
          backgroundColor: 'backgroundOffset',
        },
      }}
      {...props}
    />
  )
}
