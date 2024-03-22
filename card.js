$(document).ready(function() {
  const cardContainer = $('#card');
  
  // Fetch the data and append to DOM
  $.get('http://localhost:7000/card')
    .done(function(data) {
      appendData(data);
    });

  function appendData(cardData) {
    cardContainer.empty();
    $.each(cardData, function(index, card) {
      const cardDiv = $('<div>').attr('id', 'id_' + card.id);
      const cardName = $('<h3>').html(card.name);
      cardDiv.append(cardName);

      // Detail button
      const detailBtn = $('<button>')
        .html('Detail')
        .attr('id', 'detail_' + card.id)
        .click(function() {
          const toggleBtn = $(this).data('toggleBtn');
          if (toggleBtn === true || toggleBtn === undefined) {
            // Show detail
            const detailEle = $('<div>').html(`
              <h4>Description: ${card.description}<h4>
              <h4>Level: ${card.level}<h4>
              <h4>Point: ${card.point}<h4>
              <img src=${card.imageURL} width=100px>
            `);
            cardName.after(detailEle);
            $(this).data('toggleBtn', false);
          } else {
            $('#id_' + card.id).find('div').remove();
            $(this).data('toggleBtn', true);
          }
        });
      cardDiv.append(detailBtn);

      // Edit button
      const editBtn = $('<button>')
        .html('Edit')
        .attr('id', 'edit_' + card.id)
        .click(function() {
          window.localStorage.setItem('data', JSON.stringify(card));
          window.location.href = 'edit.html';
        });
      cardDiv.append(editBtn);

      // Delete button
      const deleteBtn = $('<button>')
        .html('Delete')
        .attr('id', 'delete_' + card.id)
        .click(function() {
          deleteCard(card.id);
        });
      cardDiv.append(deleteBtn);

      cardContainer.append(cardDiv);
    });
  }

  function deleteCard(id) {
    $.ajax({
      url: 'http://localhost:7000/card/' + id,
      type: 'DELETE',
      success: function(data) {
        appendData(data);
      }
    });
  }

  $('#add').click(function() {
    window.location.href = 'add.html';
  });
});