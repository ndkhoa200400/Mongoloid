
const limit = 9;

module.exports = {
    limit,
    calcOffset(page) {
        return (page - 1) * limit
    },

    calcPageNumbers(total, page) {
        let nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;

        const page_numbers = [];
        for (let i = 1; i <= nPages; i++) {
            page_numbers.push({
                value: i,
                isCurrentPage: i === +page
            });
        }
        return page_numbers;
    },

    calcNextPage(page, page_numbers) {
        const pg = parseInt(page);
        if ((pg + 1) > page_numbers.length)
            return pg;
        return pg + 1;
    },
    calcPreviousPage(page, page_numbers) {
        const pg = parseInt(page);
        if ((pg - 1) < 1)
            return pg;
        return pg - 1;
    }
};