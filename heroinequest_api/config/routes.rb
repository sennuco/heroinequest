Rails.application.routes.draw do
  resources :victories , only: [:index, :create,:update, :show, :destroy]
  resources :monsters
  resources :heros


  patch "/victories", :to => 'victories#update'
  delete "/victories/:id", :to => 'victories#destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
