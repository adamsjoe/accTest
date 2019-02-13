var assert     = require('assert');
const reporter = require('wdio-allure-reporter')

module.exports = {

	setupReport: function(feature, severity, desc) {

		reporter.feature(feature)
		reporter.severity(severity)
		reporter.addDescription(desc)

	},

	createReportTextAttachment: function(heading, text) {
		reporter.createAttachment(heading, text);
	},

	createReportScreenshot: function(name, content, type) {
		reporter.createAttachment(name, content, type);
	},
		
	enterText: function(locator, type, text) {
		var stepDesc = 'Enter "' + text + '" into the field identified with selector "' + type + '" and referenced as "' + locator +'"'
		
		reporter.createStep(stepDesc);
		
		var locatorString;

		switch(type) {
			case 'id':
				locatorString = '#' + locator;
				break;
			case 'name':
				locatorString = '[name="' + locator + '"]';
				break;
			case 'css':
				locatorString = "$('.'+locator+ ')'";
				break;
		}
		browser.setValue(locatorString, text);
	},

	pauseExec: function(time) {
		/*
		 * this really needs replacing with a wait for element of some sort
		 */
		var stepDesc = 'Pausing things for ' + (time/1000) + ' seconds.'

		reporter.createStep(stepDesc);

		browser.pause(time)
	},

	getTitle: function() {
		var stepDesc = 'Getting the title of the page';
		
		reporter.createStep(stepDesc);

		return browser.getTitle();
	},

	getTextUsingCSS: function(locator) {
		var stepDesc = 'Getting the text from the the Element at "' + locator + '"';
	
		reporter.createStep(stepDesc);

		var t = browser.element(locator).getText();
		return t;

	},	

	verifyTitle: function(expectedTitle) {
		var stepDesc = 'Verifying the page title is "' + expectedTitle + '"';
		
		reporter.createStep(stepDesc);

		var actualTitle = browser.getTitle();
		assert(expectedTitle == actualTitle, 'Expected "' + expectedTitle + '" but got "' + actualTitle + '".  The test has failed.'); 	
	},

	verifyText: function(locator, type, expectedText) {
		
		var stepDesc = 'Verifying the text at "' + locator + '" is "' + expectedText + '"';
		
		reporter.createStep(stepDesc);
		
		switch(type) {
			case 'id':
				locatorString = '#' + locator;
				break;
			case 'css':			 
				//locatorString = "$('" + locator + "')";
				locatorString = locator;
				break;			
		}

		var actualText = browser.getValue(locatorString);
		//var actualText = locatorString.getText();

		assert(expectedText == actualText, 'Expected "' + expectedText + '" but got "' + actualText + '".  The test has failed.'); 	
	},
	
	verifyValue: function(locator, type, expectedText) {
		
		var stepDesc = 'Verifying the text at "' + locator + '" is "' + expectedText + '"';
		
		reporter.createStep(stepDesc);
		
		switch(type) {
			case 'id':
				locatorString = '#' + locator;
				break;
			case 'css':			 
				//locatorString = "$('" + locator + "')";
				locatorString = locator;
				break;			
		}

		var actualText = browser.getText(locatorString);		

		assert(expectedText == actualText, 'Expected "' + expectedText + '" but got "' + actualText + '".  The test has failed.'); 	
	},	

	getValue: function(locator, type, expectedText) {
		
		var stepDesc = 'Verifying the text at "' + locator + '" is "' + expectedText + '"';
		
		reporter.createStep(stepDesc);
		
		switch(type) {
			case 'id':
				locatorString = '#' + locator;
				break;
			case 'css':			 
				//locatorString = "$('" + locator + "')";
				locatorString = locator;
				break;			
		}

		return browser.getText(locatorString);		

		
	},	


	assertValue: function(actualValue, expectedValue) {
		
		var stepDesc = 'Verifying the value of "' + actualValue + '" equals "' + expectedValue + '"';
		
		reporter.createStep(stepDesc);	

		assert(expectedValue == actualValue, 'Expected "' + expectedValue + '" but got "' + actualValue + '".  The test has failed.'); 	
	},	

	
}