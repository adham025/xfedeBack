# 🏘️ Property Listings Admin Panel — xfede.com

A mini admin panel for managing real estate projects and properties built for **xfede.com**. This tool enables administrators to add developers, projects, and properties with related metadata, images, and installment plans. It also includes a basic scoring system for properties based on user preferences.

---

## 🚀 Features

- Add new **developers**
- Add **real estate projects** linked to developers
- Add **properties** linked to projects with image uploads and installment plans
- View all projects and properties in a simple UI
- Optional: Auth support with Supabase, animations with Framer Motion

---

## 📚 Tech Stack

| Layer       | Tech Used                            |
|-------------|---------------------------------------|
| Frontend    | React + Remix _(or Next.js)_          |
| Styling     | Tailwind CSS                          |
| Backend     | Node.js _(Express if not using Remix)_|
| Database    | PostgreSQL _(Supabase or local)_      |
| ORM         | Drizzle ORM _(or Prisma/Sequelize)_   |
| File Upload | Uppy _(or simple file input)_         |
| Auth (Optional) | Supabase Auth Simulation         |

---

## 🛠️ Setup Instructions

### 1. Clone the Repositories

#### Backend

```bash
git clone https://github.com/adham025/xfedeBack.git
npm install
npm run dev
