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
 get '/tweets/ethereum', to: 'tweets#find_ethereum'
 get '/tweets/litecoin', to: 'tweets#find_litecoin'
 get '/tweets/bitcoin', to: 'tweets#find_bitcoin'

  # resources :coinbases, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/coinbases/accounts', to: 'coinbases#accounts'
  get '/coinbases/usdwallet', to: 'coinbases#usd_wallet'
  get '/coinbases/ltcwallet', to: 'coinbases#ltc_wallet'
  get '/coinbases/ethwallet', to: 'coinbases#eth_wallet'
  get '/coinbases/btcwallet', to: 'coinbases#btc_wallet'
  get '/coinbases/primaryaccount', to: 'coinbases#primary_account'
  get '/coinbases/transactions', to: 'coinbases#transactions'
  post '/coinbases/sendpayment', to: 'coinbases#send_payment'
  get '/coinbases/accountid', to: 'coinbases#account_id'
  get '/coinbases/transactions/btc', to: 'coinbases#btc_transactions'
  get '/coinbases/transactions/eth', to: 'coinbases#eth_transactions'
  get '/coinbases/transactions/ltc', to: 'coinbases#ltc_transactions'
  get '/coinbases/transactions/usd', to: 'coinbases#usd_transactions'
  get '/coinbases/paymentmethods', to: 'coinbases#payment_methods'

  post '/coinbases/sellBTC', to: 'coinbases#sellBTC'
  post '/coinbases/buyBTC', to: 'coinbases#buyBTC'
  post '/coinbases/sellETH', to: 'coinbases#sellETH'
  post '/coinbases/buyETH', to: 'coinbases#buyETH'
  post '/coinbases/sellLTC', to: 'coinbases#sellLTC'
  post '/coinbases/buyLTC', to: 'coinbases#buyLTC'
end
