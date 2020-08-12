const ServiceListObject = require('./ServiceListObject');
    
class ServiceList {
    
    constructor() {
        this.data = [];
        this.generateData();
    }
    generateData() {
        this.add("Service 0", "description 0 ", "owner 0");
        this.add("Service 1", "description 1 ", "owner 1");
        this.add("Service 2", "description 2 ", "owner 2");
        this.add("Service 3", "description 3 ", "owner 3");
        this.add("Service 4", "description 4 ", "owner 4");
    }
    list() { return this.data };
    makeId() {
        
        
        var id = 0;
        for(var i = 0; i < this.data.length; i++) {
            if (this.data[i].id >= id) {
                id = this.data[i].id + 1;
            }
        }
        return id;
    }
    add(title, description, owner) {
        this.data.push(new ServiceListObject(this.makeId(), title, description, owner));
    }

    /**
     * Overwrites values of a object
     *
     * @param {Number} id
     * @param {String} title
     * @param {String} description
     * @param {String} owner
     * @returns {ServiceListObject} If successful the changed object, on fail null
     * @memberof ServiceList
     * 
     */
    set(id, title, description, owner){
        var index = this.indexOf(id);
        if (index === -1 ) return null;
        this.data[index].set(title, description, owner);
    }

    remove(id) {
        var index = this.indexOf(id);
        if (index === -1 ) return null;
        this.data.splice(index, 1);
    }

    indexOf(id) {
        return this.data.findIndex(item => item.id === Number(id));
    }
     /**
     * Gets a object from the list
     *
     * @param {Number} id
     * @returns {ServiceListObject} If successful the object, on fail null
     * @memberof ServiceList
     * 
     */
    get(id) {
        var index = this.indexOf(id);
        if (index === -1 ) return null;
        return this.data[index];
    }

    listItemProperties(skipId) {
        var temp = new ServiceListObject(-1, "", "", "");
        return temp.getPropertyList(skipId);
    }
}

module.exports = ServiceList;