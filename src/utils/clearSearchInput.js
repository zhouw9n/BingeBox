
/**
 * Utilities for clearing all <input> search fields on the page.
 * 
 * Handles cases where the user starts typing a search but
 * navigates away before submitting. It removes the input value.
 * 
 */
export const clearSearchInput = () => {
    const input = document.querySelectorAll("input");
    input.forEach(input => {
        input.value = "";
    });
}