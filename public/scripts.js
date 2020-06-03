const e = require("express")


function hider(){
    document
    .querySelector("#form")
    .classList.toggle("hide")
    document
    .querySelector("body")
    .classList.toggle("hideOF")
    document
    .querySelector("#form")
    .classList.toggle("addScroll")

}

function checkFields(event){
    const valuesToCheck = [
    "imageurl",
    "title",
    "category",
    "description",
    "linkideia"  
    ]

    const isEmpty = valuesToCheck.find(function(value){
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if(checkIfIsString && checkIfIsEmpty){
            return true
        }
    })

    if(isEmpty){
        event.preventDefault()
        alert("Por Favor Preencha TODOS os Campos!")
    }
}

function sendDelete(event){
    let url = `/?idIdea=`
    let id = event.target.idIdea.value

    let trueUrl = url+id;
    return fetch(trueUrl, {
        method: 'delete'
    })
    .then(res => res.json());
}