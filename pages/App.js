import React, {useEffect, useState} from 'react';
import Footer from './Footer';
import Title from './Title';
import News from './News';

//should use env variables
const API_KEY = '593b53e09aef4cc8968167be7a585969';
const PAGE_SIZE = 6; //number or articles displayed per page
const SEARCH_URL = "https://newsapi.org/v2/everything";

const App = ()=>{
    
    //STATES 
    const [search, setSearch] = useState("");//Store input from search bar
    const [articles, setArticles] = useState([]);//Ensure that articles is an array 
    const[selectedCountry, setSelectedCountry] = useState("us"); //default country is (US)
    const[selectedCategory, setSelectedCategory] = useState("General"); //default category is General
    const [submittedQuery, setSubmittedQuery] = useState("");
    const [loading, setLoading] = useState(false);//Loading state, shows loading indicator while fetching
    const[page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0); //state to store the number of articles returned after each fetch

    
    let categories  = ["General", "Business", "Technology", "Sports", "Entertainment","Science"];

    //on page load, category change, search query or page changed
    useEffect(() => {
        const fetchNews = async () =>{
            setLoading(true);
            
            let url = submittedQuery ? `${SEARCH_URL}?q=${submittedQuery}&page=${page}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`
                                     : `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&category=${selectedCategory.toLowerCase()}&page=${page}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;

            try{
                const response = await fetch(url);
                const data = await response.json();
                setArticles(data.articles || []);
                setTotalResults(data.totalResults);
            } catch(error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();

        window.scrollTo({top: 0});

    }, [selectedCategory, submittedQuery,page,selectedCountry]);

    
    const handleSearch = (e) => {
        e.preventDefault(); //prevent form submission from refreshing page
        if(!search.trim()) return; //prevents empty searches from making API request
        setSubmittedQuery(search);
        setSelectedCategory("");
        setSearch("")
        setPage(1);
    }

        return (
            <div className='app-container'>
                <main className="main-container">
                    <Title />
                        
                            <div className="menu-bar">
                                
                                <form onSubmit={handleSearch} className="search-form">
                                    <select className="country-dropdown"
                                        value={selectedCountry}
                                        onChange={(e) => {setSelectedCountry(e.target.value); setPage(1);}}
                                    >
                                        <option value="us">United States</option>
                                        <option value="ca">Canada</option>
                                        <option value="uk">United Kingdom</option>
                                        <option value="cn">China</option>
                                        <option value="jp">Japan</option>
                                    </select>
                                
                                    <input
                                        className="search-bar"
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder='Search news...'
                                    />
                                    <button type="submit" className="search-btn">Search</button>
                                </form>
                                
                            </div>
                            <div className="category-container">
                                    {categories.map((category) =>(
                                        <button key={category} 
                                        className={category ===selectedCategory ? "active" : ""} onClick={() => {setSelectedCategory(category); setSubmittedQuery(""); setPage(1);}}> {category}</button>
                                    ))}
                            </div>
                            
                            <div className="articles">
                                {loading ? (
                                    <div className="loading-news">
                                        {loading && <p>Loading news...</p>}
                                    </div>
                                ) : articles.length > 0 ? (articles.map((article,index) => (
                                    <News 
                                        key={index}
                                        title={article.title}
                                        description={article.description}
                                        urlToImage={article.urlToImage || "https://www.chegg.com/homework-help/questions-and-answers/image-u"}
                                        url={article.url}
                                    />
                                ))) : (
                                        <p className="no-result">No articles found. Try a different search.</p>
                                )}
                            </div>
                            <div className="pagination">
                                <button disabled={page<=1} onClick={() => setPage(page-1)}>Previous</button>
                                <span>Page {page} </span>
                                <button disabled={page * PAGE_SIZE >= (totalResults || articles.length)} onClick={() => setPage(page+1)}>Next</button>
                            </div>    
                    </main>
                <Footer />
            </div>
            
           
        );
    }

    

    export default App;