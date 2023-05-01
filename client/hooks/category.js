import API from '../lib/api';

export const getCategories = () => API.get('category');
export const addCategory = (formData) => API.post('category/add', formData);
export const updateCategory = (id, formData) => API.put('category/update/' + id, formData);
export const deleteCategory = (id) => API.post('category/delete/' + id);

export const addSubCategory = (formData) => API.post('subCategory/add', formData);
export const updateSubCategory = (id, formData) => API.put('subCategory/update/' + id, formData);
export const deleteSubCategory = (id) => API.delete('subCategory/delete/' + id);
