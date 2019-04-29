import { BadJokeServiceProd } from './BadJokeService.Prod'
import { BadJokeServiceDev } from './BadJokeService.Dev'

export const BadJokeService = process.env.NODE_ENV === 'production' ? BadJokeServiceProd : BadJokeServiceDev
