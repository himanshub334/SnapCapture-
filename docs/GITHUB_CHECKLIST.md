# GitHub checklist

```bash
npm install
npm run typecheck
git init
git add .
git commit -m "feat: build native camera and media module"
git branch -M main
git remote add origin https://github.com/<username>/SnapCapture.git
git push -u origin main
```

If using GitHub CLI:

```bash
gh auth login
gh repo create SnapCapture --public --source=. --remote=origin --push
```
