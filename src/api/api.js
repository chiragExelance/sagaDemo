import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import _ from 'lodash';

class API {
  static async headers() {
    // const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      //  Authorization: 'Bearer' + ,
    };
  }

  // getAuthToken = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@token');
  //     if (value !== null) {
  //       return value;
  //     }
  //     return '';
  //   } catch (e) {
  //     return '';
  //   }
  // };

  static fetch(options) {
    return axios(options)
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(errorResponse => {
        console.log(errorResponse.response);
        var errorMessages = '';

        if (!options.silent) {
          if (errorResponse.response && errorResponse.response.data.errors) {
            errorMessages = _.join(errorResponse.response.data.errors, '\n');
          } else if (
            errorResponse.response &&
            errorResponse.response.data.error
          ) {
            errorMessages = errorResponse.response.data.error;
          } else if (
            errorResponse.response &&
            errorResponse.response.data.message
          ) {
            errorMessages = errorResponse.response.data.message;
          } else if (errorResponse.message == 'Network Error') {
            errorMessages =
              'Please check your internet connection and try again.';
          } else if (errorResponse.message) {
            errorMessages = errorResponse.message;
          } else {
            errorMessages = 'Something went wrong, please try again later.';
          }
        }

        throw errorMessages;
      });
  }
}

export {API};
