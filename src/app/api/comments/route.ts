import { NextRequest, NextResponse } from "next/server";
import { getCommentsFromPost } from "@/lib/instagramScraper";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body?.url as string | undefined;

    if (!url || !url.includes("instagram.com")) {
      return NextResponse.json(
        { error: "Sua URL foi inválida" },
        { status: 400 }
      );
    }

    const participants = await getCommentsFromPost(url);

    return NextResponse.json({
      participants,
      total: participants.length,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Falha ao obter comentários";
    console.error("API /api/comments:", message);

    return NextResponse.json(
      { error: "Falha ao obter comentários", details: message },
      { status: 500 }
    );
  }
}

// Opcional: GET para testar no navegador
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url || !url.includes("instagram.com")) {
    return NextResponse.json(
      { error: "Passe ?url=https://www.instagram.com/p/..." },
      { status: 400 }
    );
  }

  try {
    const participants = await getCommentsFromPost(url);
    return NextResponse.json({ participants, total: participants.length });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Falha ao obter comentários";
    return NextResponse.json(
      { error: "Falha ao obter comentários", details: message },
      { status: 500 }
    );
  }
}