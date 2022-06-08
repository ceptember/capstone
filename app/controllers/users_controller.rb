class UsersController < ApplicationController

  skip_before_action :verify_authenticity_token # From Stack overflow 

    def index
        render json: {hello: "users!"}
    end
    
    def create
        user = User.create!(user_params)
       # session[:user_id] = user.id 
        render json: user, status: :created 
   rescue ActiveRecord::RecordInvalid => invalid 
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity 
    end
    
      private
    
      def user_params
        params.permit(:username, :email, :password, :password_confirmation)
      end    
end
