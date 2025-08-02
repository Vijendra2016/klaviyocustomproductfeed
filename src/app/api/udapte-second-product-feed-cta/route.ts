import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const jsonData = body.jsonData as Record<string, string>;

    // Validate payload
    if (!jsonData || typeof jsonData !== "object" || Array.isArray(jsonData)) {
      return NextResponse.json({ error: "Invalid JSON object" }, { status: 400 });
    }

    const gistId = "0048bf1d0ad3fe396609877b2f509a0b"; // key-value gist
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!GITHUB_TOKEN) {
      return NextResponse.json({ error: "Missing GitHub token" }, { status: 500 });
    }

    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        files: {
          "secondproductfeedcta.json": {
            content: JSON.stringify(jsonData, null, 2),
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: 500 });
    }

    const data = (await response.json()) as unknown;
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
  }
}
