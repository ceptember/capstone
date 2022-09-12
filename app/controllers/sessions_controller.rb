class SessionsController < ApplicationController

  skip_before_action :verify_authenticity_token # From Stack overflow - see if it works without this when deployed 


    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: user, status: :created
       else 
          render json: { error: "Invalid username or password" }, status: :unauthorized
       end
      end
      

    def show
        user = User.find_by(id: session[:user_id])
        if user
          render json: user
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
      end


      def destroy
        session.delete :user_id
        head :no_content
      end
      

      
end 
#