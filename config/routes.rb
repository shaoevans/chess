Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :forums, only: [:index, :show]
    resources :users 
    resources :posts, only: [:create, :destroy, :update, :show]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'root#root'
end
