# microbit-chart

> Gain rapid insight into macro social perception!

[youtube demonstration](https://www.youtube.com/watch?v=gwG9dyGc6Zw)
[microbit makecode project​](http://vuejs-templates.github.io/webpack/)
[github repo](https://github.com/noidsoup/microbit-survey-visualizer)

#The Problem:

Imagine being able to provide your audience a visually engaging and instantaneous way of demonstrating group sentiment? Written surveys are no good, we need data visualization!

#The Solution:

We use a microbit as a physical ‘yes’ or ‘no’ voting device to render a real time pie chart based on how many clicks each category has received. The microbit code is simply sending a yes or no vote and the Node Serialport library provides the access to our microbit controller in order to receive data from the device into an express based web server with vue as the frontend user interface. Socket IO is used to send messages from the server into the clien , in its final resting place as the data that powers our pie chart, powered by the Chartist data visualization library.

#Future Development:

This demonstration is certainly just an MVP, but something more thought out might include a wifi-based controller for ease of use, and more complex logic to support a variable rating (rather than just yes or no) as well as more attractive chart visualization and animation.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```