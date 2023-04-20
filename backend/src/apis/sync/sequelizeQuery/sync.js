

const customCreate = async (model, data, transaction) => {
    return await model.create(data, transaction)
}

const customUpdate = async(model,where,data)=>{
    return await model.update(data,{where:where})
}

const customDelete = async(model,where)=>{
    return await model.destroy({where:where})
}

module.exports = {
    customCreate,
    customUpdate,
    customDelete
}