var counter = 0;
function changeBG(){
    var imgs = [
        "url(https://images.unsplash.com/photo-1460794418188-1bb7dba2720d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        "url(https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80)",
        "url(https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)"
      ]

    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}

  setInterval(changeBG, 2000);
