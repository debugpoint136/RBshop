/*****************************************************************************/
/*  Client and Server Methods */
/*****************************************************************************/

if (Meteor.isServer) {
    Meteor.methods({

        'retrieveMedia': function (coordinate) {
            this.unblock();
            try {
                var result = Meteor.http.call('GET', "http://epigenomegateway.wustl.edu/cgi-bin/subtleKnife?repeatbrowser%3Don%26getconsensuswig%3Don%26rpbrDbname%3Dhg19repeat%26geo%3D" + coordinate[0] + "%26subfam%3D" + coordinate[1]);
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


