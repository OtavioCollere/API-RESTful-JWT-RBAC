
export class UserNotFoundError extends Error {
  constructor(){
    super("Email not found")
  }
}