import { NextResponse } from "next/server";

export async function GET() {
  const gistId = "1df33cd7f4202874d94b8dbb8b2c291f";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "Missing GitHub token" }, { status: 500 });
  }

  const res = await fetch(`https://api.github.com/gists/${gistId}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: text }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
