class ArticlesController < ApplicationController

     # From Stack overflow - It wasn't working without this at one point but now it is:
    #skip_before_action :verify_authenticity_token 

    def index
        articles = Article.all 
        render json: articles, include: :comments, status: :ok 
    end 

    def show 
        article = Article.find_by(id: params[:id])
        render json: article, include: :comments, status: :ok 
    end 


end
