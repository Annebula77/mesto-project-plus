export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message); // передаем сообщение в базовый класс
    this.name = "NotFoundError"; // задаем имя ошибки
    Object.setPrototypeOf(this, NotFoundError.prototype); // правильно устанавливаем прототип (необходимо для `instanceof` в TypeScript)
  }
}