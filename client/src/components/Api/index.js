import { getResource, postResource, updateResource } from '../../utils/http';

class Api {
  static getEmployees() {
    return new Promise((resolve, reject) => {
      return getResource('/employees')
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  }

  static getEvent(eventId) {
    return new Promise((resolve, reject) => {
      return getResource(`/events/${eventId}`)
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  }

  static createEvent(params) {
    const { loggedAt, reason, eventType, email, password } = params;
    const data = {
      event: {
        email,
        password,
        logged_at: loggedAt,
        reason: reason,
        event_type: eventType.value,
      },
    };

    return new Promise((resolve, reject) => {
      return postResource(`/events`, data)
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  }

  static updateEvent(eventId, params) {
    const { loggedAt, reason, eventType } = params;
    const data = {
      event: {
        logged_at: loggedAt,
        reason: reason,
        event_type: eventType.value,
      },
    };
    return new Promise((resolve, reject) => {
      return updateResource(`/events/${eventId}`, data)
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  }
}

export default Api;
