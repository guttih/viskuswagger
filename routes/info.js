var express = require('express');
var router = express.Router();
const lib = require('../helpers/lib.js');
const ApplicationInformation = require('../models/ApplicationInformation');

// Routes
/**
 * @swagger
 * 
 * /info:
 *  get:
 *    description: Provides information about this service
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get("/", (req, res) => {
    
    var appPackage = lib.getPackage();
    let info = new ApplicationInformation(  appPackage.name, 
                                            appPackage.version, 
                                            appPackage.description);
    
    res.status(200).json( info );

});

module.exports = router;
