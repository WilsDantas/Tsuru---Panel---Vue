export default {
    SET_CURRENTPAGE(state, current_page) {
        state.pagination.current_page = current_page
    },
    SET_PAGINATE(state, meta) {
        state.pagination.last_page = meta.last_page
        state.pagination.current_page = meta.current_page
        let paginate = []
        if (meta.current_page > 1 && meta.current_page < state.pagination.last_page) {
            paginate = [];
            for (let pages = meta.current_page - 1; pages < meta.current_page + 2; pages++) {
                paginate.push(pages);
            }
        }
        else if (meta.current_page == 1 || meta.current_page == 2) {
            paginate = [];
            for (let pages = 1; pages <= 2; pages++) {
                paginate.push(pages);
            }
        }
        else if (meta.current_page == state.pagination.last_page) {
            paginate = [];
            for (
                let pages = state.pagination.last_page - 2;
                pages <= state.pagination.last_page;
                pages++
            ) {
                paginate.push(pages);
            }
        }
        state.pagination.paginate = paginate
    }
}