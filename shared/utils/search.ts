export const onChangeSearchText = (e: any, setSearchTitle: any) => {
  const query = e.target.value;
  setSearchTitle(query);
};

export const search = (
  e: any,
  router: any,
  searchTitle: string,
  reset?: boolean
) => {
  const query = reset ? "" : searchTitle;
  let href = "/usuarios";

  if (query) {
    href += "?query=" + query;
  }
  e.preventDefault();
  router.push(href);
};

export const onSearchKeyPress = (e: any, router: any, searchTitle: string) => {
  if (e.key === "Enter") {
    search(event, router, searchTitle);
  }
};
