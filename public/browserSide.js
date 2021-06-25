

document.addEventListener("click", function(anyName){
if(anyName.target.classList.contains("edit")){
let userInput1 = prompt("Enter your corrected heading:", anyName.target.parentElement.querySelector(".heading").innerHTML
)
let userInput2 = prompt("Enter your corrected blog text:", anyName.target.parentElement.querySelector(".blog_body").innerHTML
)

if(userInput1 && userInput2){
    axios.post('/edit-blog', {heading: userInput1, blog_body: userInput2, id: anyName.target.getAttribute("data-id")}).then(function(){
        anyName.target.parentElement.parentElement.querySelector(".heading").innerHTML = userInput1
        anyName.target.parentElement.parentElement.querySelector(".blog_body").innerHTML = userInput2
        
    }).catch(function(){
        alert("please try again later.")
    })
}

} 
}) 