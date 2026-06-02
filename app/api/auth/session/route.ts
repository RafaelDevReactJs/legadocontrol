import { NextResponse } from "next/server";
import { AUTH_FLAG_COOKIE } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      access_token?: string;
      expires_in?: number;
    };

    if (!body.access_token) {
      return NextResponse.json(
        { message: "Token de acesso obrigatório." },
        { status: 400 }
      );
    }

    const maxAge =
      typeof body.expires_in === "number" && body.expires_in > 0
        ? body.expires_in
        : 3600;

    const response = NextResponse.json({ ok: true });

    response.cookies.set(AUTH_FLAG_COOKIE, "1", {
      path: "/",
      maxAge,
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Erro ao salvar sessão." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(AUTH_FLAG_COOKIE, "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
