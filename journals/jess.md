## January 4, 2022

Today, I worked on:

- Allotting points for each issue/stories and generating them in GitLab for MVP #1 and MVP #2.

My team and I discussed how we would implement our databases, and we have agreed to use a foreign key.
After discussing with Andrew, we have decided to proceed with MongoDB. We split up the MVP between all team members,
and I will be working on the login and logout functionality with Tommy.

Today, I learned about the differences between MongoDB and PostgreSQL.
I think that I prefer MongoDB so far! Seems like there's significantly less
syntax to memorize, but we will need to figure out how to make data relational.

## January 5, 2022

Today, I worked on:

- Revised my portion of the GitLab issues/stories based on the instructors' feedback.
- Completed a working draft of the Docker-Compose.yaml file with all containers running.

Today, Chengyun, Jordan, and I worked on creating the docker containers to set up the project.
Unfortunately, we were stuck on the same bug for about four hours with getting the Mongo Express container to run.
The SEIRs Matt and John were able to help us resolve our issues. It seems that the bug was caused by me using the wrong
Mongo image. I had tried 4.2, 4.4, and 6, but it seems that only 5 works on my computer.
The three of us also had an elaborate discussion with Carter regarding how our databases would be set up.
As we currently have three separate collections, we agreed that accounts will be in its own databases,
and watchlist and favorites will be in a separate database.

The biggest celebratory moment my team had for today was when we got all of the docker containers to run.
We can finally start coding! Our current forseeable problem would be to figure out how to use links to join our databases.
