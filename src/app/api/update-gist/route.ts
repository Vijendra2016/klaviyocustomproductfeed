import { NextResponse } from "next/server";

interface JsonItem {
  id: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { jsonData?: JsonItem[] };
    const jsonData = body.jsonData;

    if (!Array.isArray(jsonData)) {
      return NextResponse.json({ error: "Invalid JSON array" }, { status: 400 });
    }

    const gistId = "478e7b10fade2d4953b2563c6319490b"; // Your gist ID
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
          "viditest.json": {
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
