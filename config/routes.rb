Rails.application.routes.draw do
  get '/signup'    => 'users#new'
  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'
  get    'verify'  => 'sessions#verify_access_token'

  resources :users, param: :access_token
  resources :password_resets, only: [:new, :create, :edit, :update]

# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 get '/tweets', to: 'tweets#find_by_user', as: "tweets"
 get '/tweets/hashtag', to: 'tweets#find_by_hashtag'

  # resources :coinbases, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/coinbases/accounts', to: 'coinbases#accounts'
  get '/coinbases/usdwallet', to: 'coinbases#usd_wallet'
  get '/coinbases/ltcwallet', to: 'coinbases#ltc_wallet'
  get '/coinbases/ethwallet', to: 'coinbases#eth_wallet'
  get '/coinbases/btcwallet', to: 'coinbases#btc_wallet'
  get '/coinbases/primaryaccount', to: 'coinbases#primary_account'
  get '/coinbases/transactions', to: 'coinbases#transactions'

end
