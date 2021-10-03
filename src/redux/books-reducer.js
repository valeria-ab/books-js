let initialState = {
    books: [],
    totalItems: null,
    startIndex: 0,
    maxResults: 30,
    currentPage: 1
}

/*let pagesCount = initialState.totalItems / initialState.maxResults

let pages = []

for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
}*/

//31 минута 55й урок объясняет как отрисовать счётчик номерки страниц

export const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE-START-INDEX': {
            let stateCopy = [...state]
            stateCopy.startIndex = stateCopy.startIndex + 30
            return stateCopy
        }
        default: return state
    }
}

export const changeStartIndex = () => {
    return {type: 'CHANGE-START-INDEX'}
}