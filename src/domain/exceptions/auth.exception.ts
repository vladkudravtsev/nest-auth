export class DomainException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UserNotFoundException extends DomainException {
  constructor(identity: string) {
    super(`User with identity: ${identity} not found`);
  }
}

export class InvalidCredentialsException extends DomainException {
  constructor() {
    super('Invalid credentials');
  }
}

export class AppNotFoundException extends DomainException {
  constructor(appId: number) {
    super(`App with id: ${appId} not found`);
  }
}
