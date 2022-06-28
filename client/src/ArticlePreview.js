import { Link} from "react-router-dom";

function ArticlePreview({article}){
    return(
        <div>
            <h3>{article.headline}</h3>
            <p> Preview of Article Text. For images, use one of a few Unsplash images for each cateory? </p>
            <Link className='' to={"/articles/"+article.id}> Link </Link>
        </div>
    )
}

export default ArticlePreview; 
