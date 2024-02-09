export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/own/");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("/users/own");
    const data = await response.json();
    console.log("fetch user", data);
    resolve({ data });
  });
}

export function updateUser(updateData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "/users/" + updateData.id,
      {
        method: "PATCH",
        body: JSON.stringify(updateData),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
