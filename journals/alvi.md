## January 26, 2023

Today, I worked on: 

- Fixed some bugs on top 100 and search function



## January 25, 2023

Today, I worked on:

- DEPLOYMENT, DEPLOYMENT, DEPLOYMENT
- Merge reqeusts

Today was pretty much just 100% on supervising and solidifying our merges of everyone's branches, and making active bug fixes for any issues that would occur. A majority of this was handled entirely by me, it was super stressful. We also got deployment and swagger files to work fully. Our website is deployed and working, we still have a few issues, but we can addresss them tomorrow. We are getting down to the wire.

## January 24, 2023

Today, I worked on:

- Supervised more merge requests
- Created Search page

A lot more merge requests. Worked on the search page that prints out all our responses in a similar way to our top 100 page media cards. This keeps a consistent UI so users know what they're looking at. There are some issues with our third party api, but unfortunately because it is a front-end accessible only API, it's not really something we can entirely have control over. We have figured out ways to get around our issues, but it is what it is.

## January 23, 2023

Today, I worked on:

- Created the details page 
- Supervised all merging for my team

This is a singular item, but it was a lot of work. The details page looks really good, and in a very good space. I have found ways to map data nd implement grids at a much better rate. Have started to incorporate some basic CSS to make the page load and look like I want and make presentation look cleaner. The detail page even uses external linking to other streaming services, which was super cool. I'm happy with this page, it was an exhausting day. I am I guess the expert for git so have been supervising every merge.

## January 20, 2023

Today, I worked on:

- Imported real data into top 100
- Worked on fixing the map function error that occurs because it tries to map undefined values, think I got it

So I have implemented that map function I mentioned yesterday. Now we have REAL data inside of the page that is dynamic and based off a single card and continually indexes and prints stuff accordingly. This is huge! But the only issue is that sometimes it doesn't load for the fact that the async useEffect function actually has issues with loading in the data BEFORE the JSX is rendered. In order to combat this I have decided to use some conditional rendering. This is working!

## January 19, 2023

Today, I worked on:

- Finished up the skeleton for the top 100 page
- Started figuring out how to import third party api data into the page

The Top 100 page is currently loading in a single media card, but we need all of the data to show. I currently have the skeleton of the page, and some dummy data into it for the time being. I have written an async useEffect and have been able to import the data into the page and console log it. This is a huge first step, but now I have to actually find a way to put that data into the JSX. Someone mentioned a map function.

## January 18, 2023

Today, I worked on: 

- React HomePage Carousel
- React Top 100 page

Fixed up the Carousel not to get the error that we were running into yesterday. Started building the Top 100, anime page, this page is going to be a LOT harder than the HomePage and will require a lot of understanding of grids and cards. Found some really useful bootstrap and react classnames that we can use in the long-run, shared it with the class. 

## January 17, 2023

Today, I worked on:

- Got the React Homepage going

Have started and created the first iteration of the homepage. I may be making a few iterations of this, just because I'm not entirely happy with how the page looks for now. I have decided to use a Carousel component, which was kind of annoying to get to use. We are getting some strange errors that I need to address at some point.

## January 13, 2023

Today, I worked on:

- Start on backend for accounts microservice
- Reorganized stories to reflect that we are changing to postgreSQL
- Made some final drawings for our relational database

Today we are setting up the connections between the databases and the accounts backend. We have decided to focus today on figuring out how to best make progress on the project even if certain parts aren't done. Also to take advantage of the long weekend. ALso had to do some more research for React.

## January 12, 2023

Today, I worked on:

- Started writing some possible implementations of our homepage
- Set docker.yml for PostgreSQL
- Set up postgres database

Started formulated meaans to making the homepage and testing out JSX code on a running docker server. This was a great first step into actually getting things working. Our docker for our project is still having some issues though.We have decided to switch to PostgreSQL database and have started the work for that. My current react pages are still running with a MongoDB connection though.

## January 11, 2023

Today, I worked on: 

- Finished up the wireframing for our project. Had to readjust some of the points and stories
- Decided on switching database structures

After realizing that some of the things we intiialy outlined in our MVP are going to take longer than we thought. We have decided to readjust some of the stories and make it into more consumable pieces. This also helped us start on deciding on how we will be starting on front end while the other side of the team works on authorization. We have finally decided to switch to PostgreSQL

## January 10, 2023

Today, I worked on:

- Continued to start on the React side of our pages

Decided to go through some of our files from previous projects as a bit of a template. Looked through the requirements txts for each of our components in previous projects. Worked on react dependencies and installing those as well. Helped Tommy through some of his coding woes as well

## January 9, 2023

Today, I worked on:

- Started working on finding React and redux resources
- Trying to figure out how we will organize the collections and databases
- Getting docker squared away to reliably run

Not as much coding today as high level planning. We worked on some more of our wire framing for how we want our front pages, and I utilized that to find possible dependencies we can use to our advtange for the front end.

## January 7, 2023

Today, I worked on:

- Finished setting up the Mongo Database
- Completed end points for sign up, login, and log out
- Started looking at implemented JWT authentication

Worked on solving some of the bugs that we had in our account endpoints and set up the MongoDB database. JWT Authentication seems that is gonna be a huge problem. We are starting to discuss how we formulate our multiple microservices to best meet the requirements for the project.

## January 6, 2023

Today, I worked on:

- Setting up the MongoDB Database 
- Setting up and points for creating accounts

The whole team is working in applying the docker configuration, and we are discussing how to organize the collections and databases again to fully understand how we would build functionality.

## January 5, 2023

Today I worked on:
- Revised portions of the GitLab issues/stories based on the instructors' feedback
- Completed a working draft of the Docker-Compose.yaml file with all containers running

Chengyun, Jordan, and Jess worked on creating the docker containers to set up the project. In the mean time I was reading up MongoDB because we were having many issues with it. I don't think MongoDB is the best choice, not just because we're having issues getting it off the ground, but because of the relational data structures that we may have in the future.

## January 4, 2023

Today, I worked on: 
- Started the process of setting up points for issues/stories and putting them into GitLab

We started on learning about MongoDB and PostgreSQL databases and choosing which would be best for our application. As of now we are pushing for MongoDB, I'm not quite sure why.