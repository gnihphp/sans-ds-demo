import { toCSSObject } from '../../lib'
import { ElementData, ElementPath } from './types'
import { HTMLFontTags } from './FontTags'
import { useHtmlEditor } from './Provider'
import { isVoidElement } from '../../lib/elements'
import { isSamePath } from './util'

interface HtmlRendererProps {
  value: ElementData
  path?: ElementPath
}
export function HtmlRenderer({ value }: HtmlRendererProps) {
  return (
    <>
      <HTMLFontTags htmlTree={value} />
      <ElementRenderer value={value} path={[] as ElementPath} />
    </>
  )
}

interface ElementRendererProps {
  value: ElementData
  path: ElementPath
}
function ElementRenderer({ value, path }: ElementRendererProps) {
  const { selected, setSelected } = useHtmlEditor()
  const { attributes = {}, style = {}, children = [] } = value
  const Tag: any = value.tagName || 'div'

  const sx = toCSSObject(style)

  if (isSamePath(path, selected)) {
    sx.outlineWidth = 'thin'
    sx.outlineStyle = 'solid'
    sx.outlineColor = 'primary'
  }

  const props = {
    ...cleanAttributes(attributes),
    sx,
    onClick: (e: MouseEvent) => {
      e.stopPropagation()
      setSelected(path)
    },
  }

  if (isVoidElement(Tag)) {
    return <Tag {...props} />
  }

  return (
    <span sx={{ cursor: 'default', a: { cursor: 'default' } }}>
      <Tag {...props}>
        {children.map((child, i) => {
          if (typeof child === 'string') {
            return child
          }
          return <ElementRenderer key={i} value={child} path={[...path, i]} />
        })}
      </Tag>
    </span>
  )
}

const cleanAttributes = (attributes: Record<string, string>) => {
  const newAttributes = { ...attributes }

  if (newAttributes.href) {
    newAttributes.href = '#'
  }

  if (newAttributes.class) {
    newAttributes.className = newAttributes.class
    delete newAttributes.class
  }

  return newAttributes
}
