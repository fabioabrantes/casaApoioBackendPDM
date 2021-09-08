import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    const errorsValidation: ValidationErrors = {};

    error.inner.forEach(err => {
      errorsValidation[err.path] = err.errors;
    });
    return res
      .status(500)
      .json({ message: 'Internal server error', errorsValidation });
  }

  // console.error(error);
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
