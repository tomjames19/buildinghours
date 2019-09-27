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
Select 'Graphql' then select Amazon Cognito as means of authentication.  Finally when prompted 


