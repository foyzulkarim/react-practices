export async function getUserAsync(name) {
  await fetch('http://localhost:3001/posts/search')
    .then(async (response) => {
      return await response.json()
    }
  }