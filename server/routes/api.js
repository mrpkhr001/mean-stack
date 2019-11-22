const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const uuid = require('uuid-random');

const TOKEN = require('./verify-token');
const SECRET_TOKEN = require('./secret-token');
const password = require('./password');
const EnrollNode = require('../models/enroll-node');
const Pack = require('../models/pack');
const EnrollCompany = require('../models/enroll-company');
const RegisterUser = require('../models/register-user');
const UserSecret = require('../models/user-secret');

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://opstinuum:opstinuum@localhost:27017/opstinuum?retryWrites=true&w=majority";

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


router.get('/', TOKEN.verifyToken, (req, res ) => {
    
    EnrollNode.find({}).exec(function(err, enrollments) {

        if (err) {
            console.log('Error retrieving enrollments');
            res.send(err.message);
        } else {
            res.json(enrollments);
        }
    })
    
})

router.get('/getUserRole', TOKEN.verifyToken, (req, res) => {
    return res.status(200).json({role: req.role});
})

router.get('/getUserId', TOKEN.verifyToken, (req, res) => {
    return res.status(200).json({userId: req.userId});
})

router.post('/validateToken', TOKEN.verifyToken, (req, res) => {

    //find user id
    userId = req.userId

    UserSecret.findOne({_id: userId}, function (error, storedSecret) {
        if (error) {
            console.log(error);
            res.status(500).json(error);
        } else {
            if (typeof storedSecret === 'undefined' || !storedSecret) {
                return res.status(500).json({error: "Token not found in database"});
            } else {
                isTokenValid = SECRET_TOKEN.verifySecretToken(storedSecret.secret, req.body.token);
                return res.status(200).json({isValid: isTokenValid});                
            }
        }
    })
})

router.get('/getUserSecret', TOKEN.verifyToken, (req, res) => {

    //find user id
    userId = req.userId

    UserSecret.findOne({_id: userId}, function (error, storedSecret) {
        if (error) {
            console.log(error);
            res.status(500).json(error);
        } else {
            if (typeof storedSecret === 'undefined' || !storedSecret) {
                //generate secret
                userSecret = SECRET_TOKEN.generateSecret();
                newUserSecret = new UserSecret();
                newUserSecret._id = userId
                newUserSecret.secret = userSecret
                
                newUserSecret.save(function(err, inserted) {

                    if (err) {
                        console.log('Unable to save the secret');
                        console.log(err);
                    } else {
                        return res.status(200).json({secret: userSecret});
                    }
                });
                
            } else {
                return res.status(200).json({secret: storedSecret.secret});
            }
        }
    })
})

router.get('/enroll/:id', TOKEN.verifyToken, (req, res) => {

    EnrollNode.findOne({_id: req.params.id}, function (error, enrollment) {
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            res.json(enrollment);
        }
    })
})

router.post('/pack', TOKEN.verifyToken, (req, res) => {
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

router.post('/enroll-company', TOKEN.verifyToken, (req, res) => {
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

router.put('/enroll-company', TOKEN.verifyToken, (req, res) => {

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

router.get('/enroll-company', TOKEN.verifyToken, (req, res) => {

    EnrollCompany.find({}).exec(function(err, enrolledCompanies) {

        if (err) {
            console.log('Error retrieving enrolledCompanies');
            res.send(err.message);
        } else {
            res.json(enrolledCompanies);
        }
    });
})

router.get('/enroll-company/:id', TOKEN.verifyToken, (req, res) => {
    
    EnrollCompany.findOne({_id: req.params.id}, function(err, enrolledCompany) {

        if (err) {
            console.log('Error retrieving Enrolled Company');
            res.send(err.message);
        } else {
            res.json(enrolledCompany);
        }
    });
})

router.get('/pack', TOKEN.verifyToken, (req, res) => {
    
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

    //check if enrollment secret is correct
    RegisterUser.findOne({_id: loginUser._id}, function(error, registeredUser) {

        if (error) {
            console.log('Error finding the registeredUser');
            res.status(500).json(error);
        } else {
            if (typeof registeredUser === 'undefined' 
                || !registeredUser 
                || !password.passwordMatched(req.body.password, registeredUser.password)) {

                res.status(401).json({message : "incorrect UserName or Password"});

            } else {
                let payload = {subject: registeredUser._id, role: registeredUser.role, enrollmentSecret: registeredUser.enrollmentSecret};
                let token = jwt.sign (payload, TOKEN.SECRET_KEY);
                res.status(200).json({token});
            }
        }
    });
})

router.route('/register').post((req, res) => {

    var registerUser = new RegisterUser();
    registerUser._id = req.body._id;
    registerUser.name = req.body.name;

    var salt = password.genRandomString();
    registerUser.password = password.sha512(req.body.password, salt);
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
                    res.status(200).send("Successfully registered the user");
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
            "host_identifier": "hostname"
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
