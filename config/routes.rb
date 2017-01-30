Rails.application.routes.draw do
  resources :documents
  root to:  'home#index'
  devise_for :users
end
