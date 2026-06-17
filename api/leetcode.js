const redis = require("../lib/redis");

export default async function handler(req, res) {

  await redis.set("test", "hello");

  const value = await redis.get("test");

  console.log(value);


  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
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
    return res.status(200).json(data);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch from LeetCode' });
  }
}
