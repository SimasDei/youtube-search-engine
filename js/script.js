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

  $('#search-form').submit(function(e) {
    e.preventDefault();
  });
});

const API = {
  url: 'https://www.googleapis.com/youtube/v3/search',
  key: 'AIzaSyDolRhAuSs-3GcB0TZQv1tmqZ_pFTr6Pzk'
};

function search() {
  $('#results').html('');
  $('#buttons').html('');

  var q = $('#query').val();

  $.get(
    `${API.url}`,
    {
      part: 'snippet, id',
      q,
      type: 'video',
      key: API.key
    },
    function(data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      $.each(data.items, function(i, item) {
        var output = getOutput(item);

        $('#results').append(output);
      });
    }
  );
}
