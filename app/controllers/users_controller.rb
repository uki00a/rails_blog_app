class UsersController < ApplicationController
  def index
    # TODO use active_model_serializers
    users = User.all.map(&:serialize)
    render json: users
  end

  def show
    user = User.find_by!(params[:id])
    render json: user.serialize
  end

  def create
    user = User.new(user_params)
    user.save!
    render json: { id: user.id }, status: :created
  end

  def articles
    articles = User.find(params[:id]).articles.map(&:serialize)
    render json: articles
  end

  private
  def user_params
    params.require(:user).permit(:name)
  end
end
