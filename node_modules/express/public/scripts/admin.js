function getUsers(){
        console.log('fetching users');
        $.ajax
            ({
               type: "get",
               url: "/admin/getUsers",
               contentType: "application/json; charset=UTF-8",

            }).done(function ( users ) {
                  var userInfoSpace=document.getElementById("adminBody");
                  var userInfo="";
                  //var tweetTag=`<div><h3>Number of likes: ${tweetData.likes}</h3><br><h3>Number of retweets: ${tweetData.retweets}</h3></div>`;
                 users.forEach(function(user){
                   userInfo += `<p>username: ${user.username}<br>firstname: ${user.firstName}<br>lastname: ${user.lastName}<br>email: ${user.email}<br>gender: ${user.gender}<br>account type: ${user.accType}<br><hr></p>`;
                });
                  userInfoSpace.innerHTML = userInfo;
                  console.log('Users Fetched');
            });
}

function getTweets(){
                  console.log('fetching tweets');
                  $.ajax
                      ({
                         type: "get",
                         url: "/admin/getTweets",
                         contentType: "application/json; charset=UTF-8",

                      }).done(function ( tweets ) {
                            var tweetInfoSpace=document.getElementById("adminBody");
                            var tweetInfo="";
                            //var tweetTag=`<div><h3>Number of likes: ${tweetData.likes}</h3><br><h3>Number of retweets: ${tweetData.retweets}</h3></div>`;
                           tweets.forEach(function(tweet){
                             tweetInfo += `<p>Tweet ID: ${tweet.id}<br>Created At: ${tweet.created_at}<br>Contet: <a href="${tweet.content}" target="_blank">${tweet.content}</a> <br>Retweets: ${tweet.retweets}<br>Likes:  ${tweet.likes}<br><hr></p>`;
                            console.log("tizi");
                          });
                            tweetInfoSpace.innerHTML = tweetInfo;
                            console.log('Tweets Fetched');
                      });
}