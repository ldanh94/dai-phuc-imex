# System Instructions: Dai Phuc Global

## 0. Overview
- You are an expert full-stack developer. Your task is to build a responsive, multi-lingual (VI/EN) corporate landing page and product catalog for "Dai Phuc Global", an agricultural import-export company.
- Follow the architectural design, schema, and UI requirements detailed below.

## 1. Tech Stack
- Frontend: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, Shadcn UI, Zustand, Lucide React
- Backend: Next.js 16 (API Routes), TypeScript 5, Prisma
- Database: PostgreSQL 16, NeonDB

## 2. Core Features & Pages to Implement
### Header
- Logo image
- Navigation buttons: Home, Products, About Us, News, Contact
- Language switcher (EN/VI)
- Dark mode toggle
- Product search bar (search products by name with suggestions)

### Footer
- Logo image
- Company Description: 
    - Address: (will provide after backend implementation)
    - Phone number: (will provide after backend implementation)
    - Email: (will provide after backend implementation)
- Navigation links: Products, About Us, Contact
- Social media links (Facebook, WhatsApp, LinkedIn)

### Public Pages (`/vi` or `/en` prefix)
1. **Home Page (`/home` (EN) or `/trang-chu` (VI))**
- Hero section with high-quality agricultural carousels.
- Categories showcase (Agriculture, Forestry, Seafood) with hover effects.
- Latest market news section (horizontal scroll or grid).
- Video gallery grid featuring factory tours (cinnamon, ginger processing).
2. **Product Catalog Page (`/products` (EN) or `/san-pham` (VI)):**
- Filterable grid (Filter by Category: Agriculture, Forestry, Seafood).
- Nested sub-categories (e.g., Agriculture -> Spices, Fresh Fruits, Grains).
- Product detail page: 
    - Show product name, description, images, specs, production process.
    - Contact form to inquiry about the product.
3. **Market News (`/news` (EN) or `/tin-thi-truong` (VI)):**
- Blog layout detailing commodity price updates (e.g., Pepper, Coffee prices).
- News detail page: 
    - Show news title, content, images.

4. **Contact Page (`/contact` (EN) or `/lien-he` (VI)):**
- Office location, office phone cards.
- Contact form that submits data (full name, phone number, email, title, message) to the backend database.
- Map embedded showing the office location in the form of marker pins.

## 3. Database Schema (Prisma)

Initialize your Prisma schema with localization support using separate fields or JSON definitions. Ensure the following models are created:

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum CategoryType {
  AGRICULTURE
  FORESTRY
  SEAFOOD
}

model Product {
  id          String       @id @default(uuid())
  type        CategoryType
  nameVi      String
  nameEn      String
  descVi      String?      @db.Text
  descEn      String?      @db.Text
  imageUrls   String[]
  createdAt   DateTime     @default(now())
}

model News {
  id          String       @id @default(uuid())
  titleVi     String
  titleEn     String
  contentVi   String       @db.Text
  contentEn   String       @db.Text
  thumbnail   String
  publishedAt DateTime     @default(now())
}

model ContactSubmission {
  id        String   @id @default(uuid())
  fullName  String
  email     String
  phone     String
  title     String
  message   String   @db.Text
  createdAt DateTime @default(now())
}
```

## 4. Technical Requirements

### SEO
- Title: 16-32 characters
- Description: 90-160 characters
- Keywords: 5-10 keywords

## Workflow

### Performance
- Fast load times
- Smooth interactions
- SEO optimized

## 5. Design Guidelines

### Color Palette
- Primary: #2563eb
- Secondary: #64748b
- Accent: #10b981
- Neutral: #f8fafc
- Error: #ef4444

### Typography
- Font: Inter
- Headings: font-bold, text-3xl
- Body: font-normal, text-base
