import { User, Team } from '@octokit/webhooks-types'
import { toSlackUser } from './to-slack-user'

export function toSlackUsers(requestedReviewers: (User | Team)[]): string[] {
  return requestedReviewers.map(reviewer => {
    if ('login' in reviewer) {
      return toSlackUser(reviewer.login)
    }
    throw new Error('ログインプロパティが見つかりません')
  })
}
