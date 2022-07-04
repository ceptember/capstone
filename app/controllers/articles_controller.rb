class ArticlesController < ApplicationController

    skip_before_action :verify_authenticity_token #gahhhhh 

    def index
        articles = Article.all 
        render json: articles, include: :comments, status: :ok 
    end 

    def show 
        article = Article.find_by(id: params[:id])
        render json: article, include: :comments, status: :ok 
    end 


end
