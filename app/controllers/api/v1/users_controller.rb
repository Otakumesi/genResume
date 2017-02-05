class Api::V1::UsersController < ApplicationController
  def create
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def update
  end

  def index
  end
end
