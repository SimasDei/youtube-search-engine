$(document).ready(function() {
  var searchField = $("#query");
  var icon = $("#search-button");

  $(".search-field").on("focus", function() {
    $(this).animate(
      {
        width: "100%"
      },
      200
    );
    $(icon).animate(
      {
        right: "10px"
      },
      200
    );
  });

  $(".search-field").on("blur", function() {
    if (!searchField.val()) {
      $(searchField).animate(
        {
          width: "45%"
        },
        200,
        function() {}
      );

      $(icon).animate(
        {
          right: "360px"
        },
        200,
        function() {}
      );
    }
  });

  $("#search-form").submit(function(e) {
    e.preventDefault();
  });
});

const API = {
  url: "https://www.googleapis.com/youtube/v3/search",
  key: "AIzaSyDolRhAuSs-3GcB0TZQv1tmqZ_pFTr6Pzk"
};
var q = $("#query").val();

function search() {
  $("#results").html("");
  $("#buttons").html("");

  $.get(
    `${API.url}`,
    {
      part: "snippet, id",
      q,
      type: "video",
      key: API.key
    },
    function(data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      $.each(data.items, function(i, item) {
        var output = getOutput(item);

        $("#results").append(output);
      });

      var buttons = getButtons(prevPageToken, nextPageToken);

      $("#buttons").append(buttons);
    }
  );
}

function getOutput(item) {
  var videoId = item.id.videoId,
    title = item.snippet.title,
    description = item.snippet.description,
    thumb = item.snippet.thumbnails.high.url,
    channelTitle = item.snippet.channelTitle,
    videoDate = item.snippet.publishedAt;

  var output = `
      <li>
        <div class="list-left">
          <img src="${thumb}" alt="${title}" />
        </div>
        <div class="list-right">
          <h3>${title}</h3>
          <small>By: <span class="channel-title">${channelTitle}</span> on: ${videoDate}</small>
          <p>${description}</p>
        </div>
      </li>
      <div class="clearfix"></div>
    `;

  return output;
}

function getButtons(prevPageToken, nextPageToken) {
  if (!prevPageToken) {
    var btnOutput = `
    <div class="button-container">
      <button 
      id="next-button" 
      class="paging-button" 
      data-token="${nextPageToken}" 
      data-query="${q}"
      onclick="nextPage();"
      >Next</button>
    </div>
    `;
  } else {
    var btnOutput = `
    <div class="button-container">
    <button 
      id="prev-button" 
      class="paging-button" 
      data-token="${prevPageToken}" 
      data-query="${q}"
      onclick="prevPage();"
      >prev</button>

      <button 
      id="next-button" 
      class="paging-button" 
      data-token="${nextPageToken}" 
      data-query="${q}"
      onclick="nextPage();"
      >Next</button>
    </div>
    `;
  }

  return btnOutput;
}
