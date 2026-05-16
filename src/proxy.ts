import { NextResponse, type NextRequest } from "next/server";

const adminRealm = "99blog Admin";

function unauthorized(message = "需要后台访问凭证") {
  return new NextResponse(message, {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${adminRealm}"`,
    },
  });
}

function isLocalDevelopment() {
  return process.env.NODE_ENV !== "production";
}

function getAdminCredentials() {
  const user = process.env.ADMIN_BASIC_AUTH_USER?.trim() ?? "";
  const password = process.env.ADMIN_BASIC_AUTH_PASSWORD?.trim() ?? "";

  return { user, password };
}

function parseBasicAuth(header: string | null) {
  if (!header?.startsWith("Basic ")) {
    return undefined;
  }

  try {
    const decoded = atob(header.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex < 0) {
      return undefined;
    }

    return {
      user: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return undefined;
  }
}

export function proxy(request: NextRequest) {
  const credentials = getAdminCredentials();

  if (!credentials.user || !credentials.password) {
    if (isLocalDevelopment()) {
      return NextResponse.next();
    }

    return unauthorized("生产环境缺少后台访问凭证配置");
  }

  const provided = parseBasicAuth(request.headers.get("authorization"));

  if (provided?.user === credentials.user && provided.password === credentials.password) {
    return NextResponse.next();
  }

  return unauthorized();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
