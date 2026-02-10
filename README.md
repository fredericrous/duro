# Duro

A homelab dashboard that displays apps based on user group membership. Apps are declared as Kubernetes CRDs (`DashboardApp`) and assembled into a ConfigMap by the operator.

## Architecture

```
DashboardApp CRs (per app namespace)
        │
        ▼
  duro-operator  ──▶  ConfigMap (duro-apps)
                            │
                            ▼
                     Duro React app
                     reads /data/apps.json
```

- **DashboardApp CRD**: Each app declares its name, URL, category, SVG icon, allowed groups, and priority
- **Operator**: Watches all `DashboardApp` resources cluster-wide, assembles them into a single `apps.json` ConfigMap
- **App**: React Router 7 SSR app that reads the ConfigMap and filters apps by the user's LDAP/OIDC groups (OR logic)

## DashboardApp Example

```yaml
apiVersion: dashboard.homelab.io/v1alpha1
kind: DashboardApp
metadata:
  name: plex
  namespace: plex
spec:
  name: Plex
  url: https://plex.example.com
  category: media
  icon: |
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0z"/>
    </svg>
  groups:
    - friends
    - family
    - admins
  priority: 10
```

### Spec Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | yes | Display name |
| `url` | yes | App URL |
| `category` | yes | One of: `media`, `ai`, `productivity`, `development`, `admin` |
| `icon` | yes | Raw SVG string |
| `groups` | yes | LDAP/OIDC groups that can see this app (OR logic) |
| `priority` | no | Sort order within category (lower = first, default 100) |

## Development

### App

```bash
npm install
npm run dev
```

Without a ConfigMap mounted at `/data/apps.json`, the app falls back to a set of default apps.

### Operator

```bash
cd operator
make test        # run unit tests
make manifests   # regenerate CRD and RBAC after changing markers
make generate    # regenerate deepcopy
make build       # build binary
```

## Deployment

The operator is deployed via Helm chart from [fredericrous/charts](https://github.com/fredericrous/charts):

```bash
helm repo add fredericrous https://fredericrous.github.io/charts
helm install duro-operator fredericrous/duro-operator
```

The chart installs the CRD, ClusterRole, and operator Deployment. Configure the target namespace and ConfigMap name via values:

```yaml
config:
  duroNamespace: duro
  duroConfigMap: duro-apps
```
