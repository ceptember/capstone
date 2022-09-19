import { Link} from "react-router-dom";

function ArticlePreview({article}){
    return(
        <div>
            <Link className='' style={{color: '#ddd'}} to={"/news/"+article.id}><h3>{article.headline}</h3></Link>
            <p> 
                {article.content[0].split(".")[0]}...
                <Link style={{color: "#9ecccc"}}to={"/news/"+article.id}>see more</Link>
            </p>

             <hr />
        </div>
    )
}

export default ArticlePreview; 
