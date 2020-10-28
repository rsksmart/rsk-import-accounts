
const rskapi = require('rskapi');

const host = rskapi.host(process.argv[2]);

host.listPersonalAccounts(function (err, data) {
    if (err)
        console.log(err.message);
    else
        console.dir(data);
});
