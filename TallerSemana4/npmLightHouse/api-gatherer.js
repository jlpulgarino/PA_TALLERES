'use strict';

const Gatherer = require('lighthouse').Gatherer;

class TimeToAPI extends Gatherer {
    afterPass(options) {
        const driver = options.driver;

        return driver.evaluateAsync('window.apiCallTime')
            .then(apiCallTime => {
                if (!apiCallTime) {

                    throw new Error('Unable to find api call metrics in page');
                }
                return apiCallTime;
            });
    }
}

module.exports = TimeToAPI;