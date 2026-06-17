const redis = require("../lib/redis");

export default async function handler(req, res) {

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const username = req.body?.variables?.username;
    const cacheKey = `leetcode:${username}`;

    const cachedData = await redis.get(cacheKey);

      if (cachedData) {
          console.log(`CACHE HIT: ${username}`);

          return res.status(200).json(cachedData);
      }

      console.log(`CACHE MISS: ${username}`);
    // This runs on Vercel's server, bypassing browser CORS entirely!
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com', // LeetCode likes seeing this header
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

      if (
        data.data &&
        data.data.matchedUser
    ) {
        await redis.set(cacheKey, data, {
            ex: 3600,
        });

        console.log(`Stored ${username} in cache`);
    }

    return res.status(200).json(data);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch from LeetCode' });
  }
}
