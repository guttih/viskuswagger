const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const lib = require('./helpers/lib.js');
var bodyParser = require('body-parser');
var services = require('./routes/services')
var info     = require('./routes/info')


const port = process.env.PORT || 5000;



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
  apis: ["./models/*","./routes/*", "app.js"]
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.redirect('/swagger');
});

app.use('/info',     info);
app.use('/services', services);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

