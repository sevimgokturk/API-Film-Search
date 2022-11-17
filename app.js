let key ="6c8df01f"
    const input = document.querySelector("#input");
    const button = document.querySelector("#button");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");

    let value="";
    let pagenr=1;
    input.addEventListener("input", (e)=>{
    e.preventDefault();
    value=input.value; 
    });
    button.addEventListener("click",()=>{    
        pagenr=1;
        getmovie(value,pagenr);
        document.getElementById("body").style.backgroundImage = "none";
    });
    async function getmovie(value,p){
        if(value==="") return;
        const data =await fetch(
        'http://www.omdbapi.com/?apikey='+key+'&s='+value+'&page='+pagenr  
        );
        //first clean the inner html
        document.querySelector(".display").innerHTML ="";
        // convert the result to json
        const result = await data.json();
        console.log(result);
        //in the response there is a Search data, under the search we can acces the info like year, imdb post, title
        result.Search. forEach( (item) => {
            let moviediv = document.createElement ("div") ;
            moviediv.classList.add("movie");
            let poster = document.createElement("div");
            poster.classList.add ("poster") ;
            let img = document.createElement("img") ;
        // if inside the fetch data ther is no Ppster (image, not available:N/A) use this photo
            img.src=
            item. Poster === "N/A" ? (img.src = "./img/42862.jpg") :item.Poster;
            poster.appendChild(img);
            moviediv.appendChild(poster);
            let description = document.createElement("div");
            description.classList.add ("description") ;
            description.innerHTML= "Title :"+item.Title +"<br><br>"+"Year :" +item.Year+"<br><br>" + "<a href=https://www.imdb.com/title/"+item.imdbID+">IMDB:"+ "https://www.imdb.com/title/"+item.imdbID+"</a> "
            moviediv.appendChild(description);
            document.querySelector(".display").appendChild(moviediv);});
            next.classList.add("visible");
            prev.classList.add("visible");
    }
    //to pass the next page
    //some notes???
    next.addEventListener("click",()=>{
        if(value==="")return;
        pagenr++;
        getmovie(value,pagenr)
    });
    prev.addEventListener("click",()=>{
        if(value==="")return;
        if(pagenr===1)return;
        pagenr--;
        getmovie(value,pagenr)
    });

  