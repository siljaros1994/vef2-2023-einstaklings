export const getWeatherImageUrl = (publicId, options = {}) => {
    const baseURL = 'https://res.cloudinary.com/dfozabnjf/image/upload';
    const width = options.width || 'auto';
    const crop = options.crop || 'scale';
    const transformation = `w_${width},c_${crop}`;
  
    return `${baseURL}/${transformation}/${publicId}`;
  };
  
