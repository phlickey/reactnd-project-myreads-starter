# MyReads Project

Amended by Philip Hickey as submission of the react developer nanodegree.

Requisits for the project are Node.js and npm.


Install via the following commands

```bash
git clone https://github.com/phlickey/reactnd-project-myreads-starter.git
cd reactnd-project-myreads-starter
npm i
```

From the starter code I separated out hte following components in the expected way:
Header - Handles displaying the titlebar
Book - Handles the logic of rendering a single book.
Bookshelf - Handles the logic of rendering a titled collection of multiple books.
SearchBar - Handles inputting the search query and requesting the search logic
SearchResults - Handels the logic for showing and hiding a bookshelf with results from the search query, and a count of the books returned.

Features of interest:
1. The app responds quickly, adding books to target shelves optimistically. Because the change hasn't been confirmed when the book first renders, the book is shown greyed out. Once the api response confirms that the book has been added to the correct shelf on the back end, it updates its state