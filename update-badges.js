const fs = require('fs');
const octokit = require('./src/octokit');

const run = async (org, teamSlug) => {
  try {
    const members = await octokit.teams.listMembersInOrg({
      org: org,
      team_slug: teamSlug
    });
    const badges = [];
    members.data.forEach(member => {
      const {html_url, avatar_url, login} = member;
      badges.push(`[![${login}](${avatar_url}&s=60)](${html_url})`);
    });
    fs.writeFileSync('./docs/_includes/generated-members.md', badges.join(""));
  } catch (e) {
    console.error(e);
  }
};

run('navikt', 'teampensjon');
