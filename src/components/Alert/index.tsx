import { Box, Alert as BaseAlert, AlertProps, Stack } from '@material-ui/core'
import ReactDOM from 'react-dom'
import React from 'react'
import _ from 'lodash'


interface IProps {
  message?: string
  duration?: number
}

class State {
  notices: Notice[] = []
}

interface Notice {
  open: boolean
  duration: number
  message: string
  severity?: AlertProps['severity']
  key: string
}
class AlertComponent extends React.Component {
  state: State = new State()

  getNoticeKey() {
    const { notices } = this.state
    return `notice-${new Date().getTime()}-${notices.length}`
  }

  addNotice(notice) {
    const { notices } = this.state
    notice.key = this.getNoticeKey()
    if (notices.every(item => item.key !== notice.key)) {
      const result = [...notices, notice]
      this.setState({ notices: _.cloneDeep(result) })
    }
    return () => {
      this.removeNotice(notice)
    }
  }

  removeNotice(notice: Notice) {
    setTimeout(() => {
      this.setState((prevState: State) => ({
        notices: prevState.notices.filter(item => item.key !== notice.key),
      }))
    }, notice.duration + this.state.notices.length * 800)
  }

  handleClose(index) {
    const { notices } = this.state
    notices[index].open = false
    this.setState({
      notices,
    })
  }

  render(): React.ReactNode {
    const { notices } = this.state

    return <Box width="100%" position="fixed" top="0" left="0" zIndex={10000} display="flex" alignItems="center" flexDirection="column" >
      {
        notices.map((notice) => {
          return <Stack key={notice.key} sx={{ minWidth: 400, mt: 2 }} spacing={2}>
            <BaseAlert severity={notice.severity}>{notice.message}</BaseAlert>
          </Stack>
        })
      }
    </Box>
  }
}

function createAlert() {
  const div = document.createElement('div')
  document.body.append(div)
  // eslint-disable-next-line react/no-render-return-value
  const alertComp: any = ReactDOM.render(<AlertComponent />, div)
  return {
    open(props: IProps) {
      alertComp.addNotice(props)()
    },
    close() {
      ReactDOM.unmountComponentAtNode(div)
      document.removeChild(div)
    },
  }
}


let notification
const notice = (type: AlertProps['severity'], message, duration) => {
  if (!notification) {
    notification = createAlert()
  }
  return notification.open({ severity: type, message, duration, open: true } as IProps)
}

export const Alert = {
  info(content, duration = 2000) {
    return notice('info', content, duration)
  },
  success(content, duration = 2000) {
    return notice('success', content, duration)
  },
  warning(content, duration = 2000) {
    return notice('warning', content, duration)
  },
  error(content, duration = 2000) {
    return notice('error', content, duration)
  },
}





