import API from '../lib/api';

export const getQuestions = () => API.get('/question');
export const addQuestion = (formData) => API.post('/question/add', formData);
