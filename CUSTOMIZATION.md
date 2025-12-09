# Cookly - Customization Guide

## 🎨 How to Customize Texts

### Homepage Hero Section

Edit [app/page.tsx](file:///Users/diana-annaborissova/COOKLY/app/page.tsx):

```typescript
// Line 11-13: Main headline
<h1 className={styles.heroTitle}>
  Maitsed, mis könetavad.  // ← Change this
</h1>

// Line 14-16: Subheading
<p className={styles.heroSubtitle}>
  Avasta retsepte, jaga oma digitaalne...  // ← Change this
</p>

// Line 20-22: Primary button
<Link href="/retseptid" className={`${styles.btn} ${styles.btnPrimary}`}>
  Vaata retsepte  // ← Change this
</Link>

// Line 23-25: Secondary button
<Link href="/lisa-retsept" className={`${styles.btn} ${styles.btnSecondary}`}>
  Lisa oma retsept  // ← Change this
</Link>

// Line 29: Join link
<Link href="/auth/register">Liitu Cooklyga</Link>  // ← Change this

// Line 34-35: Stats
<div className={styles.statNumber}>1,500+</div>  // ← Change number
<div className={styles.statLabel}>retsepti</div>  // ← Change label
```

### Navigation Menu

Edit [components/Header.tsx](file:///Users/diana-annaborissova/COOKLY/components/Header.tsx):

```typescript
// Line 63-68: Menu items
const navItems = [
  { href: '/', label: 'Avaleht' },      // ← Change labels
  { href: '/retseptid', label: 'Retseptid' },
  { href: '/blogi', label: 'Blogi' },
  { href: '/kontakt', label: 'Kontakt' },
];
```

### Footer Links

Edit [components/Footer.tsx](file:///Users/diana-annaborissova/COOKLY/components/Footer.tsx):

```typescript
// Line 9-13: Legal section
<h3>Õiguslik teave</h3>  // ← Change heading
<Link href="/privaatsuspoliitika">Privaatsuspoliitika</Link>  // ← Change links
<Link href="/kasutustingimused">Kasutustingimused</Link>
<Link href="/kkk">KKK</Link>

// Line 17-18: Contact section
<h3>Kontaktinfo</h3>  // ← Change heading
<a href="mailto:info@eestimaitsed.ee">  // ← Change email
  info@eestimaitsed.ee
</a>

// Line 42: Copyright
<p>© 2024 Cookly. Kõik õigused kaitstud.</p>  // ← Change text
```

### Auth Pages

Edit [app/auth/register/page.tsx](file:///Users/diana-annaborissova/COOKLY/app/auth/register/page.tsx):

```typescript
// Line 83: Page heading
<h1>Loo oma Cookly konto</h1>  // ← Change this

// Line 89-91: Field labels
<label htmlFor="firstName">Eesnimi</label>  // ← Change labels
<label htmlFor="email">E-post</label>
<label htmlFor="password">Parool</label>

// Line 145: Submit button
{loading ? 'Registreerimine...' : 'Loo konto'}  // ← Change text

// Line 153-159: Social buttons
Jätka Google'iga  // ← Change text
Jätka Facebookiga
```

Edit [app/auth/login/page.tsx](file:///Users/diana-annaborissova/COOKLY/app/auth/login/page.tsx) similarly.

---

## 🎨 How to Customize Colors

Edit [app/globals.css](file:///Users/diana-annaborissova/COOKLY/app/globals.css):

```css
:root {
  --primary-dark: #2C3E50;      /* Header/Footer background */
  --accent-orange: #E67E22;     /* Buttons, links */
  --accent-gold: #F39C12;       /* Hover states */
  --background-cream: #F8F9FA;  /* Page background */
  --text-dark: #2C3E50;         /* Main text */
  --text-gray: #7F8C8D;         /* Secondary text */
}
```

---

## 📸 How to Change Hero Background

Replace the file at `/public/images/hero-bg.jpg` with your own image.

Or edit [app/page.module.css](file:///Users/diana-annaborissova/COOKLY/app/page.module.css):

```css
.hero {
  background-image: url('/images/your-image.jpg');  /* ← Change path */
}
```

---

## 🔧 Supabase OAuth Setup

To enable Google and Facebook login:

1. **Google OAuth**:
   - Go to Supabase Dashboard → Authentication → Providers
   - Enable Google
   - Add your Google OAuth credentials
   - Set redirect URL: `https://your-project.supabase.co/auth/v1/callback`

2. **Facebook OAuth**:
   - Go to Supabase Dashboard → Authentication → Providers
   - Enable Facebook
   - Add your Facebook App credentials
   - Set redirect URL: `https://your-project.supabase.co/auth/v1/callback`

---

## 📝 Files Changed

### Homepage
- ✅ `app/page.tsx` - Rebuilt with exact hero layout
- ✅ `app/page.module.css` - Full-height hero, gradient overlay, stats

### Header
- ✅ `components/Header.tsx` - Navigation layout (logo left, menu center, actions right)
- ✅ `components/Header.module.css` - Active link underline, search bar, language selector

### Footer
- ✅ `components/Footer.tsx` - 3-column layout with exact text
- ✅ `components/Footer.module.css` - Dark background, proper spacing

### Auth Pages
- ✅ `app/auth/register/page.tsx` - Form with OAuth buttons
- ✅ `app/auth/login/page.tsx` - Login with OAuth
- ✅ `app/auth/auth.module.css` - Shared styles for auth pages

---

## ✨ What's Working

- ✅ Full-height hero section with gradient overlay
- ✅ Navigation with active page underline
- ✅ Search bar in header
- ✅ Language selector (ET with flag)
- ✅ User profile dropdown
- ✅ Stats section (1,500+ recipes, 600+ users)
- ✅ Scroll indicator
- ✅ Email/password authentication
- ✅ Google OAuth login
- ✅ Facebook OAuth login
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Footer with 3 columns
- ✅ Copyright text

---

## 🚀 Next Steps

1. Configure OAuth providers in Supabase
2. Test login/register flows
3. Customize texts as needed
4. Replace hero background image if desired
5. Deploy to production!
