# Calorie-Tracker (Valetudo)

Valetudo is a web app that allows the user to log their foods and track their total calories and macronutrient consumption.
- It allows users to search for thousands of foods, thanks to the **Nutritionix API**.
- Choose from a variety of different serving sizes
- See the calorie and macronutrient content per food item
- Customize your caloric and macronutrient goals

## Technologies Used
- React, Redux, and React-Redux 
- Axios for API calls to the backend
- Vite as a development server
- Express for the backend
- MongoDB as the database
- Mongoose for database operations

## How It Works
### Data Storage and Retrieval


### Data Models
There are two main data models - **calorie objects** and **data arrays**.

The idea behind this was that all 'calorie objects' (aka Food or Drinks) would be stored in the database, unsorted. It would contain information such as... 
- The name.
- The total number of calories and macronutrients.
- The calories and macronutrients per 1g 
    - used to dynamically render calorie and macro content on the front end without making calls to the Nutrionix API
- Serving sizes
- and finally, the **date** that the object was added (or added under)

The other data model - data arrays - contained only two pieces of key information.
- An array of object ID's that corresponded to a 'calorie object'.
- The date that all the calorie objects within the array shared.

Whenever a call was made to the back end to retrieve ALL food items (calorie objects) for a particular date, the data array for that particular date is returned.
- The object ID's are populated and turned into the actual objects they represented.




## Goal

The goal behind building this app was to complete my very first "real" project. Something that involved a frontend, backend, API calls, and a bunch of other terms that I had no idea what they truly meant.

I'll be the first to admit that this project could use a TON of improvement. However, I'm still extremely proud of it and I believe that it fulfilled its purpose.

This project was the all-important stepping stone that catapulted me forward in my programming journey. Through it, I gained valuable experience working on both the front end and back end.
- Worked with React and Redux - understood the concept of state vs stateless
- Developed my very first backend server - understood routes, controllers, and middleware
- Wrote and retrieved data to a database for the first time in a project setting (MongoDB)
- Worked with my very first API's - Mongoose, Nutrionix
- Designed my own REST API

It allowed me to understand these concepts in a way that no amount of words could ever hope to do. It also taught me how the frontend and backend communicate, and how the very concept of 'frontend' and 'backend' is contextual.





