const { NotFoundError } = require("../errorHandler/customErrorHandlers");

const dataExist = async (model, where, include,attributes) => {
    const item = await model.findOne({ where: where, inlude: include,attributes:attributes });
    return item;
};

const customInsert = async (model, data, transaction) => {
    return await model.create(data, transaction)
}

const customFindAll = async (model, where, include, page, page_size, attributes) => {
    page = page ? ((page - 1) * page_size) : null
    page_size = page_size ? (page_size) : null

    const item = await model.findAndCountAll({ where: where, attributes: attributes, include: include, offset: page, limit: page_size });
    if (!item) throw new NotFoundError("Record not found");
    return item;
};

const customUpdate = async (model, where, updateItem, transaction) => {
    const updatedItem = await model.findOne({where:where});
    if (!updatedItem) throw new NotFoundError("Record not found");
    // Found an item, update it
    await model.update(updateItem, {where:where}, transaction);
    return await model.findOne({where:where});

};

module.exports = {
    dataExist,
    customInsert,
    customFindAll,
    customUpdate
}