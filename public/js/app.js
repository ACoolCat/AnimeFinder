console.log("We are connected to js");

$(() => {

  /////////////////////////////////////////////////////
  ///////////SUBMIT FORM
  //////////////////////////////////////////////////
  $('form').on('submit', (event) => {
    event.preventDefault();

    const userInput = $('input[type="text"]').val()
    let pageNum = 0

    ///////////////////////////////////////////////////
    //////////API
    //////////////////////////////////////////////////
    $.ajax({
      url: 'https://kitsu.io/api/edge/anime?page[offset]=' + pageNum + '&filter[categories]='+ userInput
    })
    .then(
      (data) => {
        ///////////////////////////////////////
        //////////CLEAR HTML
        //////////////////////////////////////
        $('.display').empty()
        console.log(data);
        ////////////////////////////////////////
        //////LOOP THROUGH SHOWS
        //////////////////////////////////////
        var i;
        for  (i = 0; i <= 10; i++) {
          /////////////////////////////////////////
          ///////////PRINT SHOWS
          /////////////////////////////////////////
          console.log(data.data[i].attributes.canonicalTitle);
          const $title = $('<div>')
          $title.append(data.data[i].attributes.canonicalTitle)
          $('.display').append($title)
          console.log(data.data[i].attributes.posterImage.small);
          const $info = $('<div>')
          $info.addClass('info')
          $info.append("Title: " + data.data[i].attributes.canonicalTitle)
          $info.append('<br>')
          $info.append("Rating: " + data.data[i].attributes.ageRating)
          $info.append('<br>')
          $info.append("Plot synopsis: " + data.data[i].attributes.synopsis)
          $info.hide()
          $info.on('click', (event) => {
            $(event.currentTarget).toggle();
          })
          $('.display').append($info)
          const $image = $('<div>').append('<img src= "' + data.data[i].attributes.posterImage.small + '">')
          $('.display').append($image)
          $image.on('click', (event) => {
            $(event.currentTarget).prev().toggle()
          })
        }

      },
      (error) => {
        console.log("anime api error hit");
      }
    )

  })
} )

const app = angular.module("AnimeController", [
  "$http",

  function($http) {
    this.createUser = {};
    this.users = [];
    this.user = {};

    this.showLoginForm = false;
    this.showSignupForm = false;

    this.loggedInUser = false;

    //CREATE USER
    this.createUser = () => {
      $http({
        method: "POST",
        url: "/users",
        data: this.createForm,
      }).then(
        (response) => {
          this.createForm = {},
          this.users.unshift(response.data);
          this.loggedInUser = response.data;
          this.showSignupForm = false;
        },
        (error) => {
          console.log(error);
        }
      );
    };

    //LOG IN

    this.login = () => {
      console.log("I was hit");
      $http({
        url: "/session",
        method: "POST",
        data: {
          username: this.loginUsername,
          password: this.loginPassword,
        },
      }).then((response) => {
        if (response.data.username) {
          this.loggedInUser = response.data;
          this.showLoginForm = false;
        } else {
          this.loginUsername = null;
          this.loginPassword = null;
        }
      });
    };

    
  }
])
