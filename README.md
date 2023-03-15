# Amazon-Clone
E-Commerce Site


# Intro
Welcome to my ecommerce site built with Next js.This README file will provide you with all the necessary information about this project.

# About the Project:

-This project is an e-commerce website built using Nextjs, TypeScript, SWR , JWT, TailwindCss, daisy, and MongoDB. this site has several Product Categories which allow Customers to Search for Products throw a nice search bar, Customers can add products to their cart without being Authenticated, they can adjust their cart Product quantity based on Product's Stock, also they can Filter out products based on their preference (Categories, Best Seller, Price Ranges, Brands, sorting, customer rating ...etc), they also can leave a review on each product and filter out Product's reviews based on review rating and top reviews and most recent one.  


# Website Pages

### main Layout
- this is not a page this is a layout that has all shared components between all Project Pages, 
this layout has a Header Bar which has a nice search Bar for products, also it has two nice Carousels which contain related products that the user has viewed which are filtered out with the best seller one, and another one which contains a random products Category from categories which user has viewed and also filtered out with best seller one      

### Home Page (Categories Page)
- this page has Product Categories and Nice Carousels which Contains best seller and top reviews of randomly product Categories  

### Products Page
- this page has all products on the database , Users are allowed to filter out these products based on their preferences (Categories, Best Sellers, Price Ranges, Brands, sorting, customer rating ...etc), Products are automatically Filtered Out based on Products user has viewed which gives a good user experience, this page also has two carousels which contains best seller and top views products based on category user filtered out of products.

### Product Page
- this page has all details about product user needs. this page has a section bar that allows the customer to add the product to his cart and adjust the quantity based on the product Stock, this Page also has two carousels that contains best seller and top views of the category to which the product belongs, this page also has a section for product reviews which contains all product reviews which customers have left on this product.

### Product Reviews 
- this page has all customers reviews on the product, also has two sections for the top positive review and top critical one, and also has a section for an authenticated user review if he had left a review on that product, on this page user can update their reviews, this page also has a section for all customers reviews with nice sorting and search based on customer rating and top reviews and top recent one, also it implies from the user to be an authenticated one to have the right to leave a review on any product.

### Cart Page 
- this page contains all products that the user added which not requires from user to be authenticated to add products to his cart, this page also has a section for a subtotal of products added and the total number of them, also it has a section for related products to which products are in user's cart, also user can adjust the product quantity based on  product Stock, user can delete any product he added, also each cart product has a nice modal with nice preview which contains a nice comparison based on product price and rating ...etc between the product and related products to it. 

### Browser History Page
- this page contains all products which user has viewed.

### User Reviews Page
- this page has all authenticated user reviews on products and has the ability to delete them and update.

### Login Page
### Signup Page


# Technoligies
### Nextjs
- Utilized Nextjs to build my rest API to interact with MongoDB to handle all necessary data and also to handle linking between unauthenticated user sessions and authenticated user sessions when the user logged in. Nextjs also helps me to build high-quality websites with good SEO. 

### TypeScipt 
- Utilized TypeScript fot fast debugging code.

### MongoDB
- Utilized MongoDB to store all necessary data which contains users and products and sessions data, also used MongoDB to handle user authentication

### JWT
- Utilized jwt to handle authenticated users session and handle protected pages 

### next session library
- Utilized  next session library to create a session for non-authenticated users to allow them to add products to their cart and see their browser history products and see products based on their preference without creating any accounts  

### SWR
- Utilized SWR to store data retrieved from the Server and cache it Client-Side and update it based on
user interactivity so the user does not have to wait for server responses which give a good user experience

### Tailwind Css 
- Utilized Tailwind to build nice styling pages with highly Responsive web design which designed to be accessible on multiple devices, including desktops, tablets, and mobile phones.

### daisyUI
- Utilized daisyui for nice styled components


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
