const paperspace_node = require('paperspace-node')
const env = require("../../environment/environment");

const ps = paperspace_node({
    apiKey: env.paperspace.apiKey
})
/*
ps.machines.list(function (err, machines) {
    if (err) {
        console.error(err)
        //throw err
    }
    console.log(machines);
    machines.forEach(machine => {
        console.log("machine: ", machine)
        ps.machines.show({ machineId: machine.id }, function (serr, sres) {
            if (serr) {
                console.error(serr)
            }
            console.log("show: ", sres);
        })
    });
})
*/
module.exports = {
    paperspace: ps
};