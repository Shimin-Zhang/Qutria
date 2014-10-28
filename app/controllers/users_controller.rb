class UsersController < ApplicationController
  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      redirect_to user_url(@user)
    else
      flash[:msg] = @user.errors.full_message
      render :new
    end
  end

  def edit
    @user = User.find(params[:id])
    render :edit
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      redirect_to user_url(@user)
    else
      flash[:msg] = @user.errors_full_message
      redirect_to user_url(@user)
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      redirect_to users_url
    else
      flash[:msg] = @user.errors_full_message
      redirect_to user_url(@user)
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :email, :name)
  end
end
