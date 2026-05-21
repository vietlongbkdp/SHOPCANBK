export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const token  = process.env.GITHUB_TOKEN;
  const owner  = process.env.GITHUB_OWNER || 'vietlongbkdp';
  const repo   = process.env.GITHUB_REPO  || 'SHOPCANBK';
  const path   = 'src/data.json';

  if (!token) return res.status(500).json({ error: 'GITHUB_TOKEN chưa được cấu hình' });

  try {
    // 1. Get current file SHA (required by GitHub API to update)
    const fileRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      { headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'CandientubkApp' } }
    );
    const fileData = await fileRes.json();
    const sha = fileData.sha;

    // 2. Encode new content to base64
    const content = Buffer.from(JSON.stringify(req.body, null, 2)).toString('base64');

    // 3. Push update to GitHub
    const updateRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'CandientubkApp',
        },
        body: JSON.stringify({
          message: 'admin: cập nhật data.json qua trang quản trị',
          content,
          sha,
        }),
      }
    );

    const result = await updateRes.json();
    if (!updateRes.ok) return res.status(400).json({ error: result.message });

    return res.status(200).json({ success: true, commit: result.commit?.sha });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
