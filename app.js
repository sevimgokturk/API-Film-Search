let key ="6c8df01f"
    const input = document.querySelector("#input");
    const button = document.querySelector("#button");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");

    let value="";
    let pagenr=1;
    //asigne the input value
    input.addEventListener("input", (e)=>{
    e.preventDefault();
    value=input.value; 
    });

    //we add event listener to make active the getmovie function
    input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("button").click();
        }
    });

    //ane also we can make active the getmovie function withe button
    button.addEventListener("click",()=>{    
        pagenr=1;
        getmovie(value,pagenr);
        
    });

    //we use asencronic function  because it is necesserie to wait fetch data. 
    //if the connection is slow it is waiting the data
    async function getmovie(value,p){
        if(value==="") return;

        //await is here 
        //we use omdb API and we took api keys for connection
        const data =await fetch(
        'http://www.omdbapi.com/?apikey='+key+'&s='+value+'&page='+pagenr  
        );

        //first clean the inner html
        document.querySelector(".display").innerHTML ="";

        // convert the result to json also we add await
        const result = await data.json();
        

        //in the response there is a Search data, under the search we can acces the info like year, imdb post, title
        //with  this loop we create the posters and the descriptions for each item of the result 
        result.Search. forEach( (item) => {
            let moviediv = document.createElement ("div") ;
            moviediv.classList.add("movie");
            let poster = document.createElement("div");
            poster.classList.add ("poster") ;
            let img = document.createElement("img") ;

        //inside the fetch data if ther is no Ppster (image, not available:N/A) use this photo
            img.src=
            item. Poster === "N/A" ? (img.src = "./pictures/42862.jpg") :item.Poster;
            poster.appendChild(img);
            moviediv.appendChild(poster);
            let description = document.createElement("div");
            description.classList.add ("description") ;
            description.innerHTML= "Title :"+item.Title +"<br><br>"+"Year :" +item.Year+"<br><br>" + "<a target='_blank' href=https://www.imdb.com/title/"+item.imdbID+" >IMDB:"+ "https://www.imdb.com/title/"+item.imdbID+"</a> "
            
            moviediv.appendChild(description);
            document.querySelector(".display").appendChild(moviediv);});

            //we are making visible the net and previus buttons
            //We gave opacity 0 for next and prev buttons in css by default,  as we don't want to see these buttons in the first "blank page"
            //when we receive the results after the first search then next and prev button will be visible.
            next.classList.add("visible");
            prev.classList.add("visible");
    }

    //to pass the next page
    next.addEventListener("click",()=>{
        if(value==="")return;  // if ther is no value finish the function
        pagenr++; //we are incrising the page number and calling the getmovie wihe new parematers
        getmovie(value,pagenr)
    });

    //to pass the previus page
    prev.addEventListener("click",()=>{
        if(value==="")return; // if ther is no value finish the function
        if(pagenr===1)return; // if the page number is 1, also finish the function
        pagenr--; //we are ddecreasing the page number and calling the getmovie with new parematers
        getmovie(value,pagenr)
    });

  //last commit