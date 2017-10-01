class UsersController < ApplicationController
  def new
    @user = User.new
  end


  def show
    @user = User.find(params[:id])
  end

  private

  def allowed_params
    params.require(:user).permit(:firstName, :lastName, :email, :password)
  end
end
