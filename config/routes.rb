Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :forums, only: [:index, :show]
    resources :users do 
      resources :matches, only: [:index]
    end
    resources :posts, only: [:create, :destroy, :update, :show]
    resources :comments, only: [:create, :show, :index, :update]
    resources :blogs, only: [:index, :show]
    resources :matches, only: [:create, :show]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'root#root'
end
