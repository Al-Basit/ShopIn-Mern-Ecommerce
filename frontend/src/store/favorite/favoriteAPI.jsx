export function addToFavorites(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/favorite?", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchFavoriteItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "/favorite?user=" + userId
    );
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function removeFromFavorites(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/favorite/" + itemId, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}
