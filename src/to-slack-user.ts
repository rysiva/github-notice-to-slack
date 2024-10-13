export function toSlackUser(githubUsername: string): string {
  const userMappings: Record<string, string> = {
    rysiva: 'Ryohei'
  }

  const slackUsername = userMappings[githubUsername]
  return slackUsername ? `<@${slackUsername}>` : githubUsername
}
