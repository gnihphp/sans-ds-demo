import { Trash, ChevronUp, ChevronDown } from 'react-feather'
import { useState, ComponentType } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import IconButton from './ui/IconButton'

interface LayersProps<T> {
  value: T[]
  onChange(newValue: T[]): void
  /**
   * The component to render each of the individual input values.
   * (See `LayerProps` for what props this takes)
   */
  content: ComponentType<LayerProps<T>>

  /**
   * The content to show when the layer is collapsed.
   */
  header: ComponentType<{ value: T }>
  /** The label for the 'Add group' button */
  addLabel?: string
  /** The values that should be populated when a new item is added. */
  newItem(): T
}

export interface LayerProps<T> {
  value: T
  onChange(newValue: T): void
}

/**
 * An alternative field array that is collapsible.
 */
export default function Layers<T>({
  value = [],
  onChange,
  header: Header,
  content: Content,
  addLabel,
  newItem,
}: LayersProps<T>) {
  const [expanded, setExpanded] = useState(-1)

  const handleReorder = (i1: number, i2: number) => {
    onChange(flip(value, i1, i2))
  }

  return (
    <div
      sx={{
        border: '1px solid',
        borderColor: 'border',
        borderRadius: 8,
      }}
    >
      <Accordion.Root
        type="single"
        collapsible
        value={expanded.toString()}
        onValueChange={(i) => setExpanded(i === '' ? -1 : +i)}
      >
        {value.map((item, i) => {
          return (
            <Accordion.Item value={i.toString()} key={i}>
              <Accordion.Header
                sx={{ margin: 0, lineHeight: 0, position: 'relative' }}
              >
                <Accordion.Trigger
                  sx={{
                    width: '100%',
                    appearance: 'none',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid',
                    borderColor: 'border',
                    cursor: 'pointer',
                  }}
                >
                  <Header value={item} />
                </Accordion.Trigger>
                <div
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mr: 2,
                  }}
                >
                  <IconButton
                    title="Delete"
                    onClick={() => {
                      onChange(remove(value, i))
                      // If the deleted value was expanded, close it
                      if (i === expanded) {
                        setExpanded(-1)
                      } else if (i < expanded) {
                        // If the deleted value was at a lower index, adjust expanded value accordingly
                        setExpanded((v) => v - 1)
                      }
                    }}
                  >
                    <Trash size={16} />
                  </IconButton>
                  <div
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifySelf: 'right',
                      alignSelf: 'center',
                      gap: '-0.5rem',
                    }}
                  >
                    <IconButton
                      disabled={i === 0}
                      onClick={() => {
                        if (i > 0) {
                          handleReorder(i, i - 1)
                          if (i === expanded) {
                            setExpanded(i - 1)
                          } else if (i - 1 === expanded) {
                            setExpanded(i)
                          }
                        }
                      }}
                    >
                      <ChevronUp size={16} />
                    </IconButton>
                    <IconButton
                      disabled={i === value.length - 1}
                      onClick={() => {
                        if (i < value.length - 1) {
                          handleReorder(i, i + 1)
                        }
                        if (i === expanded) {
                          setExpanded(i + 1)
                        } else if (i + 1 === expanded) {
                          setExpanded(i)
                        }
                      }}
                    >
                      <ChevronDown size={16} />
                    </IconButton>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Content
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'border',
                }}
              >
                <Content
                  value={item}
                  onChange={(newValue) => {
                    onChange(replace(value, i, newValue))
                  }}
                />
              </Accordion.Content>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
      <button
        onClick={() => {
          onChange(value.concat([newItem()]))
        }}
        sx={{
          width: '100%',
          appearance: 'none',
          px: 0,
          py: 2,
          m: 0,
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          color: 'text',
        }}
      >
        {addLabel}
      </button>
    </div>
  )
}

// Return a new array with the given indices flipped
function flip<T>(array: T[], i1: number, i2: number) {
  const copy = [...array]
  copy[i1] = array[i2]
  copy[i2] = array[i1]
  return copy
}

// Return a new array with the value at the index removed
function remove<T>(array: T[], index: number) {
  const copy = [...array]
  copy.splice(index, 1)
  return copy
}

function replace<T>(array: T[], index: number, newValue: T) {
  const copy = [...array]
  copy.splice(index, 1, newValue)
  return copy
}