
export class EmailNotExistsError extends Error {
    constructor(){
      super("Email not found")
    }
}