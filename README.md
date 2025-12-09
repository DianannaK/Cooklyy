# Cookly - Estonian Recipe Sharing Platform

A modern, full-stack recipe website built with Next.js, TypeScript, and Supabase.

## Features

- 🔍 **Recipe Search** - Search by recipe name or ingredients
- 📝 **User Authentication** - Register, login, and manage your profile
- 🍳 **Recipe Management** - Add, view, and share recipes
- 👨‍💼 **Admin Panel** - Approve or reject pending recipes
- 📊 **Portion Calculator** - Automatically scale ingredients
- 📄 **PDF Export** - Export recipes and shopping lists
- 🛒 **Shopping Cart** - Combine ingredients from multiple recipes
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and App Router
- **Backend**: Supabase (PostgreSQL + Authentication + Storage)
- **Styling**: Vanilla CSS with custom design system
- **PDF Generation**: jsPDF

## Getting Started

### Prerequisites

- Node.js 18+ (Note: The project was created with Node 18, but Next.js 16 recommends Node 20+)
- A Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd COOKLY
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL Editor
   - Copy your project URL and anon key

4. Create environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL script to create tables, policies, and sample data

### Creating an Admin User

1. Register a new user through the website
2. In Supabase, go to Authentication → Users
3. Copy the user's ID
4. Run this SQL in the SQL Editor:
```sql
UPDATE user_profiles SET is_admin = true WHERE id = 'your-user-id';
```

## Project Structure

```
COOKLY/
├── app/                      # Next.js App Router pages
│   ├── admin/               # Admin panel
│   ├── auth/                # Authentication pages
│   ├── retseptid/           # Recipe pages
│   ├── lisa-retsept/        # Add recipe form
│   └── ...
├── components/              # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   └── RecipeCard.tsx
├── lib/                     # Utility functions
│   ├── supabase.ts         # Supabase client
│   ├── auth.ts             # Auth helpers
│   └── pdf.ts              # PDF generation
├── types/                   # TypeScript types
└── public/                  # Static assets
```

## Features Guide

### For Users

1. **Browse Recipes**: Visit the homepage or recipes page to browse approved recipes
2. **Search**: Use the search bar to find recipes by name or ingredients
3. **View Recipe**: Click on a recipe to see full details, adjust portions, and export to PDF
4. **Register**: Create an account to submit your own recipes
5. **Add Recipe**: Submit recipes for admin approval
6. **Shopping Cart**: Add recipes to your cart and export a combined shopping list

### For Admins

1. **Access Admin Panel**: Login with an admin account and click "Admin" in the header
2. **Review Recipes**: See all pending recipes
3. **Approve/Reject**: Click to approve or reject submitted recipes
4. **Preview**: View full recipe details before making a decision

## Customization

### Colors

Edit the CSS custom properties in `app/globals.css`:
```css
:root {
  --primary-dark: #2C3E50;
  --accent-orange: #E67E22;
  /* ... */
}
```

### Categories

Update the categories array in `app/retseptid/page.tsx` and `app/lisa-retsept/page.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- etc.

## License

MIT

## Support

For issues or questions, contact: info@eestimaitsed.ee
