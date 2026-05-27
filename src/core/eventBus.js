export function createEventBus() {
  const listeners = new Map();

  return {
    on(event, callback) {
      const handlers = listeners.get(event) ?? new Set();
      handlers.add(callback);
      listeners.set(event, handlers);

      return () => {
        handlers.delete(callback);
        if (handlers.size === 0) {
          listeners.delete(event);
        }
      };
    },
    emit(event, payload) {
      const handlers = listeners.get(event);
      if (!handlers) return;
      handlers.forEach((handler) => handler(payload));
    },
  };
}

const eventBus = createEventBus();

export default eventBus;
