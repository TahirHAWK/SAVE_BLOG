const {axios, express, app, nodemailer, mongodb, ObjectId, connectionString} = require('./dependencies')
app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('../public'))
// dependencies that are needed to run the codes below

let indexFile = function(req, res){
    res.send(`<html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="index.css">

      <title>SAVE HSTU</title>
    </head>
    <body>
    <header id="header">
    <nav id="nav-bar">
    <li><a href="/index"><img id="header-img" src="https://scontent.fdac12-1.fna.fbcdn.net/v/t1.6435-9/121596169_132300508620920_9118668398298529590_n.png?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=6vhFEV8-APgAX84vwQy&tn=Uf6FDVnbHUU-zVXl&_nc_ht=scontent.fdac12-1.fna&oh=0429cdcf44b30e04d3c4c59228f8eaff&oe=60DB4149" alt="save logo" class="logo"></a></li>
    <li><a class="nav-link" href="/">Home</a></li>
    <li><a class="nav-link" href="/blog">Our Activities</a></li> 
    <li><a class="nav-link" href="/contact">Contact</a></li>
      
    </nav>
  </header>
      <div class="allExceptHeader">
        <div class="homeText" id="home">
         <li><h2>Welcome to</h2> </li>
         <li><h3>SAVE Youth</li>
         <li><h3>HSTU Chapter</h3> </li>
         <li><a class="nav-link" href="/blog"><button class="learnMore">Learn More</button></a><a class="nav-link" href="/contact"><button class="contactUs">Contact Us</button></a></li> 
        </div>
        
        <h2 class="activities1" id="activities">Our Activities</h2>
        <div class="activities">
          
          <li><img src="https://media.istockphoto.com/vectors/human-palm-heart-inside-logo-design-vector-donate-symbol-illustration-vector-id1162212464?k=6&m=1162212464&s=612x612&w=0&h=9k1RV215eNdi5ebmVqIhsBU7dg31bnncJXBuMnPRST4=" alt="">Volunteering
            <p>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
          </li>
          <li><img src="https://image.flaticon.com/icons/png/512/2117/2117103.png" alt="">workshop
            <p>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
          </li>
          <li><img src="https://static.thenounproject.com/png/519274-200.png" alt="">Competitions
            <p>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
          </li>
        </div>
        
        
        <div class="identity">
          <h2>
          Who we are
          </h2>    
          <iframe id="video" src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Faynulbd%2Fvideos%2F10158649550907497%2F&show_text=false&width=560&t=0"   scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
          
        </div>  
         
            
          
        
         
        
        <div id="contact" class="contact">
          <li><form id="form" action="/contact-email" method="POST">
            <h2>Contact us</h2>
            <input name="email" type="email" placeholder="Email" id="email">
            <input name="feedback" type="textarea" placeholder="Your Comment">
            <input type="submit" id="submit">
            </form>
          </li> 
          <li>
            <a href="facebook.com/savehstuchapter">Our facebook page</a>
            <a href="mailto:save.hstu@gmail.com">Our Email</a>
          </li>
        </div>
        
        
        <footer>
             <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#identity">Team</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </footer>
        
      </div>
      <script src='https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js'></script>
    </body>
    </html>
    <!-- partial -->
      
    </body>
    </html>`)
}

module.exports = {indexFile}