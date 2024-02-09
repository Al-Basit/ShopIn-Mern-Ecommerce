export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllOrders(pagination, sort) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  console.log("Before fetch:", sort, queryString);

  return new Promise(async (resolve) => {
    const response = await fetch(
      "/orders/?" + queryString
    );
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    console.log("After fetch:", sort, queryString);
    console.log("Response data:", data);

    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
