// API = AIzaSyDolRhAuSs-3GcB0TZQv1tmqZ_pFTr6Pzk
$(document).ready(function() {
  var searchField = $('#query');
  var icon = $('#search-button');

  $('.search-field').on('focus', function() {
    $(this).animate(
      {
        width: '100%'
      },
      200
    );
    $(icon).animate(
      {
        right: '10px'
      },
      200
    );
  });

  $('.search-field').on('blur', function() {
    if (!searchField.val()) {
      $(searchField).animate(
        {
          width: '45%'
        },
        200,
        function() {}
      );

      $(icon).animate(
        {
          right: '360px'
        },
        200,
        function() {}
      );
    }
  });
});
