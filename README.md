# 🎥 Meetings - Modern Video Conferencing App

A sleek, modern video meeting application built with Next.js, Stream Video SDK, and Clerk authentication.

## ✨ Features

-   **Real-time video meetings** with high-quality performance
-   **Personal meeting rooms** for quick setup
-   **Schedule meetings** in advance with customizable details
-   **Join meetings** via shared links
-   **Modern UI** with Tailwind CSS and Shadcn components
-   **User authentication** via Clerk
-   **Device settings** control for camera and microphone
-   **Multiple meeting layouts** including grid and speaker views
-   **Responsive design** for all devices

## 🚀 Tech Stack

-   **Framework**: Next.js 15+ (App Router)
-   **Authentication**: Clerk
-   **Video SDK**: Stream Video React SDK
-   **Styling**: Tailwind CSS
-   **State Management**: React Hooks
-   **Notifications**: Sonner Toast
-   **UI Components**: Shadcn UI, Lucide React Icons
-   **Date Handling**: React DatePicker
-   **Types**: TypeScript

## 📋 API Endpoints

| Endpoint         | Description                          |
| ---------------- | ------------------------------------ |
| `/`              | Home page with meeting setup options |
| `/meeting/:id`   | Join a specific meeting by ID        |
| `/personal-room` | Access your personal meeting room    |
| `/upcoming`      | View your upcoming meetings          |
| `/recordings`    | Access your meeting recordings       |
| `/previous`      | View your previous meetings          |
| `/login`         | Authentication page                  |
| `/register`      | Registration page                    |

## 🛠️ Getting Started

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file with the following variables:
    ```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_STREAM_API_KEY=your_stream_key
    STREAM_SECRET_KEY=your_stream_secret
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📸 How It Works

1. **Authentication**: Users sign in with Clerk
2. **Create a Meeting**: Schedule a meeting or start an instant one
3. **Join a Meeting**: Enter via a meeting link or your personal room
4. **Meeting Controls**: Toggle camera, microphone, share screen, and more
5. **Multiple Layouts**: Switch between grid and speaker views
6. **End Meeting**: Host can end the meeting for all participants

## 📦 Project Structure

```
meetings/
├── actions/            # Server actions for API calls
│   ├── stream.actions.ts # Stream API actions
├── app/                # Next.js App Router
│   ├── (auth)/         # Authentication routes
│   ├── (root)/         # Main application routes
│   │   ├── (home)/     # Home page and related routes
│   │   ├── meeting/    # Meeting room routes
│   ├── globals.css     # Global CSS styles
│   ├── layout.tsx      # Root layout component
├── components/         # React components
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── providers/          # React context providers
├── public/             # Static assets
├── middleware.ts       # Next.js middleware for auth
├── next.config.ts      # Next.js configuration
```

## 🧩 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
