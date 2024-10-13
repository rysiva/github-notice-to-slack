import { PullRequestEvent } from '@octokit/webhooks-types'
import { toSlackUser } from './to-slack-user'

interface ImageElement {
  type: 'image'
  image_url: string
  alt_text: string
}

interface TextElement {
  type: 'mrkdwn'
  text: string
}

export interface Context {
  type: 'context'
  elements: (ImageElement | TextElement)[]
}

// createContextはFooterみたいなやつで、PR作成者とそのレポジトリ名が表示されるようになっている
export function createContext(payload: PullRequestEvent): Context {
  const {
    pull_request: { user },
    repository: { full_name }
  } = payload

  const creator = toSlackUser(user.login)

  const contextText = `${creator} - :github: ${full_name}`

  const context: Context = {
    type: 'context',
    elements: [
      {
        type: 'image',
        image_url: user.avatar_url,
        alt_text: user.login
      },
      {
        type: 'mrkdwn',
        text: contextText
      }
    ]
  }

  return context
}
