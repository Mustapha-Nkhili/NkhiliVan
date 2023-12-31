export async function getVans() {
  const res = await fetch("/api/vans");
  if (!res.ok) {
    throw {
      message: "Failed to fetch the Vans",
      statusText: res.statusText,
      status: res.status,
    };
  }

  const data = await res.json();
  return data.vans;
}

export async function getHostVans(id) {
  try {
    const response = await fetch(`/api/host/vans${id ? `/${id}` : ""}`);

    if (!response.ok) {
      throw {
        message: "Failed to fetch the hosted Vans",
        statusText: response.statusText,
        status: response.status,
      };
    }

    const data = await response.json();
    return data.vans
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "An error occurred while fetching data." };
  }
}

export async function loginUser(creds) {
  setTimeout((resolve) => resolve , 60000);
  const res = await fetch("/api/login",
      { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
      throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status
      }
  }

  return data
}
