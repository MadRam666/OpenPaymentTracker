import { db } from '../db/db';

export const runChecker = async () => {
    const items = await db.paymentItems.toArray();
    const overDueItems = items.filter(item => {
        if (!item.overdueSince) return false;
        const overdueDate = new Date(item.overdueSince);
        return overdueDate < new Date();
    });

    if (overDueItems.length === 0) return null;

    let report = `Offene Posten Bericht - ${new Date().toLocaleDateString()}\n\n`;
    report += `Es wurden ${overDueItems.length} überfällige Posten gefunden:\n\n`;

    overDueItems.forEach(item => {
        report += `----------------------------------\n`;
        report += `Betreff: ${item.userStory}\n`;
        report += `Betrag: ${item.openClaimAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}\n`;
        report += `Säumig seit: ${new Date(item.overdueSince).toLocaleDateString()}\n`;
        report += `Nächste Schritte: ${item.nextSteps || 'Keine'}\n`;
    });

    return report;
};

export const sendEmailReport = (email, report) => {
    const subject = encodeURIComponent(`Statusbericht Offene Posten ${new Date().toLocaleDateString()}`);
    const body = encodeURIComponent(report);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};
