import Dexie from 'dexie';

export const db = new Dexie('OpenPaymentTrackerDB');

db.version(1).stores({
    paymentItems: '++id, userStory, openClaimAmount, lastContactDate, overdueSince',
    timelines: '++id, paymentItemId, date, title, description',
    timeEntries: '++id, paymentItemId, start, end, duration',
    contacts: '++id, paymentItemId, name, email, phone'
});

export default db;
