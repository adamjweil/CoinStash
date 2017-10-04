require 'coinbase/wallet'
class CoinbasesController < ActionController::API

  def client
    @client = Coinbase::Wallet::Client.new(api_key: ENV['CBKEY'],
                                     api_secret: ENV['CBSECRET'],
                                     CB_VERSION: 'YYYY-MM-DD')
  end

  def accounts
    client
    render json: @client.accounts
  end

  def usd_wallet
     client
     render json: @client.accounts[2]
  end

  def ltc_wallet
     client
     render json: @client.accounts[0]
  end

  def eth_wallet
     client
     render json: @client.accounts[1]
  end

  def btc_wallet
     render json: @client.accounts[3]
  end

  def primary_account
    client
    render json: @client.primary_account
  end

  def transactions
    client
    render json: @client.primary_account.transactions
  end

  def account_id
    client
    render json: @client[0].id
  end

  def send_payment
    client
    primary_account = client.primary_account
    response = primary_account.send({:to => 'WALLET_ADDRESS',
                           :amount => '0.001',
                           :currency => 'BTC'})
  end

  private

  def payment_params
    params.require(:payment).permit(:to, :amount, :description)
  end
end
