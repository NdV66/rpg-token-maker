# Getting Started with RPG Token Maker
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project allows you to create an RPG token from your own image.

This is only my MVP/POC project, so go easy with me.
I've been just trying to use some new technologies and logic.
This app doesn't work with mobile or touch screens.

# Run locally
## Requirements
- Node.js (>= 16) is installed
- yarn or npm is installed

## How to run?
1. Download repo.
2. Go to the main folder.
3. Run `yarn install`.
4. Run `yarn start` to run app in the dev mode.
5. App is available under `localhost:3000`.

<!-- # How to deploy?
0. Create dedicated branch for the version
1. Change version in the `package.json`.
2. Make sure everything is merged etc.
3. Create git tag. \
`git tag -a vX.X.X -m "What was done"` \
`git push --tags`
4. Merge all changes to the `master` branch.
5. After merge a simple deploy action is called //TODO
6. Refresh master locally using `git pull origin master`.
7. App is available under `rpg-token.narin.dev` -->

# Architecture
## Overview
![Here should be an architecture image](./doc/architectureFlow.jpg "Title")

## Folders
*Warning!* Everything important parts should be always exported by a module`index.ts`.
- `/doc` \
    Documentation, version features etc.
- `/public` \
    All public data, for example: favicon.
- `/src`\
    Source code folder.
    - `modelBuilder.ts`
    - `appEnv.ts`
    - `App.tsx`
    - `/data` \
        All **const** data for the app (translations, icon names, errors, color themes etc.).
    - `/models` \
        Models with logic for this app.
    - `/components` \
        Visual part of this app.
        - `/<name>Component` \
        A dedicated areas of a page(s).
    - `/tests` \
        Test for the app.
        - `/models` \
            Tests for models.
    - `/tools` \
        All tools and small helpers.
    - `/types` \
        All important types and all enums.

## Naming of the image
- `A` top left
- `B` top right
- `C` bottom right
- `D` bottom left \
![Image points and number lines](./doc/image.jpg "Title")

## Naming conventions
- use camelCase
- "real" const should have THIS_NAME
- follow DRY!
- less code in more files is better than more code in less files :)
### Models
- should be named as `<Name>Model`
- file name should be the same as the model name
- should export it's interface, named as `I<Name>`
- model class should implement its interface
- use as vanilla TS as possible
### ViewModels
- should be named as `<ViewName>ViewModel`
- file name should be the same as the viewModel name
- should export it's interface, named as `I<ViewName>ViewModel`
- viewModel class should implement its interface
- can use RxJS (if needed)
- can combine its own logic with dedicated view components, but not with other view models
### ViewComponents
- "small" view model
- should be named as `<ViewName>ViewComponent`
- file name should be the same as the viewComponent name
- should export it's interface, named as `I<ViewName>ViewComponent`
- viewComponent class should implement its interface
- can use RxJS (if needed)
### Contexts & ContextWrappers
- React Context
- should be named as `<Name>Context`
- should have its `<Name>ContextWrapper` as a separate file
- file name should be the same as the context name
- should export it's interface, named as `I<Name>Context`
- context should use its interface
- can use RxJS (if needed)
### Pages
- should be named as `<Name>Page`
- file name should be the same as the page name
- can use RxJS (if needed)
- all logic should be placed inside its own hook (often in the same file)
### PageComponents
- should be named as `<Name>PageComponent`
- file name should be the same as the pageComponent name
- can use RxJS (if needed)
- all logic should be placed inside its own hook (often in the same file)
