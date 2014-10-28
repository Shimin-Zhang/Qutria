Rails.application.routes.draw do
  resources :users
  resource :session, only: [:create, :new, :destroy]
  resources :questions
  resources :answers, only: [:destroy, :edit, :update, :create]
  resources :tags, only: [:destroy, :edit, :update, :create, :index, :show]
  resources :taggables, only: [:create, :destroy]
  root to: "questions#index"
end
