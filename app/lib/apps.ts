export type Category = "media" | "ai" | "productivity" | "development" | "admin";

export interface AppDefinition {
  id: string;
  name: string;
  url: string;
  category: Category;
  minTier: number;
  icon: string;
}

const tiers = {
  friends: 1,
  family: 2,
  lldap_admin: 3,
} as const;

export function getUserTier(groups: string[]): number {
  if (groups.includes("lldap_admin")) return 3;
  if (groups.includes("family")) return 2;
  if (groups.includes("friends")) return 1;
  return 0;
}

export const apps: AppDefinition[] = [
  // Media (tier 1 - friends)
  { id: "plex", name: "Plex", url: "https://plex.daddyshome.fr", category: "media", minTier: 1, icon: "plex" },
  { id: "stremio", name: "Stremio", url: "https://stremio.daddyshome.fr", category: "media", minTier: 1, icon: "stremio" },
  { id: "kyoo", name: "Kyoo", url: "https://kyoo.daddyshome.fr", category: "media", minTier: 1, icon: "kyoo" },

  // AI (tier 1 - friends)
  { id: "openwebui", name: "OpenWebUI", url: "https://ai.daddyshome.fr", category: "ai", minTier: 1, icon: "ai" },

  // Productivity (tier 2 - family)
  { id: "nextcloud", name: "Nextcloud", url: "https://drive.daddyshome.fr", category: "productivity", minTier: 2, icon: "nextcloud" },
  { id: "immich", name: "Immich", url: "https://photos.daddyshome.fr", category: "productivity", minTier: 2, icon: "immich" },

  // Media (tier 3 - admin)
  { id: "seerr", name: "Seerr", url: "https://seerr.daddyshome.fr", category: "media", minTier: 3, icon: "seerr" },
  { id: "sonarr", name: "Sonarr", url: "https://sonarr.daddyshome.fr", category: "media", minTier: 3, icon: "sonarr" },
  { id: "radarr", name: "Radarr", url: "https://radarr.daddyshome.fr", category: "media", minTier: 3, icon: "radarr" },
  { id: "prowlarr", name: "Prowlarr", url: "https://prowlarr.daddyshome.fr", category: "media", minTier: 3, icon: "prowlarr" },
  { id: "qbittorrent", name: "qBittorrent", url: "https://qbittorrent.daddyshome.fr", category: "media", minTier: 3, icon: "qbittorrent" },

  // Productivity (tier 3 - admin)
  { id: "stalwart", name: "Stalwart Mail", url: "https://mail.daddyshome.fr", category: "productivity", minTier: 3, icon: "mail" },
  { id: "n8n", name: "n8n", url: "https://n8n.daddyshome.fr", category: "productivity", minTier: 3, icon: "n8n" },

  // Development (tier 3 - admin)
  { id: "code-server", name: "Code Server", url: "https://coder.daddyshome.fr", category: "development", minTier: 3, icon: "code" },
  { id: "gitea", name: "Gitea", url: "https://gitea.daddyshome.fr", category: "development", minTier: 3, icon: "gitea" },

  // Admin (tier 3 - admin)
  { id: "lldap", name: "LLDAP", url: "https://lldap.daddyshome.fr", category: "admin", minTier: 3, icon: "users" },
  { id: "ddns-updater", name: "DDNS Updater", url: "https://ddns-updater.daddyshome.fr", category: "admin", minTier: 3, icon: "dns" },
];

export function getVisibleApps(userTier: number): AppDefinition[] {
  return apps.filter((app) => userTier >= app.minTier);
}

export function groupAppsByCategory(
  visibleApps: AppDefinition[]
): Map<Category, AppDefinition[]> {
  const grouped = new Map<Category, AppDefinition[]>();

  for (const app of visibleApps) {
    const existing = grouped.get(app.category) || [];
    existing.push(app);
    grouped.set(app.category, existing);
  }

  return grouped;
}

export const categoryLabels: Record<Category, string> = {
  media: "Media",
  ai: "AI",
  productivity: "Productivity",
  development: "Development",
  admin: "Admin",
};

export const categoryOrder: Category[] = [
  "media",
  "ai",
  "productivity",
  "development",
  "admin",
];
