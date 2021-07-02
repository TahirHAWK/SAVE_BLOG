
document.addEventListener("click", function(anyName){
    // Delete Feature
    if(anyName.target.classList.contains("delete")){
        if(confirm("Do you really want to delete this item?")){
             axios.post('/delete-blog', {id: anyName.target.getAttribute("data-id")}).then(function(){
                // reload page after editing data
                window.location.reload();
                
                
            }).catch(function(){
                alert("please try again later.")
            })
        } 
    }
                // update Feature
    if(anyName.target.classList.contains("edit")){
    
let userInput1 = prompt("Enter your corrected heading:", "Your Blog heading"
)
let userInput2 = prompt("Enter your corrected blog text:", "Your blog text"
)

if(userInput1 && userInput2){
    axios.post('/edit-blog', {heading: userInput1, blog_body: userInput2, id: anyName.target.getAttribute("data-id")}).then(function(){
        // reload page after editing data
        window.location.reload();
        
        
    }).catch(function(){
        alert("please try again later.")
    })
}

} 
}) 