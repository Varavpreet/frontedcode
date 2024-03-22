$(document).ready(function() {
  var card = JSON.parse(window.localStorage.getItem("data"));
  $('[name="name"]').val(card.name);
  $('[name="description"]').val(card.description);
  $('[name="level"]').val(card.level);
  $('[name="point"]').val(card.point);
  $('[name="imageURL"]').val(card.imageURL);

  $('button').click(function(event) {
      event.preventDefault();

      var updateCard = {};
      updateCard.name = $('[name="name"]').val();
      updateCard.description = $('[name="description"]').val();
      updateCard.level = $('[name="level"]').val();
      updateCard.point = $('[name="point"]').val();
      updateCard.imageURL = $('[name="imageURL"]').val();

      $.ajax({
          url: 'http://localhost:7000/card/' + card.id,
          type: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(updateCard),
          success: function(json) {
              console.log(json);
              window.location.pathname = "card.html";
          }
      });
  });
});
