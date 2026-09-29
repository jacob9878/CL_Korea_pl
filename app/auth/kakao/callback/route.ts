import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Kakao OIDC callback. This exists separately from /auth/callback because
// Supabase's built-in signInWithOAuth({ provider: "kakao" }) hardcodes the
// account_email scope, which non-Biz-app REST API keys can't grant (KOE205).
// Here we drive the Kakao authorize/token exchange ourselves, requesting
// only `openid profile_nickname`, and hand the resulting id_token to
// Supabase via signInWithIdToken() instead of letting Supabase talk to
// Kakao directly.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("state") ?? "/";
  if (!next.startsWith("/")) next = "/";

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      client_secret: process.env.KAKAO_CLIENT_SECRET!,
      redirect_uri: `${origin}/auth/kakao/callback`,
      code,
    }),
  });

  const tokenBody = await tokenRes.json().catch(() => null);

  if (!tokenRes.ok) {
    console.error("[kakao callback] token exchange failed", tokenRes.status, tokenBody);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const id_token = tokenBody?.id_token as string | undefined;
  if (!id_token) {
    console.error("[kakao callback] no id_token in response", tokenBody);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithIdToken({
    provider: "kakao",
    token: id_token,
  });

  if (error) {
    console.error("[kakao callback] signInWithIdToken failed", error.message, error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
