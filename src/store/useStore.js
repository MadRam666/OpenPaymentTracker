import { create } from 'zustand';
import { db } from '../db/db';

const useStore = create((set, get) => ({
    paymentItems: [],
    isLoading: false,
    error: null,

    fetchPaymentItems: async () => {
        set({ isLoading: true });
        try {
            const items = await db.paymentItems.toArray();
            set({ paymentItems: items, isLoading: false });
        } catch (err) {
            set({ error: err.message, isLoading: false });
        }
    },

    addPaymentItem: async (item) => {
        try {
            const id = await db.paymentItems.add({
                ...item,
                createdAt: new Date(),
                status: {
                    overdueSince: item.overdueSince || null,
                    collectionInvolved: false,
                    paymentOrderInitiated: false,
                    objectionInitiated: false,
                    objectionWithdrawnRequested: false,
                    deadline14DaysMet: false,
                    vbBescheid: false,
                    garnishment: false
                }
            });
            get().fetchPaymentItems();
            return id;
        } catch (err) {
            set({ error: err.message });
        }
    },

    updatePaymentItem: async (id, updates) => {
        try {
            await db.paymentItems.update(id, updates);
            get().fetchPaymentItems();
        } catch (err) {
            set({ error: err.message });
        }
    },

    deletePaymentItem: async (id) => {
        try {
            await db.paymentItems.delete(id);
            get().fetchPaymentItems();
        } catch (err) {
            set({ error: err.message });
        }
    }
}));

export default useStore;
