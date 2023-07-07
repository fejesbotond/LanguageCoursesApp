function getModel(objectRepository, nameModel){
    if (objectRepository && objectRepository[nameModel]) {
        return objectRepository[nameModel];
    }
    throw new TypeError(`${nameModel} required`);

}

module.exports = getModel;