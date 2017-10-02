class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]


    # GET /users
    def index
      @users = User.all
    end

    # GET /users/1
    def show
    end

    # GET /users/new
    def new
      @user = User.new
    end

    # GET /users/1/edit
    def edit
      if @user
        render json: @user, only: [:email, :first_name, :last_name],  status: 200
      else
        render plain: "Unidentified user", status: 422
      end
    end

    # POST /users
    def create
      @user = User.new(user_params)
        if @user.save
          render plain: @user.access_token, status: 201
        else
          render json: @user.errors, status: 422
        end
    end

    # PATCH/PUT /users/1
    def update
      if @user.update_attributes(user_params)
        render plain: "Account has been updated successfully", status: 200
      else
        render json: @user.errors, status: 422
      end
    end

    # DELETE /users/1
    def destroy
      if @user.destroy
        render plain: "Account has been deleted successfuly", status: 200
      else
        render plain: "Something went wrong", status: 422
      end
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find_by(access_token: params[:access_token])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
      end
end
