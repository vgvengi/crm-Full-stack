const AUTH_STORAGE_KEY = "hubspot-authenticated";

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function markAuthenticated(): void {
  localStorage.setItem(AUTH_STORAGE_KEY, "true");
}
