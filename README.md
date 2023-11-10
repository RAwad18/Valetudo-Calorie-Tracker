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
Most of the work on the back end side was coming up with ways to represent the data. This meant...
- A schema/model that represented a food item.
- A schema/model that the front end could iterate over - where the order was important and possibly changing.

As for the functions that performed the operations (adding, deleting, updating, and retrieving), the Mongoose documentation pretty much took care of that. 

### Data Models
There are two main data models - **calorie objects** and **data arrays**.

The idea behind this was that all 'calorie objects' (aka Food or Drinks) would be stored in the database, unsorted. It would contain information such as... 
- The name.
- The total number of calories and macronutrients.
- The calories and macronutrients per 1g 
    - used to dynamically render calorie and macro content on the front end without making calls to the Nutrionix API
- Serving sizes
- and finally, the **date** that the object was added (or added under)

The other data model - data arrays - would return all the corresponding calorie objects for a specific date.

The Data Arrays model only contained two pieces of information.
- An array of object IDs that corresponded to a 'calorie object'.
- The date that all the calorie objects within the array share.

### Data Retrieval and Storage
When a GET request is made to the server, it's for the purpose of retrieving all calorie objects for a particular date (sort of like a dairy).
- The response is a 'Data Arrays' object for the date that was passed in the request
- The order of the items within the array corresponds to how the user orders their items over on the UI.
- The order is updated on the server every time the diary component dismounts or a page refresh occurs.

Storing items requires the data arrays for the corresponding date (I keep using that word, smh) to either be updated or created, if it does not exist.

### API
None of this could have been possible without the **Nutritionix API**. No other free 'food database' API really compares, and their documentation was super easy to follow. They also understood very well *how* others would use their API, so the docs contained some information for that as well.

The goal was to call their API as few times as possible. It was called...
1. Whenever the user looked up foods.
2. Whenever a specific food was selected (to add to the diary or to just view the details).

I wanted to dynamically render the calories and macronutrient content, based on the amount and the serving size. I didn't want to keep making calls every time the user changed something, so I had to calculate the calories, protein, carbs, and fats per 1g. That, along with the serving sizes, was stored within the 'calorie object' data model.


## Limitations
The biggest and most devastating limitation is that the app does not support multiple users. Maybe down the line, I'll add that functionality, but by the time I finished this project, I'd *already* spent way too much time on it.

I would need to add in some sort of login system, where each user gets a specific ID of sorts. That ID is then tagged onto every Calorie Object and Data Arrays model. When filtering the database, we'd add that ID to the date filter we already have.

Making this efficient is a whole other issue.

## Possible Improvements
Well, besides addressing the glaring limitation above...most of my issues with the project have to do with the UI.
1. Add 'Loading' components.
2. Redesign the 'desktop' style in a way that doesn't feel 'lacking'.
    - Below 1024px, the app definitely looks its best.
3. Remove the loads of empty space within a diary item 

## Purpose
The main purpose behind this project was to... actually build a full-on project on my own. Well, not without the help of YouTube videos, tutorials, and Stack Overflow.

I learned a ton just by going through the experience. It did way more for me than any amount of words or teaching would have done.

Not only did I improve my skill with React and Redux, with setting up a basic server with Express, and with writing logic that accessed and manipulated the database. I also understood concepts fundamental to being a developer.

I truly understood the difference between the front end and the back end - way deeper than the restaurant analogy of a waiter and a chef or something.

I understood more of how they worked, but I also understood how *little* I knew. I can't possibly know everything, but I'd like to know a little of most things, and a lot about a few things.

## Lessons Learned
The biggest lesson I truly learned was the importance of **scope**. A big reason why this project took so long was because the scope was either - never defined, or never truly grasped.

The idea of scope also ties into the importance of planning. I still don't like to over-plan when it comes to personal projects, but I do need an outline of what the project will entail.

I also understood the importance of having checklists. I can't tell you the number of times I felt like my brain was fried. In that state, it was tough to keep track of what I needed to do. Checklists were both a guide and an anchor for me to recenter on.
