import { styled } from '@material-ui/styles'
import { useEffect } from 'react'

const IconSvg = styled('svg')({
  width: '1em',
  height: '1em',
  verticalAlign: '-0.15em',
  fill: 'currentColor',
  overflow: 'hidden',
})

interface IconFontProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  name: string
}
export function IconFont(props: IconFontProps) {
  const { name, ...rest } = props
  useEffect(() => {
    require('../../../public/iconfont/font')
  }, [])
  return <IconSvg {...rest}>
    <use xlinkHref={`#${name}`}></use>
  </IconSvg>
}