Template.registerHelper('formatDate', function (date) {
    return moment(new Date(date)).format('LLL');
});

Template.registerHelper('getTreatmentNames', function (req) {
    var keys = [];
    for (var key in req) {
        if (req.hasOwnProperty(key)) {
            data={}
            data['name'] = key;
            data['value'] = req[key];
            keys.push(data);
        }
    }
    return keys;
});

Template.registerHelper( 'formatSpace', ( string ) => {
  return string.replace(/ /g,"_");
});

Template.registerHelper( 'formatUndrscr', ( string ) => {
  return string.replace(/_/g, " - ");
});