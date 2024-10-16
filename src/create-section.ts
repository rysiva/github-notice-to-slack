import { PullRequestEvent } from '@octokit/webhooks-types'
import { toSlackUsers } from './to-slack-users'

export interface Section {
  type: 'section'
  text: {
    type: 'mrkdwn'
    text: string
  }
}

// createSectionでメッセージの本文を作成。レビューアーの一覧とPRタイトルのリンクが表示される。
// toSlackUsersは Record<GithubAccountName, SlackAccountName> をハードコードで管理していて、Githubのアカウント名からSlackのメンションを作成している
export function createSection(payload: PullRequestEvent): Section {
  const {
    pull_request: { title, html_url, number, requested_reviewers }
  } = payload

  const reviewers = toSlackUsers(requested_reviewers)

  const sectionText = `${reviewers.join(' ')}\n*<${html_url}|#${number} - ${title}>*`
  const section: Section = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: sectionText
    }
  }

  return section
}
