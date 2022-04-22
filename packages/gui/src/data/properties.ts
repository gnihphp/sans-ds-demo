import { GLOBAL_KEYWORDS } from './global-keywords'

type PropertyData = {
  type: string
  percentage?: boolean
  number?: boolean
  keywords: Array<string>
  minValue?: number
  maxValue?: number
  defaultValue?: string
}

export const getPropertyData = (property?: string): PropertyData | null => {
  const propertyData = properties[property || '']
  return propertyData ?? null
}

export const properties: Record<string, PropertyData> = {
  backgroundColor: {
    type: 'color',
    defaultValue: '#fff',
    keywords: ['currentcolor', 'transparent', ...GLOBAL_KEYWORDS],
  },
  borderColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent', ...GLOBAL_KEYWORDS],
  },
  borderWidth: {
    type: 'length',
    keywords: ['thin', 'medium', 'thick', ...GLOBAL_KEYWORDS],
  },
  color: {
    type: 'color',
    keywords: ['currentcolor', 'transparent', ...GLOBAL_KEYWORDS],
  },
  display: {
    type: 'keyword',
    keywords: [
      'block',
      'inline',
      'inline-block',
      'flex',
      'inline-flex',
      'grid',
      'inline-grid',
      'flow-root',
      'none',
      'table',
      'table-row',
      'list-item',
      'block flow',
      'inline flow',
      'inline flow-root',
      'block flex',
      'inline flex',
      'block grid',
      'inline grid',
      'block flow-root',
      ...GLOBAL_KEYWORDS,
    ],
  },
  float: {
    type: 'keyword',
    keywords: [
      'left',
      'right',
      'none',
      'inline-start',
      'inline-end',
      ...GLOBAL_KEYWORDS,
    ],
  },
  fontSize: {
    type: 'length',
    percentage: true,
    keywords: [
      'xx-small',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large',
      'xxx-large',
      'smaller',
      'larger',
      ...GLOBAL_KEYWORDS,
    ],
  },
  fontStretch: {
    type: 'percentage',
    keywords: [
      'ultra-condensed',
      'extra-condensed',
      'condensed',
      'semi-condensed',
      'normal',
      'semi-expanded',
      'expanded',
      'extra-expanded',
      'ultra-expanded',
      ...GLOBAL_KEYWORDS,
    ],
    minValue: 50,
    maxValue: 200,
  },
  height: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content', 'auto', ...GLOBAL_KEYWORDS],
  },
  lineHeight: {
    type: 'length',
    percentage: true,
    number: true,
    keywords: ['normal', ...GLOBAL_KEYWORDS],
  },
  margin: {
    type: 'length',
    percentage: true,
    keywords: GLOBAL_KEYWORDS,
  },
  padding: {
    type: 'length',
    percentage: true,
    keywords: GLOBAL_KEYWORDS,
  },
  textAlign: {
    type: 'keyword',
    keywords: [
      'start',
      'end',
      'left',
      'right',
      'center',
      'justify',
      'justify-all',
      'match-parent',
      ...GLOBAL_KEYWORDS,
    ],
  },
  width: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content', 'auto', ...GLOBAL_KEYWORDS],
  },
  zIndex: {
    type: 'number',
    keywords: ['auto', ...GLOBAL_KEYWORDS],
  },
}
