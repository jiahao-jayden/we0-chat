import colors from 'colors'

const log = console.log
const error = console.error
const warn = console.warn

const logger = {
  info: (string: string) => {
    log(colors.green(string))
  },
  error: (string: string) => {
    error(colors.red(string))
  },
  warn: (string: string) => {
    warn(colors.yellow(string))
  }
}

export default logger
