/*****************************************************************************/
/*  Client and Server Methods */
/*****************************************************************************/

if (Meteor.isServer) {
    Meteor.methods({

        'retrieveMedia': function (coordinate) {
            this.unblock();
            try {
                // coordinate = ['GSM935360', 'MER41B'];
                var result = Meteor.http.call('GET', "http://epigenomegateway.wustl.edu/cgi-bin/subtleKnife?repeatbrowser%3Don%26getconsensuswig%3Don%26rpbrDbname%3Dhg19repeat%26geo%3D" + coordinate[0] + "%26subfam%3D" + coordinate[1]);
            } catch (error) {
                throw new Meteor.Error(error.getMessage());
            }

            if (result.statusCode === 200) {
                return result.content;
            } else {
                throw new Meteor.Error('HTTP get status ' + result.statusCode);
            }
        },
        'getsubfamcopiesonly': function (urlString) {
            this.unblock();
            try {
                // coordinate = ['GSM935360', 'MER41B'];
                var result = Meteor.http.call('GET', "http://epigenomegateway.wustl.edu/cgi-bin/subtleKnife?" + urlString);
            } catch (error) {
                throw new Meteor.Error(error.getMessage());
            }

            if (result.statusCode === 200) {
                return result.content;
            } else {
                throw new Meteor.Error('HTTP get status ' + result.statusCode);
            }
        },

        'getsubfamcopieswithtk': function (urlString) {
            this.unblock();
            try {
                // coordinate = ['GSM935360', 'MER41B'];
                var result = Meteor.http.call('GET', "http://epigenomegateway.wustl.edu/cgi-bin/subtleKnife?" + urlString);
            } catch (error) {
                throw new Meteor.Error(error.getMessage());
            }

            if (result.statusCode === 200) {
                return result.content;
            } else {
                throw new Meteor.Error('HTTP get status ' + result.statusCode);
            }
        },

        'httpGETcall': function (urlString) {
            this.unblock();
            if (! urlString ) {
                var urlString = 'http://epigenomegateway.wustl.edu/cgi-bin/subtleKnife?loadgenome%3Don%26dbName%3Dhg19%26rpbrDbname%3Dhg19repeat%26rpbr_init%3Don&session=ZDFE9bTE2e&statusId=1&hmspan=1100';
            }
            
            try {
                var result = Meteor.http.call('GET', urlString);
            } catch (error) {
                throw new Meteor.Error(error.getMessage());
            }

            if (result.statusCode === 200) {
                return result.content;
            } else {
                throw new Meteor.Error('HTTP get status ' + result.statusCode);
            }
        }
    });
}


