# NGO Impact Tracking System

A full-stack web application that allows NGOs to submit monthly reports and provides an admin dashboard to view summarized data.

## Features

- **Report Submission Form**: NGOs can submit monthly reports with details about people helped, events conducted, and funds utilized
- **Admin Dashboard**: View aggregated data across all NGOs for a selected month
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Form Validation**: Ensures data integrity with client-side validation

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: In-memory storage (can be easily replaced with a real database)
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with shadcn/ui components

## Installation and Setup

### Prerequisites

- Node.js 18+ and npm/yarn

### Step 1: Clone the repository

\`\`\`bash
git clone https://github.com/yourusername/ngo-impact-tracker.git
cd ngo-impact-tracker
\`\`\`

### Step 2: Install dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Step 3: Run the development server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

\`\`\`
ngo-impact-tracker/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes
│   │   ├── dashboard/      # GET /api/dashboard endpoint
│   │   └── report/         # POST /api/report endpoint
│   ├── admin-dashboard/    # Admin Dashboard page
│   ├── submit-report/      # Report Submission Form page
│   └── page.tsx            # Home page
├── components/             # UI Components
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utility functions and database
│   └── db.ts               # In-memory database
├── public/                 # Static assets
└── README.md               # Project documentation
\`\`\`

## Deployment

This application can be easily deployed to Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Deploy with default settings

## Extending the Application

### Adding a Real Database

To replace the in-memory database with a real database like PostgreSQL:

1. Install Prisma: `npm install @prisma/client prisma`
2. Initialize Prisma: `npx prisma init`
3. Define your schema in `prisma/schema.prisma`
4. Update `lib/db.ts` to use Prisma Client instead of the in-memory array

### Adding Authentication

To add user authentication:

1. Install NextAuth.js: `npm install next-auth`
2. Create an authentication configuration file at `app/api/auth/[...nextauth]/route.ts`
3. Set up authentication providers (Google, GitHub, or credentials-based)
4. Add session management to protect admin routes

### Adding Charts and Visualizations

To enhance the dashboard with visual data representation:

1. Install a charting library: `npm install recharts`
2. Create chart components to visualize monthly trends
3. Add them to the admin dashboard to show data over time

## Customization

### Theming

You can customize the application's theme by modifying the `tailwind.config.ts` file. The application uses CSS variables for theming, which can be found in `app/globals.css`.

### Adding More Fields

To add more fields to the report form:

1. Update the form schema in `app/submit-report/page.tsx`
2. Add the new fields to the form UI
3. Update the API route in `app/api/report/route.ts` to handle the new fields
4. Update the dashboard to display the new metrics

## License

MIT

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
\`\`\`

Let me provide step-by-step instructions for setting up and running this project:

## Step-by-Step Setup Instructions

### 1. Create a New Next.js Project

\`\`\`bash
npx create-next-app@latest ngo-impact-tracker
\`\`\`

When prompted, select the following options:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- src/ directory: No
- App Router: Yes
- Import alias: Yes (default: @/*)

### 2. Install Required Dependencies

Navigate to your project directory and install the necessary dependencies:

\`\`\`bash
cd ngo-impact-tracker

# Install form handling and validation libraries
npm install react-hook-form @hookform/resolvers zod

# Install shadcn/ui CLI
npm install -D @shadcn/ui

# Initialize shadcn/ui
npx shadcn init
\`\`\`

When configuring shadcn/ui, select the default options.

### 3. Install UI Components

\`\`\`bash
# Install required shadcn/ui components
npx shadcn add button
npx shadcn add card
npx shadcn add form
npx shadcn add input
npx shadcn add alert
npx shadcn add skeleton
\`\`\`

### 4. Create Project Structure

Create the necessary directories:

\`\`\`bash
mkdir -p app/submit-report app/admin-dashboard app/api/report app/api/dashboard lib
\`\`\`

### 5. Copy the Code Files

Copy each file from the code blocks above into their respective locations in your project structure.

### 6. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Your application will be available at http://localhost:3000.

## How the Application Works

1. **Home Page**: The landing page with links to the report submission form and admin dashboard.

2. **Report Submission Form**: 
   - NGOs enter their ID, reporting month, and impact metrics
   - Form validation ensures all data is valid
   - On submission, data is sent to the API endpoint

3. **Admin Dashboard**:
   - Displays aggregated data for all NGOs for a selected month
   - Month selector allows viewing different time periods
   - Shows key metrics in card format with appropriate icons

4. **Backend**:
   - Uses Next.js API routes for handling data
   - In-memory database for simplicity (can be replaced with a real database)
   - Endpoints for submitting reports and retrieving dashboard data

## Deployment Instructions

To deploy this application to Vercel:

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and sign up/login
3. Click "New Project" and import your GitHub repository
4. Use the default settings and click "Deploy"
5. Vercel will automatically build and deploy your application

## Extending the Application

The application is designed to be easily extended. You can:

1. **Add a real database** like PostgreSQL or MongoDB
2. **Implement authentication** to protect the admin dashboard
3. **Add more visualizations** using libraries like Recharts or Chart.js
4. **Implement multi-language support** for NGOs operating in different regions

This application provides a solid foundation that you can build upon to meet your specific requirements.

<Actions>
  <Action name="Add real database integration" description="Replace in-memory database with PostgreSQL or MongoDB" />
  <Action name="Implement user authentication" description="Add login functionality to protect the admin dashboard" />
  <Action name="Add data visualizations" description="Enhance the dashboard with charts and graphs" />
  <Action name="Create NGO profile pages" description="Add individual profile pages for each NGO" />
  <Action name="Implement export functionality" description="Add ability to export reports as CSV or PDF" />
</Actions>

\`\`\`

</CodeProject>


