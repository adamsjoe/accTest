var helper         = require('../../helpers/helpers.js');
var layout         = require('../../helpers/layout.js');
var day            = require('../../helpers/dayHelper.js');
var readJSON       = require('../../helpers/readJSON.js');
var rand           = require('../../helpers/randomNo.js');
const reporter     = require('wdio-allure-reporter')
var fs             = require('fs');

describe('Glasgow City', function(){

	it('should return 5 results for "Glasgow"', function() {	
		
		// setup the report
		helper.setupReport('Return 5 day results', 'medium', 'Return 5 day results for "Glasgow"');
		helper.enterText(layout.city, 'name', 'Glasgow');
		
		// read in the json
		//var json = readJSON.readJSONFile('./src/data/glasgow.json');

		var json;
		fs.readFile('./src/data/glasgow.json', (err, data) => {
			if (err)
				console.log(err);
			else {
				json = JSON.parse(data);
				//console.log(json);

			}
		})

		// this isn't very nice
		helper.pauseExec(1000);

		// how many list elements we we have
		var le = json.list.length;

		console.log(le);

		var temp = [];

		// loop over the json to get the list of dates we have weather reports for
		for (var i = 0; i < le; i++) {
			var datePart = json.list[i].dt_txt.split(" ");
			temp.push(datePart[0]);
		}

		// now let's split out the duplicates.  We have our list of dates
		 var datesUnique = temp.filter(function(item, index) {
		 	return temp.indexOf(item) >= index;
		})

		// before we check that the days which are shown are correct, we should check we get 5 results
		// do this in the json and then by checking each of the dayXName fields
		helper.assertValue(datesUnique.length, 5);

		// make the datestring into something we can use for a comparison
		// this is really a horrible way to do this
		var date1 = new Date(datesUnique[0]);
		var date2 = new Date(datesUnique[1]);
		var date3 = new Date(datesUnique[2]);
		var date4 = new Date(datesUnique[3]);
		var date5 = new Date(datesUnique[4]);

		var theDay1 = date1.getDay();
		var theDay2 = date2.getDay();
		var theDay3 = date3.getDay();
		var theDay4 = date4.getDay();
		var theDay5 = date5.getDay();

		// check day-1 has the day we
		helper.verifyValue(layout.day1Name, 'css', day.getDay(theDay1))
		helper.verifyValue(layout.day2Name, 'css', day.getDay(theDay2))
		helper.verifyValue(layout.day3Name, 'css', day.getDay(theDay3))
		helper.verifyValue(layout.day4Name, 'css', day.getDay(theDay4))
		helper.verifyValue(layout.day5Name, 'css', day.getDay(theDay5))

		helper.createReportTextAttachment('Values Used in this Test', `Expected Day 1: ${day.getDay(theDay1)}\nActual Day 1: ${helper.getValue(layout.day1Name)}\n`);
		helper.createReportTextAttachment('Values Used in this Test', `Expected Day 2: ${day.getDay(theDay2)}\nActual Day 2: ${helper.getValue(layout.day2Name)}\n`);
		helper.createReportTextAttachment('Values Used in this Test', `Expected Day 3: ${day.getDay(theDay3)}\nActual Day 3: ${helper.getValue(layout.day3Name)}\n`);
		helper.createReportTextAttachment('Values Used in this Test', `Expected Day 4: ${day.getDay(theDay4)}\nActual Day 4: ${helper.getValue(layout.day4Name)}\n`);
		helper.createReportTextAttachment('Values Used in this Test', `Expected Day 5: ${day.getDay(theDay5)}\nActual Day 5: ${helper.getValue(layout.day5Name)}\n`);


	});

	it('should have show a 3 hour forecast', function() {
		helper.setupReport('3 hour forecast', 'medium', 'should have show a 3 hour forecasts');
		helper.enterText(layout.city, 'name', 'Glasgow');
		
		reporter.createStep('Read in the JSON for the selected city')
		 
		var json;
		fs.readFile('./src/data/glasgow.json', (err, data) => {
			if (err)
				console.log(err);
			else {
				json = JSON.parse(data);
				//console.log(json);

			}
		})
		
		helper.pauseExec(1000);
		
		// for the given city, select a random day, click the day, click a random forecast, see if that corresponds to the json

		var selectedDay = 0;

		 reporter.createStep('now get the temp, wind speed, rain and pressure for this element');
		// now get the temp, wind speed, rain and pressure for this element
			
		helper.pauseExec(1000);
		
		var li = json.list[selectedDay];

		var temp_max  = Math.floor(json.list[selectedDay].main.temp_max);
		var temp_min  = Math.floor(json.list[selectedDay].main.temp_min);
		var wind      = Math.floor(json.list[selectedDay].wind.speed);
		var rain      = Math.floor(json.list[selectedDay].rain["3h"]);
		var press     = Math.floor(json.list[selectedDay].main.pressure);

		var dateTime  = json.list[selectedDay].dt_txt.split(" ");
		var date      = dateTime[0];
		var tmpDate   = date.split("-");
		var day       = tmpDate[2];
		var time      = dateTime[1];

		var tmpTime   = time.split(":");
		var hour      = parseInt(tmpTime[0]);
		var min       = tmpTime[1];

		helper.pauseExec(1000);

		// so first lets click on the day we are interested in.
		// this has a span containing the day only - we have this in the day variable
		var dayElement = 'span='+day;
		const elementDay = $(dayElement);
		elementDay.click();

		// now hardcoded to use the first hour element.
		// we need to increase the time by an hour to account for timezone
		hour+=1;

		// verify some values
		helper.verifyValue(layout.hour1, 'css', hour+min); // time
		helper.verifyValue(layout.tempMax, 'css', temp_max+'°'); // max temp
		helper.verifyValue(layout.tempMin, 'css', temp_min+'°'); // min temp
		helper.verifyValue(layout.wind, 'css', wind+'kph'); // wind
		helper.verifyValue(layout.pressure, 'css', press+'mb'); // pressure
		helper.verifyValue(layout.rain, 'css', rain+'mm'); // rain


	});

// 	it('should have show a 3 hour forecast', function() {
// 		helper.setupReport('3 hour forecast', 'medium', 'should have show a 3 hour forecasts');
// 		// for this test, we will randomly select a different day and hour on each run for a given city
	   
// 	   reporter.createStep('Read in the JSON for the selected city')
		
// 	   var json;
// 	   fs.readFile('./src/data/glasgow.json', (err, data) => {
// 		   if (err)
// 			   console.log(err);
// 		   else {
// 			   json = JSON.parse(data);
// 			   //console.log(json);

// 		   }
// 	   })
	   
// 	   helper.pauseExec(1000);

// 	   // how many elements do we have
// 	   var le = json.list.length;
// 	   // just noticed that this is stored in the json - my bad

// 	   // get a random number (smaller than our number of elements in the list section) 
// 	   //var selectedDay = rand.generateRandomNo(1, le); 
// 	   var selectedDay = 0;
	   
// 	   // now get the temp, wind speed, rain and pressure for this element
// 	   reporter.createStep('now get the temp, wind speed, rain and pressure for this element');
	   
// 	   // these pauses are really nasty
// 	   helper.pauseExec(1000);
	   
// 	   //var li = json.list[selectedDay];

// 	   // setup the variables we are interested in
// 	   var temp_max  = json.list[selectedDay].main.temp_max;
// 	   var temp_min  = json.list[selectedDay].main.temp_min;
// 	   var wind      = json.list[selectedDay].wind.speed;
// 	   var rain      = json.list[selectedDay].rain["3h"];
// 	   var press     = json.list[selectedDay].main.pressure;

// 	   // for date and time, we will use these and then work backwards to find the elements
// 	   // on screen to take the data for

// 	   // first we split the date time into time and date
// 	   var dateTime  = json.list[selectedDay].dt_txt.split(" ");
// 	   var date      = dateTime[0];
// 	   var tmpDate   = date.split("-");
// 	   // we really only care about the day (so don't bother getting month or year)
// 	   var day       = tmpDate[2];
	   
// 	   // we only care about hours and mins
// 	   var time      = dateTime[1];
// 	   var tmpTime   = time.split(":");
// 	   var hour      = parseInt(tmpTime[0]);
// 	   var min       = tmpTime[1];

// 	   helper.pauseExec(2000);
	   
// 	   //console.log(li);

// 	   // bit of debugging
// 	   //console.log('date is   :' + date);
// 	   //console.log('time is   :' + time);
// 	   //console.log('temp max  :' + Math.floor(temp_max));
// 	   //console.log('temp min  :' + Math.floor(temp_min));
// 	   //console.log('wind      :' + Math.floor(wind));
// 	   //console.log('rain      :' + Math.floor(rain));
// 	   //console.log('press     :' + Math.floor(press));

// 	   // now I have this, time to look find this on screen
// 	   // find the span which contains '20' (our date) and click it
// 	   var locator = 'span='+ day;
// 	   const element = $(locator);
// 	   console.log(locator.toString());
// 	   const attr = element.getAttribute('data-test')
// 	   console.log(attr);
// 	   element.click();

// 	   helper.pauseExec(2000);

// 	   // due to timezone, add an hour to the hour
// 	   hour += 1;

// 	   // try the same as above this time for time, here is where this falls over and won't find the span I need
// 	   var newHour  = hour.toString();
// 	   var locator2 = 'span='+newHour+min;
// 	   console.log(locator2.toString());
// 	   const element2 = $(locator2);
// 	   const attr2 = element2.getAttribute('data-test')
// 	   console.log(attr2);

// 	   // after this, we should have had the data-test attribute for the time, from that the others we are interested in could be worked out
// 	   // would then just be a case of verifying each of these

//    });
		
});