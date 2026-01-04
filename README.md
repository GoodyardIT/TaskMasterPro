# TaskMaster Pro - Production Work Order Management System

TaskMaster Pro is a modern, full-stack web application designed to streamline the creation and management of production work orders. It integrates with an Oracle ERP system for data validation and submission, leverages Firebase for real-time data and user authentication, and uses Generative AI for intelligent data validation assistance.

![TaskMaster Pro Screenshot](https://storage.googleapis.com/studiopaper-dev/llm-studio-template-tasks/taskmaster-pro-screenshot.png)

## Key Features

- **Secure User Authentication**: Employs Firebase Authentication for a secure login system.
- **Intuitive Data Entry**: Users can manually add production tasks row by row with a clean, table-based interface.
- **AI-Powered Validation**: A Genkit AI flow validates user input in real-time, checking for data integrity and uniqueness before submission.
- **Excel Import/Export**: Includes functionality to download a template and batch-import tasks from an Excel file, with automatic Work Order ID generation.
- **Oracle ERP Integration**: Communicates with an Oracle database via a secure cloud proxy to validate material codes (`WO_WLID`) and submit finalized work orders.
- **Real-time Submission History**: A dedicated history page uses Firestore to display all submitted tasks in real-time, showing their status and details.
- **Internationalization (i18n)**: The user interface is available in both English and Chinese, with a simple language switcher.
- **Modern UI/UX**: Built with ShadCN UI and Tailwind CSS for a responsive, professional, and consistent user experience.

## Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Generative AI**: Google Genkit
- **Database (Real-time)**: Google Firestore
- **Authentication**: Firebase Authentication
- **ERP Integration**: Custom Oracle DB Proxy (Node.js/Express on Cloud Functions)
- **Deployment**: Firebase App Hosting

## Project Structure

- `src/app/[locale]/`: Contains the main application pages, components, and layouts using the Next.js App Router.
  - `dashboard/`: The main application area after login, including data entry and history pages.
  - `lib/`: Holds utility functions, type definitions, and client-side configurations for Firebase.
  - `components/ui/`: Houses all the reusable ShadCN UI components.
- `src/ai/flows/`: Implements the Genkit AI logic for data validation.
- `src/app/actions.ts`: Contains Next.js Server Actions for handling form submissions and interacting with the backend.
- `cloud-functions/oracle-proxy/`: A Node.js Express server that acts as a secure proxy to communicate with the Oracle database.
- `messages/`: Contains JSON files for English (`en.json`) and Chinese (`zh.json`) translations.

## Getting Started

To run the application locally:

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Set up environment variables**:
    Create a `.env.local` file in the root directory and populate it with the necessary credentials for Firebase and Oracle, following the structure in `.env`.

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Start the Genkit development service (in a separate terminal)**:
    ```bash
    npm run genkit:watch
    ```

The application will be available at `http://localhost:9002`.
