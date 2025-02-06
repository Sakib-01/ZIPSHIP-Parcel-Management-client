<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh -->

# 🚚 ZIPSHIP (Parcel Management App)

**An online platform for booking, managing, and delivering parcels with a user-friendly interface and powerful features.**

---

## 🌐 Live Site URL

[Live Demo](https://zipship.netlify.app)

## 🌟 Features

1. **Role-Based System**

   - Users: Book and manage parcels.
   - Delivery Men: Manage assigned deliveries and receive reviews.
   - Admins: Oversee users, delivery men, and parcels.

2. **Responsive Design**

   - Fully responsive across mobile, tablet, and desktop devices.
   - Adaptive dashboard for all user types.

3. **Secure Login and Registration**

   - Email/Password and Social Login options.
   - Role-based dashboard navigation.
   - Persistent authentication with JWT.

4. **Booking and Parcel Management**

   - Dynamic parcel pricing based on weight.
   - Real-time status updates (pending, on the way, delivered, etc.).
   - Search and filter bookings by date and status.

5. **Admin Controls**

   - Assign delivery personnel and manage users.
   - View app statistics via bar and line charts.
   - Pagination and search functionality for large datasets.

6. **Delivery Men Dashboard**

   - Exclusive delivery list with delivery and cancel options.
   - Review management from parcel recipients.
   - Integrated map view for delivery locations.

7. **Interactive Statistics**

   - Total parcels booked, delivered, and app users.
   - Animated statistics with `react-countup`.

8. **Payment Integration**

   - Secure Stripe payment system.
   - React Confetti Explosion on successful transactions.

9. **Modern Technologies**

   - TanStack Query for optimized data fetching.
   - Shadcn component library for a sleek UI.
   - Map integration with React Leaflet.

10. **Thematic Excellence**
    - Light and dark mode toggle for a personalized experience.
    - Cool animations throughout the application.

---

## 👥 User Roles and Features

### User

- Book parcels with detailed forms.
- View and manage parcel bookings.
- Update profile details and upload profile pictures.
- Pay for parcels securely using Stripe.

### Delivery Men

- View assigned deliveries.
- Mark deliveries as completed or canceled.
- Manage received reviews.
- ### Delivery Man email: dman@gmail.com
- ### Delivery Man Password: Dman123

### Admin

- Assign parcels to delivery personnel.
- Manage all users and delivery men.
- View application statistics via interactive charts.
- Perform CRUD operations for bookings and users.
- ### Admin email: admin@gmail.com
- ### Admin Password: Admin123


---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, DaisyUI, Shadcn, TanStack Query
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase, JWT
- **Payment:** Stripe
- **Mapping:** React Leaflet, MapBox

---

## 🔐 Environment Variables

Ensure you have the following environment variables set in your `.env` file:

- FIREBASE_API_KEY=your_firebase_api_key
- FIREBASE_AUTH_DOMAIN=your_auth_domain
- MONGO_URI=your_mongodb_uri
- STRIPE_API_KEY=your_stripe_api_key
- JWT_SECRET=your_jwt_secret

## 🚀 Installation and Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo.git

   ```

2. Navigate to the project directory and install dependencies:

   cd client
   npm install
   cd ../server
   npm install

3. Start the development servers:

   # Start client

   cd client
   npm start

   # Start server

   cd ../server
   npm run dev
