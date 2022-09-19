# The Techie Times

This was created by Christy Perozzi as a capstone project for Flatiron School's Software Engineering Program.

The live site can be viewed here:

[https://techie-times.herokuapp.com/](https://techie-times.herokuapp.com/)

## Description 
This app is a demonstration of full-stack development using Ruby on Rails for the back-end and React.js for the front-end. It is an example of a typical newspaper site, with a focus on science and technology articles. 

The news articles featured here are scraped from [The Conversation](https://theconversation.com/us), which publishes under the Creative Commons license. I have configured the server to run the scraper to check for and publish new articles automatically once per day. For more information on this, please see my [medium article](https://medium.com/@christy.perozzi/why-heroku-scheduler-is-your-best-friend-for-automated-web-scraping-861e264eb016) on this topic.

Users can create an account to post a comment on an article. Users can also edit and delete their comments. 

In additon to news articles, this site features a weather page. The location initially displayed is based on the user's IP address. The weather page allows to search for a different U.S. location by city or zip code. I used the following APIs for geolocation and weather:

- [https://ipapi.co](https://ipapi.co) Geolocation of a user by IP address 
- [https://open-meteo.com/en](https://open-meteo.com/en) Weather API 

This project also has word games, which are popular feature of many print and online newspapers. The games featured here are original and written in Javascript. 

## Modifying

You may fork and modify this code, in whole or in part. Please provide attribution "By Christy Perozzi" and a link to this repository [https://github.com/ceptember/capstone](https://github.com/ceptember/capstone) on anything you publish. This code is provided strictly "as-is" without warranty of any kind. 

### Configuration
-Ruby 2.7.5
-Rails 7.0.3
-Postgresql 1.1
-Node 16.9.1
-NPM 8.3.0
-Nokogiri 1.13.6
-React 18.1.0
-Redux 4.2.0
-react-Redux 8.0.2
-react-router-dom 5.3.0

### Deploying
 
This app is configured to be deployed on [https://www.heroku.com/](https://www.heroku.com/). 

## Contributing 

Please reach out if you'd like to contribute to this or any project [https://www.linkedin.com/in/chrizzi/](https://www.linkedin.com/in/chrizzi/) 
