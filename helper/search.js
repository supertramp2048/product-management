module.exports = (query,find) => {
    let objectSearch = {
        keySearch: ""
    }
    if(query.keySearch){
        objectSearch.keySearch = query.keySearch
        const regex = new RegExp(objectSearch.keySearch, "i")
        objectSearch.regex = regex
    }
    return objectSearch
}

