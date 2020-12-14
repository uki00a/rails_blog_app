class ArticlesController < ApplicationController
  before_action :authenticate_user, only: [:create]

  def index
    render json: Article.includes(:user).all.map { |x| serialize_article(x) }
  end

  def show
    article = Article.includes(:user).find(params[:id])
    render json: serialize_article(article)
  end

  def create
    article = current_user.articles.create(article_params)
    render json: { id: article.id }, status: :created
  end

  private
  def serialize_article(article)
    article.serialize.merge({ user: article.user.serialize })
  end

  def article_params
    params.require(:article).permit(:title, :body)
  end
end
