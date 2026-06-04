/**
 * Maps Firebase Auth error codes/messages to user-friendly, professional error messages.
 * @param {object|string} error The error object or message string from Firebase
 * @returns {string} Clean, descriptive error message
 */
export const getCleanErrorMessage = (error) => {
  if (!error) return '';

  const errorCode = error.code || error.message || String(error);

  if (errorCode.includes('auth/email-already-in-use')) {
    return 'This email address is already in use by another account.';
  }
  if (errorCode.includes('auth/invalid-email')) {
    return 'Please enter a valid email address.';
  }
  if (errorCode.includes('auth/weak-password')) {
    return 'Your password must contain at least 6 characters.';
  }
  if (
    errorCode.includes('auth/wrong-password') || 
    errorCode.includes('auth/user-not-found') || 
    errorCode.includes('auth/invalid-credential')
  ) {
    return 'Incorrect email or password. Please try again.';
  }
  if (errorCode.includes('auth/network-request-failed')) {
    return 'Network connection error. Please check your internet connection.';
  }
  if (errorCode.includes('auth/too-many-requests')) {
    return 'Too many failed login attempts. Please try again later or reset your password.';
  }
  if (errorCode.includes('auth/user-disabled')) {
    return 'This user account has been disabled. Please contact support.';
  }
  if (errorCode.includes('auth/operation-not-allowed')) {
    return 'Sign-in provider is disabled. Please contact support.';
  }

  // Remove standard Firebase: prefixes and parentheses if any other error
  return error.message
    ? error.message.replace(/^Firebase:\s*/, '').replace(/\s*\(auth\/.*\)\.?$/, '')
    : 'An unexpected error occurred. Please try again.';
};
