document.getElementById('myForm').addEventListener('submit', saveBookmark);


function saveBookmark(e) {

  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  if (localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];

    //add to array
    bookmarks.push(bookmark);

    //set to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {

    // ******************  ?????????????????????????????????? 
    // get bookmars from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // clear form
  document.getElementById('myForm').reset();

  fetchBookmarks();
  e.preventDefault();
}


function fetchBookmarks() {
  // get bookmars from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarkResults = document.getElementById('bookmarksResults');

  bookmarkResults.innerHTML = "";

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div class="well">' +
      '<h3>' + name +
      ' <a class="btn btn-default" target="_blank" href=' + url + '>Visit</a> ' +
      ' <a onClick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
      ' </h3>' +
      ' </div>';
  }
}


// delete bookmark function
function deleteBookmark(url) {

  // Get bookmarks from localStorage  
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      //remove from array
      bookmarks.splice(i, 1);
    }
  }

  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // da prikazemo ponovo iteme treba refresovati stranu tj pozvati f-ju ponovo
  fetchBookmarks();
  //console.log(url);
}


function validateForm(siteName, siteUrl) {

  if (!siteName || !siteUrl) {
    alert("Please fill the form!")
    return false;
  }

  // validate url
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(expression)) {
    alert('Insert valid url!');
    return false;
  }

  return true;
}