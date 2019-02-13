var fs = require('fs');

module.exports = {
    readJSONFile: function(filePath) {

		var json;

        fs.readFile(filePath, (err, data) => {
			if (err)
				console.log(err);
			else {
				json = JSON.parse(data);
				//console.log(json);

			}
		})

		return json;
    }
}