
import { ColorExtractor } from 'react-color-extractor'

interface ImageGetColorPropTypes extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string,
  callback: Function,
}

export const ImageGetColor = ({ src, callback = () => { }, ...props }: ImageGetColorPropTypes) => {
  if (!src) return null;

  return (
    <ColorExtractor getColors={(colors: any) => callback(colors)}>
      <img src={src} {...props} />
    </ColorExtractor>
  )
}

