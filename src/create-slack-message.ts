import * as core from '@actions/core'
import * as github from '@actions/github'
import { PullRequestEvent } from '@octokit/webhooks-types'
import { createContext } from './create-context'
import { createSection } from './create-section'

export function createSlackMessage(): void {
  const payload = github.context.payload as PullRequestEvent

  if (payload.action !== 'opened') {
    throw new Error(
      'This action is supposed to be run on pull_request opened event'
    )
  }

  if (!payload.pull_request) {
    throw new Error('This action is supposed to be run on pull_request event')
  }

  const section = createSection(payload)
  const context = createContext(payload)

  const message = JSON.stringify({ blocks: [section, context] })

  core.setOutput('message', message)
}
