import { Box } from '@material-ui/core'
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
    console.log(notice)
    notice.key = this.getNoticeKey()
    if (notices.every(item => item.key !== notice.key)) {
      const result = [...notices, notice]
      console.log(result)
      this.setState({ notices: _.cloneDeep(result) })
    }
    return () => {
      this.removeNotice(notice.key)
    }
  }

  removeNotice(key) {
    setTimeout(() => {
      this.setState((prevState: State) => ({
        notices: prevState.notices.filter(notice => notice.key !== key),
      }))
    }, 2000)
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

    return <Box position="fixed" top="0" left="0">
      {
        notices.map((notice) => {
          return <Box key={notice.key}>{notice.message}</Box>
          // return <Snackbar
          //   key={notice.key}
          //   open={notice.open}
          //   style=
          //   anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          //   autoHideDuration={notice.duration}
          //   onClose={() => this.handleClose(index)}
          //   message={notice.message}
          // />
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
  console.log(alertComp)
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
const notice = (type, message, duration) => {
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
  loading(content, duration = 0) {
    return notice('loading', content, duration)
  },
}





