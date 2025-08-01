import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const jsonData = body.jsonData as Record<string, string>;

    if (!jsonData || typeof jsonData !== "object") {
      return NextResponse.json({ error: "Invalid JSON object" }, { status: 400 });
    }

    const gistId = "aadfaef61cabe648e09ab848d2d23e31"; // second gist
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
          "gistfile1.json": { // filename for key-value feed
            content: JSON.stringify(jsonData, null, 2),
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown server error" }, { status: 500 });
  }
}
