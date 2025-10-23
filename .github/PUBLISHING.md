# Publishing Guide

This repository uses GitHub Actions to automatically publish to npm when you push version tags.

## Setup (One-time)

### 1. Create an npm token

1. Go to https://www.npmjs.com/settings/johnruf/tokens
2. Click "Generate New Token"
3. Select **"Automation"** (for CI/CD)
4. Copy the token

### 2. Add token to GitHub Secrets

1. Go to your repository: https://github.com/john-paul-ruf/my-nft-zencoder-generated-effects-plugin
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **"Add secret"**

## Publishing a Release

When you're ready to publish a new version:

### 1. Update version in package.json
```bash
npm version patch  # or minor, major
```

This automatically:
- Updates package.json version
- Creates a git commit
- Creates a git tag

### 2. Push to GitHub
```bash
git push origin main
git push origin --tags
```

### 3. Watch the workflow
GitHub Actions automatically:
- Checks out your code
- Installs dependencies
- Publishes to npm
- Creates a GitHub Release

That's it! Your package is now live on npm.

## Versioning

Follow [Semantic Versioning](https://semver.org/):

- **PATCH** (1.0.X): Bug fixes and small improvements
  ```bash
  npm version patch
  ```

- **MINOR** (1.X.0): New features (backward compatible)
  ```bash
  npm version minor
  ```

- **MAJOR** (X.0.0): Breaking changes
  ```bash
  npm version major
  ```

## Troubleshooting

### "npm ERR! 401 Unauthorized"
- NPM_TOKEN secret not set or expired
- Regenerate token and update GitHub secret

### "npm ERR! 403 Forbidden"
- Check that username in package.json matches your npm account
- Ensure you have permissions to publish

### Workflow not triggering
- Tag must match pattern `v*` (e.g., `v1.0.0`, not `1.0.0`)
- Check Actions tab for error logs
- Verify repository settings allow Actions

## Manual Publishing (if needed)

```bash
npm login
npm publish
```

## Next Version Workflow

After initial `v1.0.0` release, use this pattern:

```bash
# Make your changes and commit
git add .
git commit -m "feat: new effect"

# Create and push version
npm version minor
git push origin main --tags

# Workflow runs automatically and publishes to npm
```

View your published package at:
https://www.npmjs.com/package/my-nft-zencoder-generated-effects-plugins