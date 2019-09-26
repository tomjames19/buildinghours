# Getting Started
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
Then select y for all following questions.

### Add Hosting
```bash
amplify add hosting
```
For security purposes select 'production' with cloudfront.  Then select default settings will do.

### Pushing it to the cloud
```bash
amplify push
```
This will push all of our changes to the cloud and build your DynamoDb table and Graphql API.  It will also provision a hosting
bucket and cloudfront distribution.  This will take some time, but once it is complete run
```bash
amplify publish
```
This command will build and deploy the application to cloudfront and return a url where you can view the application.
Sign up for the application and log in to get started!

# Local Development



