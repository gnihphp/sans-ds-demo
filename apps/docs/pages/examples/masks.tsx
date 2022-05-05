import { codegen, Editor, Inputs, styled, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'
import { defaultTheme } from '../../data/default-theme'

const initialStyles = {
  mask: [
    {
      clip: 'border-box',
      image: {
        type: 'url',
        arguments: ['https://source.unsplash.com/random'],
      },
      origin: 'border-box',
      position: {
        x: { value: 0, type: '%' },
        y: { value: 0, type: '%' },
      },
      repeat: {
        x: 'no-repeat',
        y: 'no-repeat',
      },
      size: {
        type: 'dimensions',
        x: { value: 100, unit: '%' },
        y: { value: 100, unit: '%' },
      },
      composite: 'add',
      mode: 'luminance',
    },
  ],
}

export default function MaskExample() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div sx={{ display: 'grid', gridTemplateColumns: '18rem 1fr' }}>
      <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
        <Inputs.Mask />
      </Editor>
      <img src="https://source.unsplash.com/random" sx={toCSSObject(styles)} />
    </div>
  )
}
