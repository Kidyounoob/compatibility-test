import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ────────────────────────────────────────────────────────────────
//  👇  CHANGE THIS to match your GitHub repository name.
//  If your repo is  github.com/yourname/homecoming-proposal
//  then REPO_NAME must be  'homecoming-proposal'.
//
//  If you deploy to a custom domain or a "username.github.io" repo,
//  set REPO_NAME = '' (empty string).
// ────────────────────────────────────────────────────────────────
const REPO_NAME = 'compatibility-test'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Local dev is served from '/', production build is nested under /REPO_NAME/
  base: command === 'build' && REPO_NAME ? `/${REPO_NAME}/` : '/',
}))
