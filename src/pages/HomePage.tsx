import React, {useEffect, useRef, useState} from "react";
import {
  Container, Dimmer,
  Grid, Icon,
  Placeholder,
  Rail,
  Ref,
  Segment,
  Sticky,
} from "semantic-ui-react";
import {ChannelBar} from "./channel-bar/ChannelBar";
import {getList} from "../api";
import style from './HomePage.module.less'
import {debounce, fill} from "lodash";
import {MainList} from "./main-list/MainList";
import {LogoImage} from "./logo-image/LogoImage";
import {CreateTab} from "./create-tab/CreateTab";
import {Footer} from "./footer/Footer";
import {getAuth} from "../auth/auth";

export const HomePage: React.FC = () => {

  const contextRef = useRef<HTMLElement>(null)

  const [list, setList] = useState<ApiTypes.Item[] | null>(null)

  const [channel, setChannel] = useState<string>('fileow')

  const [loading, setLoading] = useState<boolean>(false)

  const [isAuth, setIsAuth] = useState<boolean>(getAuth())

  const handleLogoClick = () => {
    // TODO
    setIsAuth(false)
  }

  const handleChannelChange = (channel: string) => {
    setChannel(channel)
  }

  useEffect(() => {
    refreshList()
  }, [channel])

  useEffect(() => {
    if (list === null) {
      refreshList()
    }
  }, [list])

  const refreshList = () => {
    setLoading(true)
    getList({
      channel: channel
    }).then(res => {
      setLoading(false)
      setList(res.data.data)
    }).catch(() => {
      setList(null)
      setLoading(false)
    })
  }

  const debounceHandleChannelChange = debounce(handleChannelChange, 300)

  const placeholder = fill(
    new Array(5),
    (<Placeholder>
      <Placeholder.Line/>
      <Placeholder.Line/>
      <Placeholder.Line/>
      <Placeholder.Line/>
    </Placeholder>),
    0,
    4
  )

  return (
    <>
      <div ref={contextRef as React.RefObject<HTMLDivElement>}>
        <Sticky context={contextRef}>
          <Container className={style.channelBar}>
            <ChannelBar handler={debounceHandleChannelChange}/>
          </Container>
        </Sticky>
        <Segment attached='bottom'>
          <Grid divided="vertically">
            <Grid.Row columns={1}>
              <Grid centered columns={3}>
                <Grid.Column>
                  <Ref innerRef={contextRef}>
                    <Segment>
                      <Container className={style.mainList}>
                        {loading && placeholder.map(x => x)}
                        {!loading && list && list.length === 0 &&
                          <Dimmer active={true} inverted>
                          <Icon size='big' className='file outline' color='black'/>
                            <p className={style.emptyListTip}>Nothing is here ^_^</p>
                          </Dimmer>
                        }
                        {list === null && !loading &&
                        <Dimmer active={true}>
                          <Icon size='big' className='times circle outline' color='red'/>
                          <p>Encountered japanese goblin's attack T_T</p>
                        </Dimmer>
                        }
                        {list !== null && !loading && <MainList data={list} displayRemove={isAuth}/>}
                      </Container>
                      <Rail position='left'>
                        <Sticky context={contextRef}>
                          <Container className={style.logoImage}>
                            <LogoImage onClick={handleLogoClick}/>
                          </Container>
                        </Sticky>
                      </Rail>
                      <Rail position='right'>
                        <Sticky context={contextRef}>
                          <Container className={style.createTab}>
                            <CreateTab channel={channel} itemCreateHandler={refreshList}/>
                          </Container>
                        </Sticky>
                      </Rail>
                    </Segment>
                  </Ref>
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
      <Footer/>
    </>
  )
}
