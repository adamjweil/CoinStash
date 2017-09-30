Rails.application.routes.draw do
  resources :users
# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 get '/tweets', to: 'tweets#find_by_user'
 get '/tweets/hashtag', to: 'tweets#find_by_hashtag'
end
