# Project Proposal: SwapHub

## Project Title: SwapHub - Community Classifieds Marketplace

---

### Live project link: https://swaphub-n4kw.onrender.com/

---

### Description:

SwapHub is a web-based marketplace designed for buying and selling second-hand items within a local community. The platform allows users to list used items for sale, browse available listings, contact sellers, and track the status of their items. The primary aim of SwapHub is to encourage sustainable consumption, reduce waste, and promote eco-friendly consumer behavior by facilitating the reuse of goods.

---

## Project Overview:

SwapHub will serve as a comprehensive platform where users can buy and sell pre-owned items. The marketplace will offer an intuitive and user-friendly interface that facilitates easy item listing, seamless browsing, and secure transactions. By enabling local communities to trade used goods, SwapHub will contribute to a more sustainable economy by reducing waste and extending the lifecycle of products.

---

## Project Goals and Objectives:

### Primary Goal:

To develop a fully functional, user-friendly classifieds website tailored to the buying and selling of used items, with a strong focus on usability, security, and community interaction.

### Specific Goals:

- **User Interface:** Build an intuitive and responsive UI for both buyers and sellers, ensuring a smooth user experience on all devices.
- **Search and Filter System:** Implement an effective search and filtering mechanism to allow users to easily find relevant items based on categories or keywords.
- **Listing Management:** Allow sellers to easily manage their item listings (create, edit, delete, or update the status of their items).
- **Future Feature (Trust & Verification):** Add a user verification system to help build trust within the community.

---

## Project Scope:

### 1. User Registration and Authentication:

- Users can create accounts, log in, and manage their profiles from a personal dashboard.
- Different account types: **Buyer**, **Seller**, and **Admin**.
- Email-based verification for account creation and authentication.

### 2. Item Listings:

- Sellers can create detailed listings for items they wish to sell, including title, description, price, category, and images.
- Options to mark items as "Available" or "Sold" to update the status of listings.
- Sellers can edit, delete, or update the status of their listings.

### 3. Search and Filter Functionality:

- Users can search for items using keywords or apply filters based on categories and price range.

### 4. Product Pages:

- Each item will have a dedicated product page displaying images, descriptions, pricing, and seller contact information.

---

## Project Technical Specifications:

### Frontend:

- **Framework:** React
- **Markup & Styling:** HTML5, CSS3, JavaScript, Bootstrap, Tailwind CSS
- **UI Components:** Material UI

### Backend:

- **Framework:** Node.js with Next.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT) for secure authentication

### Hosting:

- **Platform:** Netlify (with Continuous Deployment via GitHub)

---

## Setup and Installation:

To run SwapHub locally, follow these steps:

### 1. Clone the repository:
```
git clone https://github.com/your-repo-url.git
cd your-repo-folder
```
### 2. Install Dependencies:
For both the frontend and backend, run the following command to install the required dependencies:
```
npm install
```
### 3. Environment Variables:
Create .env.local file at the root of the project(in the same folder as ```package.json```) and include the following environment variables:
```
MONGO_URI=your_mongo_database_uri
DB_NAME=your_database_name
SECRET_KEY=your_secret_key
DOMAIN=http://localhost:3000/ OR your_domain
EMAIL_USER=your_gmail_account
EMAIL_PASSWORD=your_gmail_account_password_key
```
Make sure to replace the placeholders with your actual values, such as the MongoDB URI and email credentials.

### 4. Running the Project Locally:
To run the project locally, use the following command:
```
npm run dev
```
This will start the development server. You can acccess the project at http://localhost:3000.

### 5. Database Setup:
Make sure you have MongoDB set up and running. If you're using MongoDB Atlas, you can connect using the provided MongoDB URI. If you're using a local MongoDB instance, ensure it's running on the correct port.

---
## Troubleshooting
If you encounter issues during setup or running the project, here are some common solutions:
1. **Missing ```.env.local``` variables**: Ensure that ll required environment variables are set.
2. **Database connection errors:** Double-check the MongoDB URI and ensure your database is accessible
3. **Missing dependencies:** If you get errors related to missing packages, try running ```npm install``` again to ensure all dependencies are installed.

---

This proposal outlines the foundational structure of the SwapHub project, which aims to create an efficient and eco-conscious platform for the local buying and selling of second-hand goods. The implementation of features like easy item management, a robust search system, and user verification will make SwapHub a trusted and reliable marketplace for community interactions.

---
Feel free to reach out if you have questions or issues while setting up the project. Contributions are welcome! :)

---