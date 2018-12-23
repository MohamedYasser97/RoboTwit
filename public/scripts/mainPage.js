function createGraph(chartName,myData,dataIds){

    var backgroundclr=[];
    var borderclr=[];
    var entries=[];
    var title;

    myData = myData.reverse();

    myData.forEach(function(obj){
        //backgroundclr.push(`rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},0.2)`);
        //borderclr.push(`rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},1)`);

        backgroundclr.push(`rgba(0,0,0,0.2)`);
        borderclr.push(`rgba(0,0,0,1)`);
    });

    dataIds.forEach(function(obj){
        entries.push('');
    });

    entries = entries.reverse();
    
    if(chartName=='retweetChart')
      title='Retweets';
    else
      title='Likes';

    var ctx = document.getElementById(chartName);

    var chart = new Chart(ctx, {
    type: 'bar',
    data: {
    labels: entries,
    datasets: [{
     label: title,
     data: myData,
     backgroundColor: backgroundclr,
     borderColor: borderclr,
     borderWidth: 1
    }]
    },
    options: {
    scales: {
     yAxes: [{
         ticks: {
             beginAtZero:true
         }
     }]
    }
    }
  });
}

function updateTweetInfo(tweetId){

    console.log('updating graphs');

    $(document).ready($.ajax
        ({
           type: "get",
           url: "/mainPage/update", 
           data : `tweetId=${tweetId}`,
           contentType: "application/json; charset=UTF-8",
                
        }).done(function ( tweetData ) {
              
              var tweetInfoSpace=document.getElementById("tweetInfo");
              var tweetTag=`<div class="card-body"><div><h3>Number of likes: ${tweetData.likes}</h3><br><h3>Number of retweets: ${tweetData.retweets}</h3></div></div>`;

              tweetInfoSpace.innerHTML = tweetTag;

              var tweetSourceSpace = document.getElementById("sourceInfo");
              var sourceTag=`<div class="card-body"><div><h3>Source: ${tweetData.source}</h3></div></div>`;
              tweetSourceSpace.innerHTML = sourceTag;

              console.log('graphs updated');
        }));
}

function clearTweetInfos(){
  document.getElementById("tweetInfo").innerHTML='';
  document.getElementById("sourceInfo").innerHTML='';
}