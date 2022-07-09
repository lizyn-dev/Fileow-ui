import React from "react";
import {Container} from "semantic-ui-react";
import style from './Footer.module.less'

export const Footer: React.FC = () => {
  return (
    <>
      <Container className={style.footer}>
        <div>Powered By <a href='https://github.com/lizyn-dev' target='_blank'>Lizyn Dev</a></div>
      </Container>
    </>
  )
}
