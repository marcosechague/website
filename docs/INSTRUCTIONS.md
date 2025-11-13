# 🚀 INSTALLATION GUIDE - Next.js Portfolio

## 📋 Prerequisites

Before starting, make sure you have installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **Git** (optional, for version control)

To verify if you have them installed:

```bash
node --version
npm --version
```

---

## 📦 STEP 1: Download the Project

You have the project in: `/mnt/user-data/outputs/portfolio-nextjs/`

Download it completely to your local computer.

---

## 🔧 STEP 2: Install Dependencies

Open a terminal in the project folder and run:

```bash
cd portfolio-nextjs
npm install
```

This will install all necessary dependencies (Next.js, React, TypeScript, etc.)

---

## 🎯 STEP 3: Run in Development Mode

Once dependencies are installed, run:

```bash
npm run dev
```

You'll see something like:

```
> portfolio-marcos-echague@1.0.0 dev
> next dev

  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.X:3000

 ✓ Ready in 2.3s
```

Open your browser at: **http://localhost:3000**

---

## 🏗️ STEP 4: Build for Production

When you're ready to deploy:

```bash
npm run build
npm start
```

This will create an optimized version of your application.

---

## 🌐 STEP 5: Deploy Online

### Option A: Vercel (Recommended - Free)

1. Go to [vercel.com](https://vercel.com)
2. Create an account (you can use GitHub)
3. Click "Add New Project"
4. Upload your folder or connect your GitHub repository
5. Vercel will automatically detect it's Next.js
6. Click "Deploy"
7. Done! Your site will be online in minutes

**Example URL:** `your-portfolio.vercel.app`

### Option B: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag the `.next` folder after running `npm run build`
3. Deployed!

---

## 📝 Project Structure

```
portfolio-nextjs/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── Header.tsx       # Navigation bar
│   │   ├── Header.module.css
│   │   ├── Hero.tsx         # Main section
│   │   └── Hero.module.css
│   ├── styles/
│   │   └── globals.css      # Global styles
│   ├── layout.tsx           # Main layout (metadata, structure)
│   └── page.tsx             # Home page
├── public/                  # Static files (images, etc.)
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── next.config.js           # Next.js configuration
```

---

## 🎨 Customization

### Change Colors

Edit `/app/styles/globals.css`:

```css
:root {
  --primary: #00ff88; /* Primary color */
  --secondary: #00d4ff; /* Secondary color */
  --bg-dark: #0a0e27; /* Dark background */
  /* ... */
}
```

### Add Your Information

Edit `/app/components/Hero.tsx` and `/app/page.tsx` with your personal information.

### Add Sections

Create new components in `/app/components/`:

- `About.tsx`
- `Experience.tsx`
- `Projects.tsx`
- `Contact.tsx`

---

## 🐛 Troubleshooting

### Error: "Module not found"

```bash
rm -rf node_modules
npm install
```

### Port 3000 busy

```bash
# Use another port
npm run dev -- -p 3001
```

### TypeScript errors

```bash
# Check tsconfig.json file
npm run lint
```

---

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vercel Deployment](https://vercel.com/docs)

---

## 🆘 Quick Commands

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production
npm run build
npm start

# Linter
npm run lint

# Clear cache
rm -rf .next
npm run dev
```

---

## ✅ Deployment Checklist

Before deploying, make sure to:

- [ ] Update personal information (name, links, email)
- [ ] Test in development mode (`npm run dev`)
- [ ] Run build without errors (`npm run build`)
- [ ] Verify social media links
- [ ] Optimize images
- [ ] Review SEO metadata in `layout.tsx`
- [ ] Test in different browsers
- [ ] Test on mobile (responsive)

---

## 🎓 Next Steps

1. **Complete the Sections:**

   - Create components for About, Experience, Projects, Contact
   - Add your real information

2. **Improve SEO:**

   - Add custom meta tags
   - Include sitemap
   - Optimize images

3. **Add Functionality:**

   - Contact form with EmailJS or Formspree
   - Blog with MDX
   - Analytics with Google Analytics or Vercel Analytics

4. **Optimization:**
   - Use `next/image` for images
   - Implement lazy loading
   - Add Service Worker for PWA

---

## 💡 Pro Tips

- **Hot Reload:** Changes are automatically reflected in development
- **TypeScript:** Use types to avoid errors
- **CSS Modules:** Styles are encapsulated per component
- **SEO Friendly:** Next.js generates static HTML for better SEO
- **Performance:** Next.js automatically optimizes your code

---

## 🤝 Support

If you have problems:

1. Read Next.js documentation
2. Search on Stack Overflow
3. Check Next.js GitHub issues
4. Ask in the Next.js Discord community

---

Good luck with your portfolio! 🚀
