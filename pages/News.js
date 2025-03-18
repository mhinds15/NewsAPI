import React from 'react';

const News = ({title, description, urlToImage, url}) => {
    return (
        <article className="news-card">
            <img src={urlToImage} alt ="Cannot display" />
            <div className="article-info">
                <h2>
                    <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
                </h2>
                <p>{description ? description.length > 100 ? `${description.substring(0,100)}...` : description : "No description available"}</p>
                
                <a href={url} target="_blank">
                    <button className="read-more-btn">Read more</button>
                </a>
                
                
                
            </div>
        </article>
    );
}

export default News;