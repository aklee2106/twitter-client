$( document ).ready(function() {
  var pageNumber = 1;
  getButtons();
  getTweets(1);
});

$(window).scroll(function(){
  if (document.body.scrollTop > document.body.scrollHeight * 0.85){
    if (pageNumber <= 7){
      pageNumber++; 
      if (!$('body').hasClass("processing")){
        console.log("getting tweets");
        $("body").addClass("processing");
        getTweets(pageNumber);
      //   console.log("Page Number:" + pageNumber);
      }
    }  
  }
  // else{
  //   return;
  // }
});

function getButtons(){
  $("#top").append(JST["templates/buttons"]);
}

function getTweets(pageNumber){
  $.ajax({
    url: "/api/retrieveTweets/abcd",
    type: "GET",
    data: {
      page: pageNumber
    },
    success: function(response) {
      addTweets(response);
    }
  })
}

function addTweets(response){
    for (var i =0; i<response.statuses.length; i++) {
      $(".list").append(JST["templates/tweet"]({status: response.statuses[i] }));
      addTopThree(response.statuses[i].user);
      addPlace(response.statuses[i].user);

       // var item = $("<li>");
      // $(".list").append(item);
      // item.append("<div class='screen-name'>"+response.statuses[i].user.screen_name + "</div>");
      // item.append("Followers : <div class='followers'>"+response.statuses[i].user.followers_count + "</div>");
      // item.append("<img src ='"+response.statuses[i].user.profile_image_url+"'></img>");
      // item.append("<div class='tweet'>" +response.statuses[i].text+"</div>");
      // item.append("Retweets: <div class='retweets'>"+response.statuses[i].retweet_count+"</div>");
      // item.append("Location: <div class='location'>"+response.statuses[i].user.location+"</div>");
      // item.append("<div class='date'>"+ new Date (response.statuses[i].created_at).toDateString()+"</div>");
    }
    people.sort(function(a,b){return b.followers-a.followers});
    $("#topPeople").empty();
    $("#topPeople").append(JST['templates/top3people']);

    places.sort(function(a,b){return b.count-a.count});
    $("#topLocations").append(JST['templates/top3locations']);

    sortData();
    $("body").removeClass("processing");
}


function person(x){
  this.user_name=x.screen_name;
  this.followers=x.followers_count;
}

var people =[];

function addTopThree(user){
  var newPerson = new person(user);
  people.push(newPerson);
}

function place(user){
  this.place=user.location;
  this.count=0;
}

var places =[];

function addPlace(user){
  var newPlace = new place(user);
  if (places.length==0){
    places.push(newPlace);
    return;
  }
  for (var i=0; i<places.length; i++){
    var seen=false; 
    if (newPlace.place == places[i].place){
      places[i].count++;
      seen = true;
    } 
    debugger;    
  }  
  if(!seen){
    places.push(newPlace);
  } 
}


function sortData(){
  var sortOptions = {
    valueNames: [ 'date', 'retweets', 'location', 'followers' ] 
  };
  var userList = new List('container', sortOptions);
}

function postTweet() {
  $.ajax({
    type: "post",
    url:"/api/posttweet",
    data: {
      username: "first last",
      message: "hello"
    },
    success: function(){
      debugger;
    }
  })
}


