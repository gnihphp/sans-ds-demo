import { HTMLAttributes } from 'react'
import Link from 'next/link'

interface Props extends HTMLAttributes<HTMLDivElement> {}
export const Layout = (props: Props) => {
  return (
    <>
      <header
        sx={{
          fontFamily: 'body',
          borderBottom: 'thin solid',
          borderColor: 'border',
          px: [2, 3, 4],
          py: 2,
          fontSize: [2, 3],
        }}
      >
        <Link href="/" passHref={true}>
          <a sx={{ fontWeight: 500, color: 'text', textDecoration: 'none' }}>
            CSS GUI
          </a>
        </Link>
      </header>
      <div
        sx={{
          fontFamily: 'body',
          display: 'flex',
          flexDirection: ['column', 'row'],
        }}
        {...props}
      />
    </>
  )
}