# Introduction

Hi, this is the readme of IoT Application Developer Tech Test by Jeremy Marvin C

(TL;DR GO TO "CODE EXPLANATION")

## Getting Started

To get started, the project is made on angular within electron.js encapsulation.

### Angular

Angular is a free and open-source development platform that is built on TypeScript. It is used for creating web-app with component-based architecture. Angular provides basic libraries and workflow like routing, forms management, ect. 

There are 3 main concepts from angular that are used throughout the app:
1. Components
A single component consists of a html file, css(scss) file, a typescript file, and a test file(unused). 
In Angular, javascripts are not provided on a script tag, but instead the javascript(typescript to be exact) is the entry point of a component.

2. Modules
Components needs to be declared by a module. A module contains the information of the context where components, other modules, and services exist. It provides abstraction of what goes where and allow angular to "tree-shake" unused imports.

3. Services
A service is an injectable codes that provides abstraction to codes that needs to be reused/shared between components.

### Electron.js

Electron.js is a software framework that allows developer to create a cross-platform desktop app using web-app technologies. In this app, electron allows angular to access the file system as if it is a native dekstop app.
Electron is also used to package the whole app into an exe file that can be easily redistributed.

## Developer guide

To setup for development, run "npm install", then go to app folder by running "cd app" and do another "npm install".
Once it's finished installing the node modules, run "npm run electron:build" to serve the app.

## Code Explanation

### Common structure

Directory to look at: src/app

A folder contains: component html file, component scss file, component ts file, module file, data model file, and service file. Their purposes are:
1. HTML -> Basic look of the GUI
2. SCSS -> Specific design-related property of the element in HTML
3. TS -> UI/UX related function (handles button click, disabling elements, calling services)
4. service -> Business logic related function (handles data manipulation and http/file-related calls)
5. model -> contain interface(class) of types used by the component
6. module -> declarations and imports

It is advised to open the ts file first as the entry point

Native functions like filesystem access are placed outside of the browserwindow context and is located in app/file-interface.ts

### Salary Converter

1. For information on the salary assigning algorithm, check out salary.service.ts in src/app/salary

2. For information on the data fetch code, also check out salary.service.ts

3. For information on how the app calls the main process(native dialog, read/write file), check out salary-converter.component.ts in src/app/salary, then electron.service.ts in src/app/core/services/electron, then file-interface.ts in app (app folder in the repo, same level as src)

### Sensor Insights

Note: since the chart of the file and simulation app is the same, the chart component is abstracted out so it can be reusable.

1. For information on the grouping algorithm, check out grouping.service.ts in src/app/sensor

2. For information on the charting algorithm(format to fit chart library), check out chart.component.ts in src/app/sensor

3. For information on the simulation algorithm(fake data generator), check out simulation.service.ts in src/app/sensor

4. For information on file read/write related, check out the simulation.component.ts in src/app/sensor/simulation and refer to point 3 of Salary converter.


# Thank you!
