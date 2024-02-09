export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + id);
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function fetchProductBySearchQuery(query) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products?title_like=" + query
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    console.log(data);
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function addNewProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductListByFilters(
  filter,
  sort,
  pagination,
  admin,
  searchQuery
) {
  let queryString = "";

  for (let key in filter) {
    const filterValues = filter[key];
    console.log(filter, filter[key]);
    if (filterValues.length > 0) {
      if (key === "priceRange" || key === "ratingRange") {
        let minVal = Math.min(...filterValues.flat());
        let maxVal = Math.max(...filterValues.flat());
        switch (key) {
          case "priceRange":
            queryString += `price_gte=${minVal}&price_lte=${maxVal}&`;
            break;
          case "ratingRange":
            queryString += `rating_gte=${minVal}&rating_lte=${maxVal}&`;
            break;
        }
      } else {
        queryString += `${key}=${filterValues}&`;
      }
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in searchQuery) {
    queryString += `${key}=${searchQuery[key]}&`;
  }

  if (admin) {
    queryString += `admin=true`;
  }
  console.log("Before fetch:", filter, sort, queryString);

  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    console.log("After fetch:", filter, sort, queryString);
    console.log("Response data:", data);

    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function fetchPriceRanges() {
  return new Promise(async (resolve) => {
    const response = await fetch("/priceRanges");
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function fetchRatingRanges() {
  return new Promise(async (resolve) => {
    const response = await fetch("/ratingRanges");
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories");
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}
