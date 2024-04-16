# Amazon-Clone

# Intro
Welcome to my E-Commerce site built with Next js.This README file will provide you with all the necessary information about this project.

# E-Commerce Platform

## Overview
This project is a robust e-commerce website built using Next.js, TypeScript, SWR, JWT, Tailwind CSS, daisyUI, and MongoDB. It serves as a comprehensive platform for online shopping, offering a wide range of features and functionalities to both customers and vendors.

## Features

### Customer Experience
- **Product Categories:** Customers can browse through various product categories to find items of interest.
- **Product Filtering:** Users can filter products based on categories, best sellers, price ranges, brands, and customer ratings.
- **Product Search:** A user-friendly search bar allows customers to quickly find specific products.
- **Product Reviews:** Customers can leave reviews for products and filter reviews based on rating and recency.
- **Dynamic Recommendations:** Carousels display best-selling and top-viewed products related to the user's browsing history and selected categories.

### Shopping Cart
- **Add to Cart:** Customers can add products to their cart without needing to create an account.
- **Cart Management:** Users can adjust product quantities and remove items from their cart.
- **Subtotal Calculation:** The cart page displays the subtotal and total number of items in the cart.
- **Product Comparison:** A modal provides a comparison between the selected product and related items in the cart.

### User Interaction
- **Authentication:** JWT is used for user authentication, allowing for protected pages and user sessions.
- **Session Management:** Next session library creates sessions for non-authenticated users to enable cart functionality and personalized browsing.
- **User Reviews:** Authenticated users can leave, update, and delete reviews for products.

## Pages

### Main Layout
- A shared layout containing components such as a header bar with a search function and carousels displaying related products.

### Home Page (Categories Page)
- Displays product categories and carousels featuring best sellers and top reviews of random product categories.

### Products Page
- Lists all products in the database with filtering options based on user preferences and browsing history.
- Carousels showcase best sellers and top-viewed products based on the user's selected category.

### Product Page
- Provides detailed information about a selected product, including the ability to add to cart and adjust quantity.
- Features carousels displaying best sellers and top views of the product's category.
- Includes a section for product reviews.

### Product Reviews Page
- Shows all customer reviews for a specific product.
- Includes sections for top positive and critical reviews, as well as authenticated user reviews.
- Allows users to update their reviews and provides sorting and search functionality.

### Cart Page
- Displays all products added to the cart, with options to adjust quantities and remove items.
- Shows related products and provides a product comparison modal.

### Browser History Page
- Lists all products viewed by the user.

### User Reviews Page
- Displays all authenticated user reviews with options to delete and update them.

## Technologies

### Next.js
- Used for building the REST API and handling server-side rendering.

### TypeScript
- Utilized for faster debugging and type safety.

### MongoDB
- Stores all necessary data, including user and product information.

### JWT
- Handles user authentication and session management.

### SWR
- Stores and caches data retrieved from the server, providing a seamless user experience.

### Tailwind CSS
- Enables highly responsive and aesthetically pleasing page designs.

### daisyUI
- Provides styled components for enhanced visual appeal.

# Live
[Amazon Clone](https://amazon-liart-six.vercel.app) 

# Installation:

1. Clone the repository to your local machine:
`git clone https://github.com/ziadAshraf7/Amazon-Clone.git`

2. Open index.html in your web browser.


Contributing:

If you want to contribute to this project, please fork this repository and submit a pull request.

Credits:

This project was created by Ziad Ashraf.


Conclusion:

Thank you for taking the time to read this README file. I hope you enjoy using this ecommerce site as much as I enjoyed building it. If you have any questions or feedback, please don't hesitate to contact me.
