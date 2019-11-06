const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const uuid = require('uuid-random');
var crypto = require('crypto');
const jwt = require('jsonwebtoken');

const EnrollNode = require('../models/enroll-node');
const Pack = require('../models/pack');
const EnrollCompany = require('../models/enroll-company');
const RegisterUser = require('../models/register-user');

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://opstinuum:opstinuum@localhost:27017/opstinuum?retryWrites=true&w=majority";
const SECRET_KEY = uuid();

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(DATABASE_URL, options).then(
    () => { console.log("Connected to the database") },
    err => { "Unable to connect to the datasbase" }
);

function verifyToken(req, res, next) {

    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized Request");
    }

    try {
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            res.status(401).send("Unauthorized Request");
        } else {
            let payload = jwt.verify(token, SECRET_KEY);
            if(!payload) {
                res.status(401).send("Unauthorized Request");
            }             
            req.userId = payload.subject
            req.role = payload.role
            req.enrollmentSecret = payload.enrollmentSecret
            next()
        }
        
    } catch (error) {
        res.status(401).send("Unauthorized Request");
    }

}

router.get('/', verifyToken, (req, res ) => {
    
    EnrollNode.find({}).exec(function(err, enrollments) {

        if (err) {
            console.log('Error retrieving enrollments');
            res.send(err.message);
        } else {
            res.json(enrollments);
        }
    })
    
})

router.get('/getUserRole', verifyToken, (req, res) => {
    return res.status(200).json({role: req.role});
})

router.get('/enroll/:id', verifyToken, (req, res) => {

    EnrollNode.findOne({_id: req.params.id}, function (error, enrollment) {
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            res.json(enrollment);
        }
    })
})

router.post('/pack', verifyToken, (req, res) => {
    var newPack = new Pack();
    newPack._id = req.body._id;
    newPack.description = req.body.description;
    newPack.queries = req.body.queries;

    newPack.remove({_id: req.body._id});
    newPack.save(function(err, inserted) {

        if (err) {
            console.log('Unable to save the pack');
            console.log(err);
        } else {
            res.json(inserted);
        }
    });
})

router.post('/enroll-company', verifyToken, (req, res) => {
    var newEnrollCompany = new EnrollCompany();

    newEnrollCompany.enrollmentSecret = uuid();
    newEnrollCompany.companyName = req.body.companyName;
    newEnrollCompany.companyAddress = req.body.companyAddress;
    newEnrollCompany.country = req.body.country;
    newEnrollCompany.phone = req.body.phone;
    newEnrollCompany.website = req.body.website;
    newEnrollCompany.packs = req.body.packs;

    newEnrollCompany.remove({_id: req.body._id});
    newEnrollCompany.save(function(err, inserted) {

        if (err) {
            console.log('Unable to save the Enrolled Company');
            console.log(err);
        } else {
            res.json(inserted);
        }

    });
})

router.put('/enroll-company', verifyToken, (req, res) => {

    var newEnrollCompany = new EnrollCompany();
    var query = {'_id':req.body._id};

    newEnrollCompany.enrollmentSecret = req.body.enrollmentSecret;
    newEnrollCompany.companyName = req.body.companyName;
    newEnrollCompany.companyAddress = req.body.companyAddress;
    newEnrollCompany.country = req.body.country;
    newEnrollCompany.phone = req.body.phone;
    newEnrollCompany.website = req.body.website;
    newEnrollCompany.packs = req.body.packs;
    newEnrollCompany._id = req.body._id;

    EnrollCompany.findOneAndUpdate(query, newEnrollCompany, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.json(newEnrollCompany);
    });    
})

router.get('/enroll-company', verifyToken, (req, res) => {

    EnrollCompany.find({}).exec(function(err, enrolledCompanies) {

        if (err) {
            console.log('Error retrieving enrolledCompanies');
            res.send(err.message);
        } else {
            res.json(enrolledCompanies);
        }
    });
})

router.get('/enroll-company/:id', verifyToken, (req, res) => {
    
    EnrollCompany.findOne({_id: req.params.id}, function(err, enrolledCompany) {

        if (err) {
            console.log('Error retrieving Enrolled Company');
            res.send(err.message);
        } else {
            res.json(enrolledCompany);
        }
    });
})

router.get('/pack', verifyToken, (req, res) => {
    
    Pack.find({}).exec(function(err, packs) {

        if (err) {
            console.log('Error retrieving enrolments');
            res.send(err.message);
        } else {
            res.json(packs);
        }
    })
})

router.route('/login').post((req, res) => {

    var loginUser = new RegisterUser();
    loginUser._id = req.body._id;
    loginUser.password = crypto.createHash('md5').update(req.body.password).digest('hex');

    //check if enrollment secret is correct
    RegisterUser.findOne({_id: loginUser._id}, function(error, registeredUser) {

        if (error) {
            console.log('Error finding the registeredUser');
            res.status(500).json(error);
        } else {
            if (typeof registeredUser === 'undefined' 
                || !registeredUser 
                || loginUser.password !== registeredUser.password) {

                res.status(401).json({message : "incorrect UserName or Password"});

            } else {
                let payload = {subject: registeredUser._id, role: registeredUser.role, enrollmentSecret: registeredUser.enrollmentSecret};
                let token = jwt.sign (payload, SECRET_KEY);
                res.status(200).json({token});
            }
        }
    });
})

router.route('/register').post((req, res) => {

    var registerUser = new RegisterUser();
    registerUser._id = req.body._id;
    registerUser.name = req.body.name;
    registerUser.password = crypto.createHash('md5').update(req.body.password).digest('hex');
    registerUser.enrollmentSecret = req.body.enrollmentSecret;
    if (req.body.isAdmin) {
        registerUser.role = "ADMIN"
    } else {
        registerUser.role = "USER"
    }

    //check if enrollment secret is correct
    EnrollCompany.findOne({enrollmentSecret: req.body.enrollmentSecret}, function(error, enrollCompany) {

        if (error) {
            console.log('Error finding the enrolled company');
            res.status(500).json(error);
        } else if ((typeof enrollCompany !== 'undefined' && enrollCompany) || req.body.isAdmin) {
            
            registerUser.save(function(err, inserted) {
                if (err) {
                    console.log('Unable to register the User');
                    res.status(500).json(err);
                } else {
                    res.status(200).send("Successfully registered the user : " + inserted._id);
                }
            });

        } else {
            res.status(404).json({"message" : "No organization enrolled with this enrolled secret"});
        }
    });
})

//Methods call from the OSQuery(which is running on the client machine)
//The authentication works by using the certificates
router.route('/enroll').post((req, res) => {

    var newEnroll = new EnrollNode();
    newEnroll._id = req.body.host_identifier;
    newEnroll.enrollmentSecret = req.body.enroll_secret;
    newEnroll.host_details = req.body.host_details;

    EnrollCompany.findOne({enrollmentSecret: req.body.enroll_secret}, function(err, enrollCompany) {

        if (err) {
            console.log(err);
            res.json(err);
        } else if (typeof enrollCompany  !== "undefined" && enrollCompany) {
            
            newEnroll.packs = enrollCompany.packs;
            newEnroll.remove({_id: req.body.host_identifier});
            newEnroll.save(function(err, inserted) {
        
                if (err) {
                    console.log('Unable to save the enrollement');
                    console.log(err);
                    res.json({node_key: req.body.host_identifier, node_invalid: true});
                } else {
                    res.json({node_key: req.body.host_identifier, node_invalid: false});
                }
        
            });
        } else {
            res.json({node_key: req.body.host_identifier, node_invalid: true});
        }

    });
})

router.route('/config').post((req, res) => {
    
    var node_key = req.body.node_key;
    
    EnrollNode.findOne({_id: node_key}, async function (error, enrollment) {
        if (error) {
            console.log(error);
            res.json({node_invalid: true});
        } else if (typeof enrollment !== 'undefined' && enrollment && enrollment.packs.length > 0){

            let config = await getEnrolmentPacks(enrollment);
            res.json(config);

        } else {
            res.json({node_invalid: true});
        }

    })
})

async function getEnrolmentPacks(enrollment) {
    
    var config = {
        options : {
            "disable_logging": false,
            "schedule_splay_percent": "10",
            "events_expiry": "3600",
            "verbose": "false",
            "worker_threads": "2",
            "enable_monitor": true,
            "disable_events": false,
            "disable_audit": false,
            "host_identifier": "hostname",
            "schedule_default_interval": "3600"
        },
        packs : {},
        "node_invalid": false
    };

    const allQueries = async _ => { 

        for (let i = 0; i < enrollment.packs.length; i++) {
            let element = enrollment.packs[i];
            let queries = await getQueriesFromPack(element);
            config.packs[element] = queries;
        }        
    }

    await allQueries();
    return config;
}

async function getQueriesFromPack(element) {

    let queries = {queries : {}};
    const pack = await Pack.findOne({_id: element});
    pack.queries.forEach( query => {
        queries.queries[query._id] = {"query": query.query, "interval": query.interval, "description": query.description};
    });    
    return queries;
}

router.route('/distributed/read').post((req, res) => {
    res.json({node_invalid: false});
})

router.route('/distributed/write').post((req, res) => {
    res.json({node_invalid: false});
})

module.exports = router;