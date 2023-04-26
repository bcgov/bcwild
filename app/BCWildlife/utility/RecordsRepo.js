import EncryptedStorage from 'react-native-encrypted-storage';

class RecordsRepo {
  static async addRecord(recordIdentifier, jsonValue) {
    // Store the value in the given key
    await EncryptedStorage.setItem(recordIdentifier, jsonValue);

    // Fetch the unsynced records
    let unsyncedRecords = await EncryptedStorage.getItem('unsynced_records');
    if (!unsyncedRecords) {
      // If no unsynced records exist, create an empty array
      unsyncedRecords = [];
    } else {
      // Otherwise, parse the JSON string into an array
      unsyncedRecords = JSON.parse(unsyncedRecords);
    }

    // Add the new record identifier to the array
    unsyncedRecords.push(recordIdentifier);

    // Convert the array to a JSON string and store it back
    await EncryptedStorage.setItem('unsynced_records', JSON.stringify(unsyncedRecords));
  }

  static async getUnsyncedRecords() {
    // Fetch the unsynced record identifiers
    const unsyncedRecords = await EncryptedStorage.getItem('unsynced_records');
    if (!unsyncedRecords) {
      // If no unsynced records exist, return an empty array
      return 'empty';
    }

    // Parse the JSON string into an array
    const unsyncedRecordIdentifiers = JSON.parse(unsyncedRecords);

    // Create a temporary array to store the unsynced records
    const temp = [];

    // Loop through the unsynced record identifiers
    for (let i = 0; i < unsyncedRecordIdentifiers.length; i++) {
      const recordIdentifier = unsyncedRecordIdentifiers[i];

      // Fetch the record value from the local storage
      const recordValue = await EncryptedStorage.getItem(recordIdentifier);

      // Add the record identifier and data to the temporary array
      temp.push({
        record_identifier: recordIdentifier,
        data: JSON.parse(recordValue),
      });
    }

    // Return the temporary array as a JSON string
    return JSON.stringify(temp);
  }
}

export default RecordsRepo;
