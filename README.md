# Amazon-Clone
E-Commerce Site


# Intro
Welcome to my ecommerce site built with Next js.This README file will provide you with all the necessary information about this project.

# About the Project:

-This project is an e-commerce website built using Nextjs, TypeScript, JWT, TailwindCss, daisy, and MongoDB. this site has several Product Categories which allow Customers to Search for Products throw a nice search bar, it also allows Customers to add products to their cart without being Authenticated and adjust the cart Product's quantity based on Product's Stock, also allows customers to Filter out product's based on their preference (Categories, Best Seller, Price Ranges, Brands, sorting, customer rating ...etc), also allows customers to leave a review on each product and filter out Product's reviews based on review rating and top reviews and most recent one  


# Website Pages

### main Layout
- this is not a page this is a layout that has all shared components between all Project Pages, 
this layout has a Header Bar which has a nice search Bar for products, also it has two nice Carousels which contain related products that the user has viewed which are filtered out with the best seller, and another one which contains a random product's Category from categories which user viewed and also filtered out with best seller one      

### Home Page (Categories Page)
- this page has Product Categories and Nice Carousels which Contains best seller and top reviews of randomly product Categories  

### Products Page
- this page has all products on the database and users are allowed to filter out this products based on their preference , Products are automatically Filtered Out based on Product's user has viewed which gives a good user experience, this page also has two carousels which contains best seller and top views product's based on category which filtered out 

### Product Page
- this page has all details the user needs. this page has a section bar that allows the customer to add the product to his cart and adjust the quantity based on the product's Stock, this Page also has two carousels which contains best seller and top views of the category to which the product belongs, this page also has the product's reviews section which contains all product's reviews which customers have left on this product

### Product Reviews 
- this page has all customer's reviews on the product and has the top positive review and top critical reviews and also has the authenticated user's review if he had left a review on the product and can update his review, also has a section for all customer's reviews with nice sorting and search based on customer rating and top reviews and top recent one, also it implies from the user to be authenticated to have the right to leave a review on the product

### Cart Page 
- this page contains all products which the user added and has a section for a subtotal of products added and the total number of them, also it has a section for related products that are in Cart, user can adjust the product's quantity based on the product's Stock and also can delete any product he added to cart, each cart product has a nice modal which contains a nice comparison based on product's price and rating ...etc between the product and related product's to it. 

### Browser History Page
- this page contains all products which user views.

### User Reviews Page
- this page has all authenticated users reviews on products and has the ability to delete them and update.

### Login Page
### Signup Page


# Technoligies
### Nextjs
- utilized Nextjs for a high-quality website with good SEO and also used next js to build Rest API to interact with MongoDB which contains products and users and sessions data and handles users sessions and also handles linking between non-authenticated user sessions and authenticated user session 

### TypeScipt 
- utilized TypeScript fot fast debugging code.

### MongoDB
- utilized MongoDB to store all necessary data which contains users and products and sessions data, also used MongoDB to handle user authentication

### JWT
- utilized jwt to handle authenticated users session and handle protected pages 

### next session library
- utilized the next session library to create a session for non-authenticated users to allow them to add products to their cart and see their browser history products and see  products based on their preference 

### Tailwind Css 
- utilized Tailwind to build nice styling pages with highly Responsive web design which designed to be accessible on multiple devices, including desktops, tablets, and mobile phones.

### daisyUI
- utilized daisyui for nice styled components


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