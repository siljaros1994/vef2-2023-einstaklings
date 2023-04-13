export function generateApiUrl(path) {
  const baseUrl = process.env.REACT_APP_API_URL;
  console.log(baseUrl)

  if (!baseUrl) {
      console.error('Error: REACT_APP_API_URL environment variable is not defined.');
      return;
  }

  try {
      const url = new URL(path, baseUrl);
      console.log('url', url);
      return url;
  } catch (error) {
      console.error(`Error generating API URL: ${error.message}`);
      console.error(`Base URL: ${baseUrl}`);
      console.error(`Path: ${path}`);
      throw error;
  }
}
