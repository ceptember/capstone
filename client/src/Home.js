import ArticlePreview from "./ArticlePreview";

function Home(){
    return (
        <div>
            The home page will dynamically generate previews of that day's articles. 
            <ArticlePreview />
            <ArticlePreview />
            <p>Also have cards with links to games </p>
        </div>
    )
}

export default Home; 