/**
 * @swagger
 * definitions:
 *   ServiceListObject:
 *     type: object
 *     required:
 *       - id
 *       - title    
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *       title:
 *         type: string
 *         example: awesome_service
 *       description:
 *         type: string
 *         example: 'Query and submit methods on, how to better the world.'
 *       owner:
 *         type: string
 *     example:
 *       id: 4
 *       title: asdf
 *       description: asdfdd
 *       owner: dfddddd
 *
 *   ServiceListObjectResponse:
 *     type: object
 *     properties:
 *       data: 
 *         $ref: '#/definitions/ServiceListObject' 
 *   Error:
 *     type: object
 *     properties:
 *       error: 
 *         $ref: '#/definitions/ErrorCode'
 * 
 *   Errors:
 *     type: object
 *     properties:
 *       error:
 *         type: object
 *         $ref: '#/definitions/ErrorCode'
 *       errors:
 *         type: array
 *         items:
 *           $ref: '#/definitions/ErrorCode'
 * 
 *   ErrorCode:
 *     type: object
 *     required:
 *       - code
 *       - message
 *     properties:
 *       code:
 *         type: integer
 *         format: int32
 *         example: 404
 *       message:
 *         type: string
 *         example: not found
 */
class ServiceListObject {
    
    constructor (id, title, description, owner) {
        this.id = id;
        this.set(title, description, owner);
    }
    set(title, description, owner) {
        this.title = title;
        this.description = description;
        this.owner = owner;
    }
    getPropertyList(skipId) {
        
        var index, ret = Object.getOwnPropertyNames(this);
        if (skipId === true){
            if (ret.indexOf) {
                index = ret.indexOf("id");
              }
              else {
                for (index = ret.length - 1; index >= 0; --index) {
                  if (ret[index] === "id") {
                    break;
                  }
                }
              }
            ret.splice(index, 1);
        }
        
        return ret;
    }
};

module.exports = ServiceListObject;