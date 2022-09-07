import { Link} from "react-router-dom";

function ArticlePreview({article}){
    return(
        <div>
            <Link className='' style={{color: '#ddd'}} to={"/articles/"+article.id}><h3>{article.headline}</h3></Link>
            <p> 
                {article.content[0].split(".")[0]}...
                <Link style={{color: "#00CECB"}}to={"/articles/"+article.id}>see more</Link>
            </p>

             <hr />
        </div>
    )
}

export default ArticlePreview; 
