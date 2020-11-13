const axios = require("axios");
const express = require('express');
const app = express();

function play(args){
    var uri = "https://www.googleapis.com/youtube/v3/search?key="
    var type = "video&part=snippet&maxResults=1&q=" + args.join("%20");
    var key = "AIzaSyBZ2hmqEUON-QLX-kZcpzdTy4trDMJROOQ";
    var final = uri+key+"&type="+type;


     axios.get(final).then(response =>{
         for (var i in response.data.items){

            var item = response.data.items[i];
            return item.id.videoId;
         }
     })
     .catch(error => {
         console.log(error);
     });

}

