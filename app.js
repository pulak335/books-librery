const searchBox = () => {

    const searchBox = document.getElementById("searchInput");
    const searchValue = searchBox.value;
    searchBox.value = "";
    if (searchValue=='') {
        alert("You sreach box is empty");
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchValue}`
        fetch(url)
        .then(response => response.json())
        .then(data => displayBookmark(data))
    }
}

const displayBookmark = (data) => {
    const searchResult = document.getElementById("results");
    const books = data.docs;
    searchResult.innerHTML = "";
    const resultView = document.getElementById("result-count");
    resultView.innerText = books.length;
    if (books.length == 0) {
        const resultNo = document.getElementById("result-no");
        resultNo.style.display = "block";
    }

    else {
        books.forEach(book => {
            let imgUrl;
            if (book.cover_i) {
                imgUrl=`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            }
            else {
                imgUrl=`img/no-img.jpg`
            }
            
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
            <div class="card h-100">
            <img src="${imgUrl}" class="card-img-top">
            <div class="card-body">
              <h3 class="card-title">${book.title}</h3>
              <h6 class="card-text"><span text-gray>Publisher: </span><strong>${book.publisher}</strong></h6>
            </div>
            <div class="card-footer d-flex justify-content-between">
            <small class="text-gray">Author Name: <span class="text-info">${book.author_name}</span></small>
          </div>
            <div class="card-footer d-flex justify-content-between">
              <strong class="text-muted"><span class="text-info">First Publish Year: </span>${book.first_publish_year}</strong>
            </div>
          </div>
            `
            searchResult.appendChild(div);
            const resultNo = document.getElementById("result-no");
            resultNo.style.display = "none";
        })
    }
}
