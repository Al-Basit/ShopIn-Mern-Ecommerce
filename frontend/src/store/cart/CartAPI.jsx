export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart?", {
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

export function fetchCartItemsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart");
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function deleteCartItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/" + itemId, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}
export function resetCart() {
  return new Promise(async (resolve) => {
    const response = await fetchCartItemsByUserId();
    const items = response.data;
    for (let item of items) {
      await deleteCartItem(item.id);
    }
    resolve({ status: "success" });
  });
}
