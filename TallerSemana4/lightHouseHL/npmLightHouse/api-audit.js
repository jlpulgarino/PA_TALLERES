'use strict';

const Audit = require('lighthouse').Audit;

const MAX_API_TIME = 3000;

class callApiAudit extends Audit {
    static get meta() {
        return {
            category: 'MyPerformance',
            name: 'api-audit',
            description: 'API called and response',
            failureDescription: 'API slow to response',
            helpText: 'Used to measure time from API call to when this response' +
            ' API is shown.',

            requiredArtifacts: ['TimeToAPI']
        };
    }

    static audit(artifacts) {
        const calledTime = artifacts.TimeToAPI;

        const belowThreshold = calledTime <= MAX_API_TIME;

        return {
            rawValue: calledTime,
            score: belowThreshold
        };
    }
}

module.exports = callApiAudit;