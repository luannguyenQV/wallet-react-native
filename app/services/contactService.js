import Expo from 'expo';
import { Alert } from 'react-native';

const PAGE_SIZE = 500;

var contactService = {
  getAllContacts: async () => {
    const permission = await Expo.Permissions.askAsync(
      Expo.Permissions.CONTACTS,
    );

    if (permission.status === 'granted') {
      let response = await Expo.Contacts.getContactsAsync({
        fields: [
          Expo.Contacts.PHONE_NUMBERS,
          Expo.Contacts.EMAILS,
          Expo.Contacts.THUMBNAIL,
        ],
        pageSize: PAGE_SIZE,
        pageOffset: 0,
      });

      let contacts = response.data;

      for (i = 1; i < response.total / PAGE_SIZE; i++) {
        response = await Expo.Contacts.getContactsAsync({
          fields: [
            Expo.Contacts.PHONE_NUMBERS,
            Expo.Contacts.EMAILS,
            Expo.Contacts.THUMBNAIL,
          ],
          pageSize: PAGE_SIZE,
          pageOffset: PAGE_SIZE * i,
        });
        contacts = contacts.concat(response.data);
      }

      var data = [];
      var alreadyAdded = [];
      let count = 0;
      contacts.forEach(node => {
        var thumbnail = node.thumbnail ? node.thumbnail.uri : null;
        if (typeof node.phoneNumbers !== 'undefined') {
          node.phoneNumbers.forEach(number => {
            var mobile = number.number;
            mobile = mobile.replace(/\s/g, '');
            if (alreadyAdded.indexOf(mobile) == -1) {
              var newData = {
                name: node.name,
                type: 'mobile',
                contact: mobile,
                image: thumbnail,
                id: count,
              };
              data.push(newData);
              alreadyAdded.push(mobile);
              count++;
            }
          });
        }
        if (typeof node.emails !== 'undefined') {
          node.emails.forEach(email => {
            var address = email.email;
            if (alreadyAdded.indexOf(address) == -1) {
              var newData = {
                name: node.name,
                type: 'email',
                contact: address,
                image: thumbnail,
                id: count,
              };
              data.push(newData);
              alreadyAdded.push(address);
              count++;
            }
          });
        }
      });

      data = data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });

      return data;
    }

    return;
  },
};

export default contactService;
