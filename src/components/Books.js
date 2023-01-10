import React, {useEffect,useState} from 'react';
import axios from 'axios'
import './Books.css'
import { Link } from 'react-router-dom';


const Books = () => {

    const[books,setBooks] = useState([])
    const[newBooks,setNewBooks] = useState([])
    const[value,setValue] = useState('')

    const nam = sessionStorage.getItem("name")
    
    const onSearch = (e) =>{
        setValue(e.target.value)
        console.log(e.target.value);
          let newArr=[];
       books.map(e=>{
        if (e.title.toLowerCase().search(value.toLowerCase())>=0) {
            newArr.push(e)
        }
         
       })
       setNewBooks(newArr);
        }

        function check (text){
            if(text!==""){
                let found = false;
                books.forEach( (book) =>{
                    if(value.toLowerCase()===book.title.slice(0,value.length).toLowerCase()){
                        found = true;
                    }
                })
                if(!found){
                    return false
                }
                else{
                    return true;
                }
            }
            else{
                return true;
            }
        }
    useEffect(() =>{
     const fetchBooks = async () =>{
        const res = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Izzu794wlmA9csGko8RrcjomCdVRv0la`)
        console.log(res.data.results.books)
        setBooks(res.data.results.books)
        setNewBooks(res.data.results.books)
     }
    
     fetchBooks()
    },[])
  return (
    <div className='container'>
         <div className='Header'>
         <h1 style ={{color:"red" , fontSize:"8vmin"}} >Kalvium Books</h1>
         
           <input type="text" value ={value} onChange ={onSearch} id='input-search-box'  placeholder='Search your Books'/>
         {    nam === null
              ?
           <Link to="/register"><button className='reg' action="" >Register</button></Link>
              :
              <div className='nam'>Hello {nam}!</div>
         }
         </div>
     
      <div className='main-container'>
     
        {
            check(value)
            ?   newBooks.map((book)=>{
                const{author,book_image,rank,title} =book
                return(
                    <div className='bundle'>
                        <article className='article'  key ={rank}>
                        <div className='books'>
                            <img className='bimg' src={book_image} alt={title} />
                            </div>
                            <div className='title'>
                                <h2>{title}</h2>
                            </div>
                            <div className='author'>
                                <h3>Author: {author}</h3>
                            </div>
                            <div>
                                <h4 style={{color: 'red'}}>FREE</h4>
                        </div>
                        </article>
                    </div>
                )
            })
            :   <h1 className='found'> Sorry! Book not found</h1>
        }
      </div>
    </div>
  );
}

export default Books;
