console.log("We are connected to js");



$(() => {

  let pageNum = 0
  /////////////////////////////////////////////////////
  ///////////SUBMIT FORM
  //////////////////////////////////////////////////
  $('form').on('submit', (event) => {
    event.preventDefault();

    const $next = $('<div>')
    console.log("I was created");
    $next.addClass('next')
    $next.append("Next Page")
    $next.on('click', (event) => {
      pageNum = pageNum + 10;
      $('.display').empty();
      $('.scroll').empty();
    })
    $('.scroll').append($next)

    const userInput = $('input[type="text"]').val()

    ///////////////////////////////////////////////////
    //////////API
    //////////////////////////////////////////////////
    function finder() {
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
    }
    finder();
  })
} )
