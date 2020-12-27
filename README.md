![View_Projeto](Projeto.gif)

<h1 align="center">
  <img  src="src/assets/logo.svg"/>
  <br>
  <br>
  Github Explorer
</h1>

<h4 align="center">
  Explore repositories from Github and view their starts, forks and issues.
</h4>

<h6 align="center">
  Developed with ReactJS + Typescript during Rocketseat's Bootcamp GoStack.
</h6>

<br/>
<br/>

<h3 align="center">
  About the project
</h3>
<h5 align="justify">
GitHub Explorer is a frontend application that uses a GitHub API, made in ReactJS. The user can search for repositories by typing account / repository and, if the repository is found, it is saved in the localStorage of the browser and generates a list of repositories where the user can click on them and go to details where it shows the number of stars, forks, open problems and also displays a list of problems.

Technically, SOLID standards and tools standards were used to maintain code consistency and standardization, such as: typescript, editorconfig, eslint:

This application was developed following the [Rocketseat bootcamp](https://rocketseat.com.br)
</h5>

<br/>



# Prerequisites

* [Node.JS](https://nodejs.org/)
* [Yarn](https://classic.yarnpkg.com/)

# Setup
```
# First clone this repository
git clone https://github.com/SandroFrazaoS/github-explore-react

# Navigate to the root folder
cd github-explore-react

# Install all project dependencies
yarn

# Run the app
yarn start
```

<br/>

# Usage

On the first screen, type `[SandroFrazaoS]/[github-explore-react]` on the input area to search for a user repository. The result will be appended to a list below of previously searched repositories. The list will be saved on the local storage of the navigator.

<br/>

# Improvements
For my version of this application, I've made the following improvements:
- Add validation to check if user is searching for an already listed repository;
- Allow user to delete a repository from the list;

