/**
 * Utilities for building a single sample string by concatenating trimmed movie/shows descriptions
 * based on the user's favorites. This is so we can vectorize the sample and complete a vector search 
 * provided by the Datastax database.
 * 
 * Purpose:
 * - Creates a query string to make use of the "vectorize" keyword provided by the Datastax API.
 * 
 * Rules:
 * - If user has more then 5 favorites only the recent 5 will be used as sampling.
 * - The sample is based on the movies/shows description and is limited to not longer than 100 chars.
 * - Datastax only allows a string of max of 512 characters to be vectorized.
 *  
 * @param {string[]} descriptions - Array of last 5 movie/show descriptions.
 * @returns {string} - A single concatenated string, trimmed and punctuated.
 */

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