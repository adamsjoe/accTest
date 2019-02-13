### Update

* Using webdriverio 
* Using allure as a reporting tool

Chose webdriverio as (with Zalenium - not included here) the tests can be run on a dockerised selenium grid.  Very quickly.

Included a couple of extra tests, checking Glasgow was the default city and checking that you get an error if there is no entry (the span isn't working so it is marked as a "broken" test)

The plan was to have the test run and to select a different day and hour each time through, rather than doing any hardcoding.  However, ran into some issues and out of time with getting the time working.

Basic run was parse the JSON, get the number of list elements, get a random number, pull out rain, temp, pressure and time details.
From the time, split into date and into time.  From the date, select the day only.  The day is stored as part of the span, so we can click on that and then a list of times available.  We can then use the time component of the date concat the hour and min (with the hour having an extra +1 hour added to compensate for timezone) and then using the span, get the data-test attribute.  This could then use this to work out the other data-test elements.  Verification would then be easy.  Ran into issues with the time span element not being recognised.  That is included for reference/

### What could be improved?

Finish the test - it's not there yet.
Replace the pauses with waitFors (or create the wait fors)
Convert to a more cucumber esque format.
Have the JSON reader as a function, even to the point of having all the cities as an array and one test going through all the cities.

### Failing test

The Glasgow JSON has rain at 0.005, rounding down this give 0 - but the screen shows 1mm of rain, so this is picked up.

### Report

There is a report generated so far in the allure-report directory.  I like the use of allure, it let's tests be assigned a severity, which show up on the graph - which is good for management if they ask.

To generate another report (after a test has run)

    $ node_modules\.bin\allure generate allure-results allure-report

(append .cmd after allure if using windows)

### Running the app locally

Install the required dependencies:

    $ npm install

To start up the application:

    $ npm run develop

To start webdriver
    
    $ node_modules\.bin\webdriver-manager start

To run the tests

    $ node_modules\.bin\wdio wdio.conf.js

(if running windows, add .cmd to the end of wdio and webdriver-manager)
