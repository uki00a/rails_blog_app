Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :articles
  resources :users do
    member do
      get "articles"
    end
  end
end
