interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  const icons: Record<string, React.ReactNode> = {
    plex: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 2.5l8 4.6v9.8l-8 4.6-8-4.6V7.1l8-4.6z" />
        <path d="M12 5L6 8.5v7L12 19l6-3.5v-7L12 5z" />
      </svg>
    ),
    stremio: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="10,8 16,12 10,16" fill="currentColor" />
      </svg>
    ),
    kyoo: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
    nextcloud: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="5" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="19" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="8" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" />
        <line x1="15" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    immich: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
    seerr: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
        <path d="M11 8v3h3" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    sonarr: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M6 12h3M11 12h3M16 12h2" stroke="currentColor" strokeWidth="2" />
        <circle cx="7" cy="8" r="1" />
      </svg>
    ),
    radarr: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
    prowlarr: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
    qbittorrent: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
    mail: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <polyline points="2,4 12,13 22,4" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
    n8n: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <rect x="3" y="3" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="15" y="3" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="9" y="15" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="9" y1="6" x2="15" y2="6" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="9" x2="12" y2="15" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <polyline points="16,18 22,12 16,6" stroke="currentColor" strokeWidth="2" fill="none" />
        <polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
    gitea: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <circle cx="9" cy="7" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="17" cy="7" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M21 21v-2a3 3 0 0 0-3-3h-1" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
    dns: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="12" cy="12" rx="9" ry="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  };

  return icons[name] || icons.ai;
}
