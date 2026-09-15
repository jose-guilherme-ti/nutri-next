export type Participant = {
  username: string;
  profilePic: string | null;
  fullName: string | null;
};

const EXCLUDED = ["nutripolianacampos"];

export async function getCommentsFromPost(
  postUrl: string
): Promise<Participant[]> {
  const API_KEY = process.env.SCRAPE_CREATORS_API_KEY;

  if (!API_KEY) {
    throw new Error("SCRAPE_CREATORS_API_KEY não configurada");
  }

  if (!postUrl.includes("instagram.com")) {
    throw new Error("URL inválida");
  }

  const response = await fetch(
    `https://api.scrapecreators.com/v2/instagram/post/comments?url=${encodeURIComponent(postUrl)}`,
    {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      // Evita cache agressivo em serverless
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || data?.error || "Falha ao buscar comentários"
    );
  }

  const comments = data?.comments || [];
  const map = new Map<string, Participant>();

  for (const comment of comments) {
    const user = comment.user;
    if (!user?.username) continue;

    const username = user.username as string;
    if (EXCLUDED.includes(username.toLowerCase())) continue;
    if (map.has(username)) continue;

    map.set(username, {
      username,
      profilePic: user.profile_pic_url || null,
      fullName: user.full_name || null,
    });
  }

  return Array.from(map.values());
}