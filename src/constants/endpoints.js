/**
 * export endpoints
 */
import environment from './environment';
const { API_PATH } = environment;

export default {
  USER: {
    create: `${API_PATH}/user/create`,
    login: `${API_PATH}/user/login`
  }
}