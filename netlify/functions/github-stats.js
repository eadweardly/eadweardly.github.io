exports.handler = async function(event, context) {
  const username = 'eadweardly';
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: { 'User-Agent': 'portfolio-site' }
    });
    const user = await res.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: { 'User-Agent': 'portfolio-site' }
    });
    const repos = await reposRes.json();

    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        name: user.name,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        total_stars: totalStars,
        total_forks: totalForks,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch GitHub stats' }),
    };
  }
};
