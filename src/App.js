import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, { useEffect, useMemo, useState } from 'react';
import {
    Button,
    Divider,
    FormControl,
    IconButton,
    InputBase,
    InputLabel, MenuItem,
    Paper,
    Select,
    TextField
} from "@material-ui/core";
import { Directions, Search } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { changeStartIndex } from "./redux/books-reducer";


function App() {
    console.log("App")
    const apiKey = "AIzaSyCl3cOILHXD6foLPSdKFV4l4Li5x5ILNcQ"

    const [book, setBook] = useState("")
    const [result, setResult] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [filter, setFilter] = useState("")

    //const [currentPage, setCurrentPage] = useState(1)

    const [bookIndex, setBookIndex] = useState(0)



    /*    let pages = []
        let pagesCount = Math.ceil(totalCount / 30)

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }*/

    //https://www.googleapis.com/books/v1/volumes?q=java&key=AIzaSyCl3cOILHXD6foLPSdKFV4l4Li5x5ILNcQ


    function handleChange(event) {
        setBook(event.currentTarget.value)
    }
    function handleFilterChange(event) {
        setFilter(event.target.value)
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        axios.get(`https://www.googleapis.com/books/v1/volumes?&q=${book}&startIndex=${bookIndex}&maxResults=30&key=${apiKey}`)
            .then(data => {
                debugger
                console.log(data)
                console.log(data.data.items)
                setResult([...result, ...data.data.items])
                setBookIndex(prevState => prevState + 30)
                setTotalCount(data.data.totalItems)
                console.log(totalCount)
            })
    }
    // useEffect(()=>{
    //     if (book === ["Biography"]) {
    //         setResult(result.filter(b => {
    //             debugger
    //             return b.volumeInfo.categories["Biography"]
    //         })
    //         )
    //     }

    //     if (filter === ["History"]) {
    //         setResult(result.filter(b => b.volumeInfo.categories === ["History"]))
    //     }
    //     if (filter === ["Computers"]) {
    //         setResult(result.filter(b => b.volumeInfo.categories === ["Computers"]))
    //     }
    //     if (filter === ["Medical"]) {
    //         setResult(result.filter(b => b.volumeInfo.categories === ["Medical"]))
    //     }
    //     if (filter === ["Poetry"]) {
    //         setResult(result.filter(b => b.volumeInfo.categories === ["Poetry"]))
    //     }
    // },[book])

    let filteredList = useMemo(() => {
        let filterder = [...result]

        filterder = filter && filter.length
            ? filterder.filter(obj => {

                    const data =  obj.volumeInfo.categories
                    ?  obj.volumeInfo.categories.map(category => category.toLowerCase())
                    : []
                    return data.includes(filter.toLowerCase())
            })
            : filterder
        return filterder


    }, [result, filter])
    console.log(filteredList)

    return (
        <div className="App">
            <h1>Book search App</h1>
            <div className={"container"}>

                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <div>

                        <InputBase
                            variant="outlined"
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="?????????????? ???????????????? ??????????"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={handleChange}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <Search onClick={handleSubmit} />
                        </IconButton>
                    </div>

                    <div className={"selectBlock"}>
                        Categories

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="all"
                                onChange={handleFilterChange}

                            >
                                <MenuItem value={""}
                                 
                                >All</MenuItem>
                                <MenuItem value={"biography"}
                                    >Biography</MenuItem>
                                <MenuItem value={"history"}
                                   
                                >History</MenuItem>

                                <MenuItem value={"computers"}
                                   
                                >Computers</MenuItem>

                                <MenuItem value={"medical"}
                                   
                                >Medical</MenuItem>
                                <MenuItem value={"poetry"}
                                    
                                >Poetry</MenuItem>

                            </Select>
                        </FormControl>


                    </div>
                    {/* <div className={"selectBlock"}>
                        Sorting by
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={"relevance"}
                                label="Sorting by"
                                onChange={handleChange}
                            >
                                <MenuItem value={"relevance"}>relevance</MenuItem>
                                <MenuItem value={"newest"}>newest</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className={"selectBlock"}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"

                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={"biography"}>biography</MenuItem>
                                <MenuItem value={"history"}>history</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
*/}

                    {/* <div>{totalCount > 0 && totalCount}</div> */}
                    <div>{filteredList.length}</div>


                    <div>
                        {filteredList.map(book => {
                            // return<div>{book.volumeInfo && book.volumeInfo.categories && book.volumeInfo.categories}</div>
                            // debugger
                            return <a target=" blank" href={""}>
                                {
                                    book.volumeInfo.imageLinks &&
                                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />}
                            </a>
}
                        )}
                    </div>
                    <Button variant="contained"
                        size="large"
                        onClick={handleSubmit}
                    >Load More
                    </Button>

                    {/* <div>{pages.map(p =>
                      <span className={currentPage === p && "selectedPage"}>-{p}-</span>
                  )}</div>*/}

                </Paper>

            </div>


        </div>
    );

}

export default App;
