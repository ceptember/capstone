class UsersController < ApplicationController

  skip_before_action :verify_authenticity_token # From Stack overflow - see if it works without this when deployed 

    def index
        render json: {hello: "users!"}
    end
    

    def show
      current_user = User.find_by(id: session[:user_id])
      if current_user
         render json: current_user, status: :created
      else 
         render json: {error: "unauthorized"}, status: :unauthorized
      end 
      
 end 

    def create
        user = User.create!(user_params)
        render json: user, status: :created 
   rescue ActiveRecord::RecordInvalid => invalid 
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity 
    end
    
      private
    
      def user_params
        params.permit(:username, :email, :password, :password_confirmation)
      end    
end
