class CommentsController < ApplicationController
    skip_before_action :verify_authenticity_token # From Stack overflow - see if it works without this when deployed 

    def index
        comments = Comment.all
        render json: comments, status: :ok 
    end

    def show
        comment = Comment.find_by(id: params[:id])
        render json: comment, status: :ok 
    end 

    def create
        current_user = User.find_by(id: session[:user_id])
        if current_user
            comment = Comment.create!(comment_params)
            render json: comment, status: :created 
        else 
            render json: {error: "unauthorized"}, status: :unauthorized
        end 
    end 

    def destroy

    end 

    def update 

    end 

    private 

    def comment_params
        params.permit(:user_id, :article_id, :comment_text)
    end 

end
