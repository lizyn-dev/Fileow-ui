import React from "react";
import {Image} from "semantic-ui-react";
import imageUrl from '/assets/logo.jpg'
import style from './LogoImage.module.less'

interface LogoImageProps {
  onClick?: (data: string) => void
}

export const LogoImage: React.FC<LogoImageProps> = (props: LogoImageProps) => {
  return (
    <Image className={style.logoImage} src={imageUrl} bordered onClick={props.onClick}/>
  )
}
