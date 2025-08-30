export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERRORS = {
  INVALID_NAME: {
    code: 'INVALID_NAME',
    message: 'Name is required',
    statusCode: STATUS_CODES.BAD_REQUEST,
  },
  PARENT_NOT_FOUND: {
    code: 'PARENT_NOT_FOUND',
    message: 'Parent node not found',
    statusCode: STATUS_CODES.NOT_FOUND,
  },
  NODE_NOT_FOUND: {
    code: 'NODE_NOT_FOUND',
    message: 'Node not found',
    statusCode: STATUS_CODES.NOT_FOUND,
  },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'Validation error',
    statusCode: STATUS_CODES.BAD_REQUEST,
  },
  INVALID_ID: {
    code: 'INVALID_ID',
    message: 'Invalid ID format',
    statusCode: STATUS_CODES.BAD_REQUEST,
  },
  DUPLICATE_KEY: {
    code: 'DUPLICATE_KEY',
    message: 'Duplicate value error',
    statusCode: STATUS_CODES.CONFLICT,
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
    statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
  },
  SELF_REFERENCE_ERROR: {
    code: 'SELF_REFERENCE_ERROR',
    message: 'Node cannot be its own parent',
    statusCode: STATUS_CODES.BAD_REQUEST,
  },
};