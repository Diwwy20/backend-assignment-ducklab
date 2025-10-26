# Member List Management System

This project is a web application for managing member information with CRUD operations. Built with React + Vite + TypeScript for the frontend and Node.js with Prisma for the backend.

## Features

- Add, edit, and delete member information
- Responsive web design
- Form fields include:
  - Title (Dropdown)
  - First Name (Text)
  - Last Name (Text)
  - Birth Date (Date)
  - Gender (Radio)
  - About (Textarea)
- Database management with Prisma

## Getting Started

### Frontend Setup

1. Navigate to the `memberlist` folder cd `...\Assignment-Ducklab\memberlist\frontend`
2. Install dependencies:

```bash
npm install

# or if needed
npm install --legacy-peer-deps
```

3. Start the development server:

```bash
npm run dev
```

### Backend Setup

1. Navigate to the `memberlist` folder cd `...\Assignment-Ducklab\memberlist\backend`
2. Install dependencies:

```bash
npm install
```

3. Migration generate:

```bash
npx prisma generate
```

4. Set up the database:

```bash
npx prisma migrate dev --name init
```

5. Start the server:

```bash
npm run dev
```

### Database Management

To view the database content:

1. Navigate to the `memberlist` folder cd `...\Assignment-Ducklab\memberlist\backend`
2. Launch Prisma Studio:

```bash
npx prisma studio
```

3. Open http://localhost:5555 in your browser

## Access Points

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Database UI: http://localhost:5555

## Requirements

- Node.js
- npm
