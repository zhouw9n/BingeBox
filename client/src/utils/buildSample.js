
export const buildSample = (descriptions) => {
    let query = "";
    descriptions.forEach((description) => {
        if (description.length > 100) {
            const cutoff = description.lastIndexOf(" ", 100);
            const trimmedDescription = description.slice(0, cutoff !== -1 ? cutoff : 100);
            query += ` ${trimmedDescription}.`;
            
        } else {
            query += ` ${description}.`;
        }
    });

    return query.trim();
}