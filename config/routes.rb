Rails.application.routes.draw do
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
