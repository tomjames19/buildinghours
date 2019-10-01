This project was created on top of AWS Amplify.

## Prerequisites
Node: ~8.10.0
Amplify: ~1.7.0
```bash
nvm install v8.10.0
nvm alias default v8.10.0
npm install -g @aws-amplify/cli
```

## Install Dependencies
```bash
npm install
```

## Setting up Backend
```bash
amplify init
```
- this will run you through a serious of questions relating to your project and ask you to select an aws profile.

### Add Authentication
```bash
amplify add auth
```
Select the default configurations for all questions

### Add API
```bash
amplify add api
```
Select 'Graphql' then select Amazon Cognito as means of authentication.  Amplify will ask you if you have an annotated graphql schema
select 'y' and then enter the path to 
```bash 
/[pathtodirectory]/buildinghours/src/utils/schema.graphql 
```

### Add Hosting
```bash
amplify add hosting
```
For security purposes select 'production' with cloudfront.  Then select default settings will do.

### Pushing it to the cloud
```bash
amplify push
```

Amplify will ask if you want it to generate mutations and quieries for you graphql Schema, select yes, and then for nested depth select 3.  This will give us the depth needed to query down all of our nested layers.

Finall this will push all of our changes to the cloud and build your DynamoDb table and Graphql API.  It will also provision a hosting
bucket and cloudfront distribution.  This will take some time, but once it is complete run

```bash
amplify publish
```
This command will build and deploy the application to cloudfront and return a url where you can view the application.
Sign up for the application and log in to get started!

# Local Development
After setting up the backend you can develop and test locally using 
```bash
npm start
```
This application was created using [Create-React-App](https://github.com/facebook/create-react-app) you can view their documentation for more details.

# About the Building Hours Project
## Background 
This application is a proof of concept tool for creating, updating and deleting building hours to be used in conjunction with Amazon's [QnABot](https://github.com/aws-samples/aws-ai-qna-bot) project.  Using this UI you can create update and delete buildings or offices within your organization.  This information is saved to a Dynamo Database that Amplify creates within your AWS account.  Upon creation of this Dynamo Db you can use the premade 'Building Hours' extension in the QnA Bot content designer to plug your QnA bot into this building tool and open up your building hours for use on Alexa and Web based chat bots.  

## Application Structure
The buildinghours application is structured based off of the create-react-app layout.  Under the source folder the application is App.js this is the home file for the application.  Inside is where we configure Amplify by configuring the awsmobile file.  The app is exported using 'withAuthenticator' to take advantage of the authentication libraries amplify and cognito provide.  After this the source is broken into 4 groups.

### Containers
Containers is for higher level components that hold a smaller subset of components.  In the current state of buildinghours this only contains a home component.  This sets up the template of the basic home screen.

### Components
Here we have several smaller components that control small pieces of the application
- addBuilding.js contains the popup dialog for creating new buildings
- dayForm.js contains the individual day component used in the form to create schedules it is a child component of weekForm.js
- scheduleForm.js is the parent component of both weekForm and dayForm and contains the full form to create a new schedule.
- weekList.js is a component used by home for displaying the schedules per building.

### Container and Component Hierarchy
+Home
++addBuilding
++weekList
++scheduleForm
+++weekForm
++++dayForm

### graphql
This contains the amplify generated mutations, queries, subscriptions and the schema in json format.

### utils
Utils contains a custom queries.js file for custom queries used in the application as well as the parent schema.graphql which was used in the creation of the DynamoDb table.

## Making changes to Dynamo and graphql api
If you would like to make changes to your DynamoDb tables and to your graphql api you can go to the file 
'/amplify/backend/api/nameofyourapi/schema.graphql' make your changes to this file and then run 
```bash
amplify update api
amplify push
``` 
This will update your tables and api and will give you the option to have amplify recreate your graphql folder under /src.  However you will need to change the queries in /src/utils/queries.js to match your new schema.


# Planned enchancements
1. Form validation - currently there are no validation safeguards in place.  This means you could give a schedule a start date of 12/1 and an end date of 11/1 which would throw and error when queried by the QnA bot.
2. State management.  This project was initially completed using plain React, but it has become apparent that the user experience would be greatly benefitted by having a state management system in place such as [Redux](https://react-redux.js.org/)
3. Customization of Amplify Components - Amplify components such as 'log in', 'sign up', and 'sign out' all need to be customized and set just for the building hours application.
4. Multiple Opening and closing times per day.  We would like to support the ability to have a building open and close twice within one day.
5. Staging and production Databases. - One data base to stage changes that will then be submitted for apporval before commited to production, thus assuring the data presented to the public is the most accurate.
6. Cognito plug into other identity providers such as Microsoft AD or OpenID.  Possibly look into replacing cognito with Okta and using API key for graphql queries.
