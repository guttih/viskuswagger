// see: https://github.com/island-is/handbook/blob/feature/add-api-design-guide-structure/docs/api-design-guide/implementation/documentation.md#user-content-info-method


/**
 * @swagger
 * definitions:
 *   ApplicationInformation:
 *     type: object
 *     required:
 *       - title
 *       - version
 *       - description
 *       - type
 *       - data
 *       - price
 *       - links
 *       - upTime
 *       - responseTime
 *       - contact
 * 
 * 
 *     properties:
 *       version:
 *         description: to distinguish API versions following semantic versioning specification.
 *         type: string
 *         example: 1.0.2
 *       title:
 *         description: (unique) identifying, functional descriptive name of the API.
 *         type: string
 *         example: Awesome service
 *       description:
 *         description: containing a short but proper description of the API.
 *         type: string
 *         example: Provides access to the awesome database allowing you to query and submit methods on, how to better the world.
 *       access:
 *         description: Who can have access to the service.  
 *         type: string
 *         enum:
 *           - open
 *           - islykill
 *           - trusted
 *           - trustedPriority
 *           - trustedEssential
 *         example: open
 *       type:
 *         description: What kind of a service is this?
 *         type: string
 *         enum:
 *           - rest
 *           - graphql
 *           - json-rpc
 *           - xml-rpc
 *           - soap
 *         example: graphql
 *       data:
 *         description:  What kind of data does this service work with?
 *         type: array
 *         items:
 *           type: string
 *           enum:
 *             - open
 *             - official
 *             - personal
 *             - health
 *             - financial
 *         example: 
 *           - personal
 *           - financial
 *       price:
 *         description:  Charging types available for this service.
 *         type: array
 *         items:
 *           type: string
 *           enum:
 *             - free
 *             - usage
 *             - daily
 *             - monthly
 *             - yearly
 *             - custom
 *         example: 
 *           - free
 *           - usage
 *           - custom
 *       links:
 *         type: object
 *         $ref: '#/definitions/ApplicationInformationLinks'
 *       upTime:
 *         type: object
 *         $ref: '#/definitions/ApplicationInformationUpTime'
 *       responseTime:
 *         description: a positive integer which contains information on what is the longest possible time in milliseconds a client consuming the service will have to wait for a response. If 0 is returned as a value, it means that the response time is undetermined.
 *         type: integer
 *         example: 200
 *       contact:
 *         type: object
 *         description: Quick information, who to contact when an issue about the service arises.
 *         properties:
 *           name:
 *             description: Name of the person.
 *             type: string
 *           email:
 *             description: fully qualified email.
 *             type: string
 *             format: email
 *           phone:
 *             description: a phone number starting with `+`, followed by the country code, a space and the phone number.
 *             type: string
 * 
 * 
 *   ApplicationInformationUpTime:
 *     type: object
 *     description: When can clients consuming the service expect the service to be available.
 *     required: 
 *       - value
 *     properties:
 *       value:
 *         description: A decimal number representing the up time promise this service makes. If 0 is returned as a value, it means that no up time promise is maid for this service. If no weekly object is provided, clients can assume that the percentage value applies to all days, all the time.
 *         type: number
 *         format: float
 *         example: 99.8
 *       weekly:
 *         type: object
 *         description: this is an OPTIONAL element which can be returned if the service up time promise will only be maid for specific days in the week (f.example workdays).
 *         properties:
 *           weekdays:
 *             description: Each number represents a weekday of week, where sunday is 0, monday is 1 and saturday is 6.
 *             type: array
 *             items:
 *               type: integer
 *               enum:
 *                 - 0
 *                 - 1
 *                 - 2
 *                 - 3
 *                 - 4
 *                 - 5
 *                 - 6
 *               example: 
 *                 - 0
 *                 - 3
 *                 - 6
 *             
 *           from:
 *             description: from what time during each day is the upTime promise made.
 *             type: string
 *             format: date-time
 *           to: 
 *             description: What time during each day will the service upTime promise stop.
 *             type: string
 
 *   ApplicationInformationLinks:
 *     type: object
 *     required:
 *       - documentation
 *       - responsibleParty
 *     properties:
 *       documentation:
 *         description: A fully qualified url to the API documentation page
 *         type: string
 *         example: https://moa.is/documentation/api-awesome/v1
 *       responsibleParty:
 *         description: A fully qualified url to a online page containing information about the responsible party/owner of the service.
 *         type: string
 *         example: https://api-awesome/responsible
 *       bugReport:
 *         description: A fully qualified url to a online page or form a consumer can report bugs about the service.
 *         type: string
 *         example: https://github.com/moa.is/api-awesome/issues/new?assignees=&labels=&template=bug_report.md
 *       featureRequest:
 *         description: A fully qualified url to a online page or form a consumer can ask for a new feature in api service.
 *         type: string
 *         example: https://github.com/moa.is/api-awesome/issues/new?assignees=&labels=&template=feature_request.md
 */
class ApplicationInformation {
    
    constructor(title, version, description) {
        this.reset(title, version, description);
    }

    reset(title, version, description) {

        this.title       = title       === undefined? '' : title;
        this.version     = version     === undefined? '' : version;
        this.description = description === undefined? '' : description;
        //open, islykill, trusted, trustedPriority, trustedEssential
        this.access = ['open'];
        // rest,graphql,json-rpc,xml-rpc,soap, or something else
        this.type = ['rest'];
        // open,official,personal,health,financial.
        this.data = ['open'];
        // free,usage,daly,monthly,yearly,custom.
        this.price = ['free'];
        this.links = {
            documentation : '',
            responsibleParty: '',
            bugReport: '',
            featureRequest: ''
        };
        this.contact = {
           name :  '',
           email :  '',
           phone :  '',
        };
        this.upTime = { value: 0 };
        this.responseTime = 0;
    }
};

module.exports = ApplicationInformation;