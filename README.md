This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

The skeleton of the project was taken from the above URL.

This repository is the frontend of a twitter Analysis application for a college module.

The frontend is developed using ReactJS and the backend is using NodeJS that connects to a NoSQL database.

The project is deployed on our IBM BlueMix set up.

The Goal of the project is to perform sentiment analysis on returned tweets.

These tweets are then categorised into either negative, positive tweets based on the sentiment analysis scoring. This tool came from a NPM package called sentiment. An extra feature then regardless of the sentiment score, will put users with followers greater than 10,000 into the celebrity category.

Overview: 

Section One: Input a trend word and the most recent 100 tweets get returned categorised from various users.
Section Two: Enter a twitter user, provided the profile is set to public, will return all the tweets posted by this users account now categorised.
Section Three: Post a tweet directly to your twitter account.

