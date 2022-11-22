# feastful - Search for cooking lessons

## Description

A fully responsive application to offer as well as look for cooking lessons in Vienna. The application has the following pages.

- A landing page
- An overview of all cooking lessons that are available in the future, including a filtering function for languages, cuisines and postal codes
- The single experience page, where information of the lesson is included, as well as the personal information of the host and the possibility to contact the host via email
- A login / register page, when logged in, the hosts have certain authorizations for certain pages
- An account page of the hosts, where they can update or delete cooking lessons they offer, update their personal information as well as delete the account (only available when logged in)
- A page to add personal information (only available when logged in)
- A page to add experiences (only available when logged in)

## Technologies

- Next.js
- React
- JavaScript
- Emotion/react
- MaterialUI
- Cloudinary
- PostgreSQL
- Typescript
- REST API
- Fly.io
- Figma (Design of website, API Flowchart)
- Notion (Timeline, Break down of to do's)
- DrawSQL

## Screenshots of the Application

### Homepage

![Screenshot of the homepage](./landingpage.png 'Screenshot of the homepage')

### Cooking lesson overview Page

![Screenshot of the experience overview](./experiencepage.png 'Screenshot of the experience overview')

### Account Page

![Screenshot of the hosts' account](./accountpage.png 'Screenshot of the hosts' account')

## Screenshots of further tools used for the planning process

### DrawSQL

![Screenshot of the database chart](./DrawSQL_Chart.png 'Screenshot of the database chart')

### Figma - responsive website layout

![Screenshot of the desktop layout in Figma](./figma_desktop.png 'Screenshot of the desktop layout in Figma')

![Screenshot of the tablet layout in Figma](./figma_tablet.png 'Screenshot of the tablet layout in Figma')

![Screenshot of the phone layout in Figma](./figma_phone.png 'Screenshot of the phone layout in Figma')

### Figma - API Flowchart

![Screenshot of the API Flowchart in Figma](./API_Chart.png 'Screenshot of the API Flowchart in Figma')

### Notion - Timeline and To Do's Overview

![Screenshot Timeline and To Dos in Notion](./notion.png 'Screenshot Timeline and To Dos in Notion')

## Setup instructions

- Clone the repository with git clone <repo>
- Setup the database by downloading and installing PostgreSQL
- Create a user and a database
- Create a new file .env
- Copy the environment variables from .env-example into .env
- Replace the placeholders xxxxx with your username, password and name of database
- Install dotenv-cli with yarn add dotenv-cli
- Run yarn install in your command line
- Run the migrations with yarn migrate up
- Start the server by running yarn dev
