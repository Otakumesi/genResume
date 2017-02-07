Rails.application.routes.draw do
  # namespace :api do
  #   namespace :v1 do
  #     resources :users
  #   end
  # end

  root to: "home#index"
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  resources :users, only: [] do
    resources :documents, only: [:show, :new, :create, :edit, :update, :index]
  end
end
