const API_PATH = '/api';
const SNACKBAR_PROPS = {
    SeverityType: {
        ERROR: 'error',
        WARNING: 'warning',
        INFO: 'info',
        SUCCESS: 'success'
    },
    MessageType: {
        SUCCESS_SAVED: 'Selected data has been saved successfully!',
        SUCCESS_REMOVED: 'Selected data has been removed successfully!',
        FAILED_SAVING: 'Failed saving data!',
        FAILED_DELETING: 'Failed deleting data!',
        FAILED_GETTING: 'Failed loading data!',
        CONNECTION_ERROR: 'Failed connecting to the remote server!',
        MISSING_INPUT: 'Missing input!'
    }
};

module.exports = { API_PATH, SNACKBAR_PROPS };