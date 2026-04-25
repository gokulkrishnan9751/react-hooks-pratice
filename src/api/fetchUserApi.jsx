export const searchUsers = async (username) => {
  const query = username?.trim();
  if (!query) {
    throw new Error("Please enter a username");
  }

  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${query}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch users");
    }

    return data.items || [];
  } catch (error) {
    console.error("Error", error);  
    throw error;
  }
};

export const fetchProfile = async (username) => {
  const users = await searchUsers(username);

  if (!users.length) {
    throw new Error("User not found");
  }

  return users[0];
};