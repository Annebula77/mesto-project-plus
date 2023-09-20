class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundError';

    // правильно устанавливаем прототип (необходимо для `instanceof` в TypeScript)
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
