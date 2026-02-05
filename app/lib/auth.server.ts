export interface AuthInfo {
  user: string | null;
  groups: string[];
}

export function parseAuthHeaders(request: Request): AuthInfo {
  const user = request.headers.get("Remote-User");
  const groupsHeader = request.headers.get("Remote-Groups");

  const groups = groupsHeader
    ? groupsHeader.split(",").map((g) => g.trim()).filter(Boolean)
    : [];

  return { user, groups };
}
