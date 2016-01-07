Template.registerHelper('formatDate', function (date) {
    return moment(new Date(date)).format('LLL');
});