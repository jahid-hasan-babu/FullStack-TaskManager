export function UnAuthorizeRequest(error) {
  if (error && error.response) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    } else {
      console.error("Error response status:", error.response.status);
    }
  } else {
    console.error("No response received from server", error);
  }
}
