import { redis } from "../lib/redis.js";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

 try {

  const start = Date.now();

  const username = req.body.variables.username.trim().toLowerCase();

  const cacheKey = `leetcode:${username}`;

  // 1. Check Redis first
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log(`✅ CACHE HIT (${Date.now() - start} ms): ${username}`);
    return res.status(200).json(cachedData);
}

  console.log("❌ CACHE MISS:", username);

  // 2. Fetch from LeetCode
  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();

  // 3. Store in Redis for 30 minutes
  const CACHE_EXPIRY = 60 * 30; // 30 minutes

  await redis.set(cacheKey, data, {
      ex: CACHE_EXPIRY,
  });

  console.log(`❌ CACHE MISS (${Date.now() - start} ms): ${username}`);

  return res.status(200).json(data);

} catch (error) {
  console.error(error);
  return res.status(500).json({
    error: "Failed to fetch from LeetCode",
  });
}
}
