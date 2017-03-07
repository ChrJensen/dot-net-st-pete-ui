# Beer Journal w/ Electron (March 7th, 2017)

## Introduction

Each `step-[x]` branch in this repository is a completed solution set.  The `README.md` of each branch describes the steps on how we got to the solution set from the prior step.

## Prerequisites

1. Sign up for a [GitHub](https://github.com) account
1. Install [git](https://git-scm.com/downloads)
1. Install node via [nvm](https://github.com/creationix/nvm)
1. Fork `https://github.com/johnrhampton/dot-net-st-pete-ui` to your personal GitHub
1. In a shell, execute `git clone https://github.com/[your GH username]/dot-net-st-pete-ui.git`
1. In a shell, execute `cd dot-net-st-pete-ui`
1. In a shell, execute `git checkout initial`

# How we got here

## Initialize project and Install Electron package
`npm init`

`npm install electron --save-dev`

## Open project in Editor of choice

## Add start script
`"start": "node src/app",`

## Add app.js
* Create `src/app.js`
* Add a console log
```javascript
/**
 * electron app main entry point
 */
console.log('electron app');
```

## Let's ensure node is up and running
`npm run start`

[Continue to Step 1](https://github.com/johnrhampton/dot-net-st-pete-ui/tree/step-one)
