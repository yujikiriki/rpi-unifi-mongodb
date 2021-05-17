/*
 Initializes the docker provisioned Mongo instance configuring all the users and authorizations required to work.
*/

/* In admin db */

db.createRole({
    role: "executeFunctions",
    privileges: [{
        resource: {
            anyResource: true
        },
        actions: ["anyAction"]
    }],
    roles: []
})

/* In unifi db */

db = db.getSiblingDB('unifi')

db.createUser({
    user: 'kiriki',
    pwd: 'kiriki',
    roles: [{
        role: 'dbOwner',
        db: 'unifi'
    }, {
        role: 'clusterMonitor',
        db: 'admin'
    }]
})

db.grantRolesToUser("kiriki", [ { role: "executeFunctions", db: "admin" } ]) 

/* In unif_stat db */

db = db.getSiblingDB('unifi_stat')

db.createUser({
    user: 'kiriki',
    pwd: 'kiriki',
    roles: [{
        role: 'dbOwner',
        db: 'unifi_stat'
    }, {
        role: 'clusterMonitor',
        db: 'admin'
    }]
})

db.grantRolesToUser("kiriki", [ { role: "executeFunctions", db: "admin" } ]) 