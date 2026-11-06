# StudioSpace

A peer-to-peer marketplace where creators find and book photo studios, film stages, podcast lounges, music suites and art workshops by the hour, and hosts share their spaces.

**Live site:** https://studiospace-client-navy-eta.vercel.app

**Server repository:** https://github.com/Roqibul19/studiospace-server

## Test Credentials

| Field    | Value                 |
| -------- | --------------------- |
| Email    | `test@gmail.com` |
| Password | `Test1234` |

Google login is also available. To try the host's Confirm action, use a second account: book a studio with one account, then confirm it from My Studio Listings with the account that owns the studio.

## Features

- **Studio discovery:** Browse every space, search by name or location, and filter by category. Category cards on the home page open the list with that category already selected.
- **Studio details:** See a photo carousel, amenities, host details, reviews, the hourly rate and the security deposit.
- **Hourly booking with live pricing:** Choose a date, start time and duration, and see the total before sending a request. The server calculates the final price.
- **Double-booking prevention:** A new booking that overlaps a Confirmed booking is rejected with a clear message, and hosts cannot confirm two overlapping requests.
- **Full listing management:** Hosts can add, update and delete their own studios, upload images through imgbb, and confirm or decline booking requests.
- **Booking status tracking:** My Bookings shows Pending, Confirmed, Completed and Cancelled badges, with a Cancel option for pending requests.
- **Secure authentication:** Email and Google login with Better Auth. The Express API checks a JWT stored in an HTTPOnly cookie and returns 401 for logged-out requests.
- **Light and dark themes:** The theme toggle changes the whole site and remembers your choice.
- **Polished experience:** Responsive layouts, skeleton loaders, toast notifications, custom modals, friendly empty states and a custom 404 page.

## Tech Stack

| Layer          | Technology                                               |
| -------------- | -------------------------------------------------------- |
| Frontend       | Next.js 16 (App Router), React 19, JavaScript            |
| Styling        | Tailwind CSS 4, DaisyUI 5                                |
| Authentication | Better Auth, MongoDB Adapter, JWT in an HTTPOnly cookie  |
| Backend        | Express 5, MongoDB                                       |
| Libraries      | Swiper, Sonner, Lucide React                             |
| Image hosting  | imgbb                                                    |
| Deployment     | Vercel                                                   |

## Local Setup

You need Node.js 20 or newer, a MongoDB Atlas database, and the [server](https://github.com/Roqibul19/studiospace-server) running on port 5000.

1. Clone the repository and install the packages:

   ```bash
   git clone https://github.com/Roqibul19/studiospace-client.git
   cd studiospace-client
   npm install
   ```

2. Create a `.env.local` file in the project folder:

   ```
   BETTER_AUTH_SECRET=any_long_random_text
   BETTER_AUTH_URL=http://localhost:3000
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=the_same_value_as_on_the_server
   SERVER_URL=http://localhost:5000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   IMGBB_API_KEY=your_imgbb_api_key
   ```

   Google login and image upload are optional for local use. Without their keys, the rest of the site still works and you can paste an image URL.

3. Start the site:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000.

## Notes

- The sample studios, hosts and reviews are example data.
- The browser reaches the Express API through the `/api/server` rewrite in `next.config.mjs`, so the HTTPOnly cookie works while the client and server are hosted separately.
