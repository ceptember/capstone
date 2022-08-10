import { Link} from "react-router-dom";

function ArticlePreview({article}){
    return(
        <div>
            <Link className='' style={{color: '#ddd'}} to={"/articles/"+article.id}><h3>{article.headline}</h3></Link>
            <p> Preview of Article Text. For images, use one of a few Unsplash images for each cateory? </p>
             <hr />
        </div>
    )
}

export default ArticlePreview; 
