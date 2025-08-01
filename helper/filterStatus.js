module.exports = (query) => {
     const btnClicked = [
        {
            name: "all",
            status: "",
            class: ""
        },
        {
            name: "active",
            status: "active",
            class: ""
        },
        {
            name: "inactive",
            status: "inactive",
            class: ""
        },
    ]
    if (query.status) {
        let index = btnClicked.findIndex(item => item.status == query.status)
        btnClicked[index].class = "active"
    }
    else {
        let index = btnClicked.findIndex(item => item.status == "")
        btnClicked[index].class = "active"
    }

    return btnClicked
}