let count =1
function createTree (arr,parent_id="") {
    var tree =[]
            arr.forEach(item => {
            if(item.parent_id == parent_id){
                const newItem = item
                newItem.index = count++
                const childrent = createTree(arr,item._id)
                if(childrent.length){
                    newItem.childrent = childrent
                }
                tree.push(newItem)
            }
            })
            return tree
}
module.exports.tree = (arr,parent_id="") => {
    count = 1;
    let tree = createTree(arr,parent_id="");
    return tree;
}