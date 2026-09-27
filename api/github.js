export default async function handler(req, res) {
  const username = req.query.username;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    return res.status(400).json({ error: "Missing 'username' query parameter" });
  }
  if (!token) {
    return res.status(500).json({ error: "GITHUB_TOKEN is not set" });
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
  });

  const result = await response.json();

  if (!response.ok || result.errors || !result.data?.user) {
    console.error("GitHub GraphQL error:", result.errors || result);
    return res.status(502).json({
      error: "Failed to fetch contributions from GitHub",
      details: result.errors || null,
    });
  }

  const days =
    result.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays
    );

  return res.status(200).json({
    contributions: days.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      color: day.color,
    })),
  });
}