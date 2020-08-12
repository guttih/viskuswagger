const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const lib = require('./helpers/lib.js');
var bodyParser = require('body-parser');


const port = process.env.PORT || 5000;

const ServiceList = require('./models/ServiceList.js');

let serviceList = new ServiceList();
console.log(serviceList.list())

;

var appPackage = lib.getPackage();
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  
  swaggerDefinition: {
    components: {},
    info: {
      version:     appPackage.version,
      title:       appPackage.name,
      description: appPackage.description,
      contact: {
        name: "Guðjón Hólm Sigurðsson",
        email:"gudjons@advania.is"
      },
      servers: ["http://localhost:5000"]
    }
  },
  // ['.routes/*.js']
  apis: ["./models/*", "app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/*
app.get("/", (req, res) => {
    res.redirect("/api-docs")
  });
*/

// Routes
/**
 * @swagger
 * 
 * /services:
 *  get:
 *    description: Use to request all services
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/services", (req, res) => {
    
    res.status(200).send(
    {
        data: serviceList.list()
    });

});

/**
 * @swagger
 * 
 *paths:
 *  /services/{serviceId}:
 *    get:
 *      summary: Use to request all services
 *      parameters:
 *        - in: path
 *          name: serviceId
 *          schema:
 *            type: string
 *          required: true 
 *      responses:
 *        200:
 *          description: A successful response
 */
app.get("/services/:id", (req, res) => {
  var ret;
  if (req.params.id === undefined) {
      ret = null;
  } else {
      ret = serviceList.get(req.params.id);
  }

  if (!ret) {
      res.status(404).send(lib.errorResponse(404));
  } else {
      res.status(200).send(lib.successResponse(ret) );
  }
});


/**
 * @swagger
 * paths:
 *   /services:
 *     put:
 *       summary: Update an existing service
 *       parameters:
 *         - in: body
 *           name: user
 *           schema:
 *             $ref: '#/definitions/ServiceListObject'
 *           required: true
 *       responses:
 *         204:
 *           description: 'No content'
 *         400:
 *           description: Bad request
 *           schema:
 *             $ref: '#/definitions/Errors'
 *           examples:
 *             application/json: {"error" : { "code": 400, "message": "Required parameter missing"},
 *                                "errors": [{"code": 40002, "message": "Title missing"}] }
 *         404:
 *           description: Not found
 *           schema:
 *             $ref: '#/definitions/Error'
 *         500:
 *           description: Server error
 *           schema:
 *             $ref: '#/definitions/Error'
 *           examples:
 *             application/json: {"error" : { "code": 500, "message": "Server error"},
 *                                "errors": [{"code": 44, "message": "configuration file not found"}] }
 */

app.put("/services", bodyParser.json(), (req, res) => {

    var ret;
    var missingProps = lib.getMissingBodyProperty(req.body, serviceList.listItemProperties())
    if (missingProps.length > 0) {
        //there are missing fields
        ret = lib.errorResponseExtended(400, "Required field missing");
        missingProps.forEach(field => {
          ret.errors.push({code: lib.applicationMissingFieldErrorCodes(field), message: `${field} is missing`});
        });

        return res.status(ret.error.code).send(ret);
    }
    
    // no missing fields let's set the new values
    ret = serviceList.set(req.body.id, req.body.title, req.body.description, req.body.owner);

    if (ret === null) {
      return res.status(404).send(lib.errorResponse(404));  
    }
    //success, return no content
    return res.status(204).json({});    
    
   
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

