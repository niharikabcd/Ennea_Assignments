function promise()
{ 
    var user = document.querySelector("#In")
    if(!user.value)
    {
        throw new Error(alert("Id cannot be empty,enter a valid number between 1-200"))
    }
    if(isNaN(user.value)){
        throw new Error(alert("enter only a number between 1-200"))
    }
    if(user.value>200 || user.value<1){
        throw new Error(alert("the given number is out of range,enter a number only between 1-200"))
    }
    console.log(user.value)
    var k=Number(user.value)
    url=`https://jsonplaceholder.typicode.com/todos/${k}`
    let data=fetch(url)
      .then(response => response.json())
      .then((json) => {
        console.log(json)
        var p1 = document.getElementById("p1")
        p1.innerHTML= 'The title is : ' + json.title
        var p2 = document.getElementById("p2")
        p2.innerHTML= 'The UserId is : ' + json.userId
        var p3 = document.getElementById("p3")
        p3.innerHTML= 'The ID is : ' + json.id

})
    data.catch((err) => {
        
        var p = document.getElementById("p1")
        p.innerHTML = `Could not get data,check your internet connection`
    })
}
