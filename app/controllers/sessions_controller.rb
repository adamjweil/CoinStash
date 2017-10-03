class SessionsController < ApplicationController
  def new
    end
    #If user login data are valid it will return the access_token so the
    #client app can use it for future request for the specific user.
    def create
      user = User.find_by(email: params[:session][:email])
        if user && user.authenticate(params[:session][:password])
          session[:user_id] = user.id
          puts session[:user_id]
          render json: user
        else
          render json: {errors: "login failed."}
        end
    end
        #Verifies the access_token so the client app would know if to login the user.
    def destroy
      if session.clear
        render json: {message: "session was cleared"}
      else
        render json: {message: "something went wrong, sessions was NOT cleared"}
      end
    end

    def verify_access_token
      user = User.find_by(access_token: params[:session][:access_token])
        if user
          render plain: "verified", status: 200
        else
          render plain: "Token failed verification", status: 422
        end
    end
end
