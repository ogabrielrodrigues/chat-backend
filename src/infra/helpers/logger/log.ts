import { log } from 'console'

function capitalizeFirstLetter(str: string) {
  return str.split('')[0].toUpperCase() + str.slice(1)
}

export function logger(coxtext: string, event: string, message: string) {
  log('[%s] %s => %s', coxtext.toUpperCase(), capitalizeFirstLetter(event), message)
}
