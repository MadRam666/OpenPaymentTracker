import Dexie from 'dexie';

export const db = new Dexie('OpenPaymentTrackerDB');

db.version(1).stores({
    paymentItems: '++id, userStory, openClaimAmount, lastContactDate, overdueSince',
    timelines: '++id, paymentItemId, date, title, description',
    timeEntries: '++id, paymentItemId, start, end, duration',
    contacts: '++id, paymentItemId, name, email, phone'
});

// Explicitly open the database and log status
db.open().then(() => {
    console.log("Database opened successfully");
}).catch(err => {
    console.error("Failed to open database:", err.stack || err);
});

export default db;
