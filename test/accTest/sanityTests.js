var helper         = require('../../helpers/helpers.js');
var layout         = require('../../helpers/layout.js');
var day            = require('../../helpers/dayHelper.js');
var fs = require('fs');

describe('Sanity Checks', function(){

	it('should have a title of "5 Weather Forecast"', function() {
		// not asked for in requirements, used as a test that framework was working and left in
		helper.setupReport('Check title', 'medium', 'Check the title is "5 Weather Forecast"');
		helper.verifyTitle('5 Weather Forecast');		
		helper.createReportScreenshot('SCREENSHOT', browser.saveScreenshot('tmp/sanityScreenshot.png'), 'image/png');		
	});

	it('should have a "Glasgow" as the default city', function() {

		// looked at the index.js file for the CONST setting
		var expectedCity = 'Glasgow';

		helper.setupReport('Check default city', 'medium', 'Check the default city is "Glasgow"');
		helper.verifyText(layout.city, 'id', 'Glasgow');					
	});

	it('should have a give an error if the city is not found', function() {
		helper.setupReport('Check error message', 'medium', 'Check an error message is displayed if the city used is not listed');
		helper.enterText(layout.city, 'name', 'Glasgowland');

		helper.pauseExec(1000);
		
		helper.verifyText(layout.errorText, 'css', 'Error retrieving the forecast');					
	});

		
});