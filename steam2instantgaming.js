function getWishlistPrices() {
  var steam_id = document.getElementById("steam_id").value;
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  var steamUrl = 'https://store.steampowered.com/wishlist/profiles/' + steam_id + '/wishlistdata/';
  var url = proxyUrl + steamUrl;

  // Display loading message
  var loadingMsg = document.querySelector(".loading");
  loadingMsg.style.display = "block";

  // Clear table
  var table = document.getElementById("wishlist_prices");
  var rowCount = table.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  fetch(proxyUrl, {
    headers: {
      "x-requested-with": "XMLHttpRequest"
    }
  })

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var gameData = data.response.games;
      var promises = [];

      // Loop through each game in the wishlist and add it to the table
      gameData.forEach(game => {
        if (game.appid) {
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);

          cell1.textContent = game.name;
          cell2.textContent = game.price_formatted;

          // Use the Instant Gaming API to get the sell price
          var instantGamingUrl = "https://api.instant-gaming.com/en/games/price/" + game.appid + "?currency=USD";
          var promise = fetch(instantGamingUrl)
            .then(response => response.json())
            .then(data => {cell3.textContent = data.sellPrice;})
            .catch(error => {console.error(error);cell3.textContent = "N/A"});
          promises.push(promise);
        }
      });

      Promise.all(promises).then(() => {
        // Hide loading message
        loadingMsg.style.display = "none";
      });
    })
    
    .catch(error => {console.error(error);
  }); 
}