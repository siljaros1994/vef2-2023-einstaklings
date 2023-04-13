export function generateApiUrl(path) {
    const baseUrl = process.env.REACT_APP_API_URL;
    console.log(baseUrl)
    const url = new URL(path, baseUrl);
  
    console.log('url', url);
  
    return url;
  }