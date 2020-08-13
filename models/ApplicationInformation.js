
// see: https://github.com/island-is/handbook/blob/feature/add-api-design-guide-structure/docs/api-design-guide/implementation/documentation.md#user-content-info-method
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
        this.upTime =       { value: 0 };
        this.responseTime = { value: 0 };
    }
};

module.exports = ApplicationInformation;